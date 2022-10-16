import { Result } from "@mui/system/cssVars/useCurrentColorScheme";
import { NextApiRequest, NextApiResponse } from "next";
import { Query } from "pg";
import db from "../../util/db";
import {
	Category,
	isEmptyObj,
	isInteger,
	Offer,
	Supplier,
} from "../../util/schemas";
import { getAvailableVouchers, getAvailableVouchersCount } from "./order";

type GetCategoriesQuery = { categories: Category | Category[] };

export type GetIdQuery = { id: number };

type GetSupplierIdQuery = { supplier_id: number };

export function isGetSupplierIdQuery(q: any): q is GetSupplierIdQuery {
	return q && isInteger(q.supplier_id);
}

/** Create {stock} vouchers with {name} and {price}. Offer has categories and a supplier id */
export type PostQuery = {
	/** supplier id of whoever posts the offer */
	supplier_id: number;
	/** categories of the offer */
	categories?: Category | Category[];
	description: string;
	/** Value of each voucher */
	price: number;
	/** Amount of vouchers in the offer */
	stock: number;
	/** Name of the voucher */
	name: string;
};

type DeleteQuery = { id: number };

function isGetIdQuery(query: any): query is GetIdQuery {
	return query && typeof query.id === "string" && isInteger(query.id);
}

function isGetCategoriesQuery(query: any): query is GetCategoriesQuery {
	return (
		query &&
		(typeof query.categories === "string" ||
			(Array.isArray(query.categories) &&
				query.categories.every((c: any) => typeof c === "string")))
	);
}

function isPostQuery(query: any): query is PostQuery {
	return (
		query &&
		typeof query.supplier_id === "string" &&
		isInteger(query.supplier_id) &&
		typeof query.price === "string" &&
		isInteger(query.price) &&
		typeof query.stock === "string" &&
		isInteger(query.stock) &&
		typeof query.name === "string" &&
		typeof query.description === "string" &&
		(typeof query.categories === "string" ||
			typeof query.categories === "undefined" ||
			!Array.isArray(query.categories) ||
			query.categories.every((c: any) => typeof c === "string"))
	);
}

function isDeleteQuery(query: any): query is DeleteQuery {
	return query && typeof query.id === "string" && isInteger(query.id);
}

type Data = Offer[] | undefined;

export async function getOffersBySupplierId(
	supplier_id: number
): Promise<Offer[]> {
	await db.query("BEGIN");
	// Get IDS
	const res_offers = await db.query(
		"SELECT id FROM Offer WHERE supplier_id = $1::integer",
		[supplier_id]
	);
	const offers = [];
	for (const r of res_offers.rows) {
		const off = await getOfferById(r.id);
		off && offers.push(off);
	}
	await db.query("COMMIT");
	return offers;
}

export async function getOfferById(id: number): Promise<Offer | undefined> {
	await db.query("BEGIN");
	let res_offer = await db.query(
		"SELECT * FROM Offer AS O, Supplier AS S, Address as A, Billing as B WHERE O.id = $1::integer AND S.id = O.supplier_id AND S.address_id = A.id AND B.id = S.billing",
		[id]
	);
	console.log(res_offer);
	let res_categories = await db.query(
		"SELECT category_name FROM Offer_Category WHERE offer_id = $1::integer",
		[id]
	);

	let res_price = await db.query(
		"SELECT price FROM Voucher WHERE offer_id = $1::integer LIMIT 1",
		[id]
	);

	const price_per_voucher = res_price.rows[0].price;
	await db.query("COMMIT");

	console.log(res_offer.rows[0]);

	if (res_offer.rowCount === 0) return undefined;
	const row = res_offer.rows[0];
	const categories = res_categories.rows.map((r) => r.category_name);

	const offer = {
		description: row.description,
		name: row.name,
		categories,
		id: row.id,
		available: 0,
		price_per_voucher,
		supplier: {
			img: row.img,
			name: row.name,
			homepage: row.homepage,
			email: row.email,
			id: row.supplier_id,
			address: {
				id: row.address_id,
				street: row.street,
				cap: row.cap,
				city: row.city,
				country: row.country,
			},
			billing: {
				id: row.billing,
				billing_address: row.billing_address,
				iban: row.iban,
			},
		},
	};

	const available = await getAvailableVouchersCount(offer.id);

	return { ...offer, available };
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const query = req.query;
	switch (req.method) {
		case "GET":
			if (isGetSupplierIdQuery(query)) {
				const offers = await getOffersBySupplierId(query.supplier_id);
				return res.status(200).json(offers);
			} else if (isGetIdQuery(query)) {
				try {
					const offer = await getOfferById(query.id);
					if (offer) {
						const offers = [offer];
						return res.status(200).json(offers);
					} else {
						return res.status(404).send([]);
					}
				} catch (e) {
					console.error(e);
				}
			} else if (isGetCategoriesQuery(query)) {
				const categories: Category[] =
					typeof query.categories === "string"
						? [query.categories]
						: query.categories;

				// First get the orders and subtables that have a category in the given set
				// then join with every Offer_Category to retrieve every category of each offer
				let result = await db.query(
					`SELECT * FROM
					(SELECT O.id, O.name, O.description, O.supplier_id, OC.category_name, S.name, S.email, S.homepage, S.img, S.address_id, A.city, A.cap,
						A.country, A.street, S.billing, B.billing_address, B.iban  FROM Offer AS O, Supplier AS S, Address as A, Billing as B, Offer_Category AS OC
					WHERE OC.category_name = ANY( $1::text[] ) AND O.id = OC.offer_id AND S.id = O.supplier_id AND S.address_id = A.id AND B.id = S.billing) as R
					INNER JOIN Offer_Category as OCC ON OCC.offer_id = R.id`,

					[categories]
				);
				const ac = new Map<number, Offer>();

				for (const o of result.rows) {
					let offer = ac.get(o.id);
					const res_price = await db.query(
						"SELECT price FROM Voucher WHERE offer_id = $1::integer",
						[o.id]
					);
					const price_per_voucher =
						res_price.rows.length > 0 ? res_price.rows[0].price : 0;

					if (!offer) {
						const available = await getAvailableVouchersCount(o.id);

						offer = {
							available,
							description: o.description,
							name: o.name,
							categories: [o.category_name],
							id: o.id,
							price_per_voucher,
							supplier: {
								img: o.img,
								name: o.name,
								homepage: o.homepage,
								email: o.email,
								id: o.supplier_id,
								address: {
									id: o.address_id,
									street: o.street,
									cap: o.cap,
									city: o.city,
									country: o.country,
								},
								billing: {
									id: o.billing,
									billing_address: o.billing_address,
									iban: o.iban,
								},
							},
						};

						ac.set(offer.id, offer);
					} else {
						offer.categories.push(o.category_name);
					}
				}

				return res.status(200).json(Array.from(ac.values()));
			} else {
				try {
					let result = await db.query(
						`SELECT * FROM
						(SELECT O.id, O.description, O.supplier_id, O.name, OC.category_name, S.name as supplier_name, S.email, S.homepage, S.img, S.address_id, A.city, A.cap,
							A.country, A.street, S.billing, B.billing_address, B.iban  FROM Offer AS O, Supplier AS S, Address as A, Billing as B, Offer_Category AS OC
						WHERE O.id = OC.offer_id AND S.id = O.supplier_id AND S.address_id = A.id AND B.id = S.billing) as R`
					);

					const ac = new Map<number, Offer>();

					for (const o of result.rows) {
						let offer = ac.get(o.id);
						const res_price = await db.query(
							"SELECT price FROM Voucher WHERE offer_id = $1::integer",
							[o.id]
						);
						const price_per_voucher = res_price.rows[0].price;

						if (!offer) {
							const available = await getAvailableVouchersCount(
								o.id
							);
							offer = {
								available,
								description: o.description,
								name: o.name,
								categories: [o.category_name],
								id: o.id,
								price_per_voucher,
								supplier: {
									img: o.img,
									name: o.supplier_name,
									homepage: o.homepage,
									email: o.email,
									id: o.supplier_id,
									address: {
										id: o.address_id,
										street: o.street,
										cap: o.cap,
										city: o.city,
										country: o.country,
									},
									billing: {
										id: o.billing,
										billing_address: o.billing_address,
										iban: o.iban,
									},
								},
							};

							ac.set(offer.id, offer);
						} else {
							offer.categories.push(o.category_name);
						}
					}

					return res.status(200).json(Array.from(ac.values()));
				} catch (e) {
					console.error(e);
					return res.status(500).send(undefined);
				}
			}

		case "POST":
			if (!isPostQuery(query)){
				console.log("not a post", query)
				break;
			} 
			try {
				console.log("BALL");
				let result = await db.query(
					`INSERT INTO Offer (supplier_id, name, description) VALUES ($1::integer, $2::text, $3::text) RETURNING id AS offer_id`,
					[query.supplier_id, query.name, query.description]
				);
				const { offer_id } = result.rows[0];
				console.log("COCK");
				for (let i = 0; i < query.stock; i++) {
					const res = await db.query(
						"INSERT INTO Voucher (name, price, supplier_id, offer_id) VALUES ($1::text, $2::integer, $3::integer, $4::integer)",
						[query.name, query.price, query.supplier_id, offer_id]
					);

					if (res.rowCount) console.log(`Inserted Voucher`);
				}

				const categories =
					typeof query.categories === "undefined"
						? []
						: typeof query.categories === "string"
						? [query.categories]
						: query.categories;

				for (const c of categories) {
					const res = await db.query(
						"INSERT INTO Offer_Category (offer_id, category_name) VALUES ($1::integer, $2::text)",
						[offer_id, c]
					);
					if (res.rowCount) {
						console.log("inserted category");
					}
				}
			} catch (e) {
				console.error(e);
				return res.status(500).send(undefined);
			}
			return res.status(201).send(undefined);
		case "DELETE":
			if (!isDeleteQuery(query)) break;
			try {
				let _result = await db.query("");
			} catch (e) {
				// TODO: PRint
			}
			return res.status(200).send(undefined);
	}
	res.status(400).send(undefined);
}
