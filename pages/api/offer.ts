import { NextApiRequest, NextApiResponse } from "next";
import db from "../../util/db";
import { Category, isInteger, Offer, Supplier } from "../../util/schemas";

type GetCategoriesQuery = { categories: Category | Category[] };

type GetIdQuery = { id: number };
/** Create {stock} vouchers with {name} and {price}. Offer has categories and a supplier id */
type PostQuery = {
	/** supplier id of whoever posts the offer */
	supplier_id: number;
	/** categories of the offer */
	categories: Category[];
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

function isPostQuery(query: any): PostQuery {
	return (
		query &&
		typeof query.supplier_id === "string" &&
		isInteger(query.supplier_id) &&
		typeof query.price === "string" &&
		isInteger(query.price) &&
		typeof query.stock === "string" &&
		isInteger(query.stock) &&
		typeof query.name === "string" &&
		Array.isArray(query.categories) &&
		query.categories.every((c: any) => typeof c === "string")
	);
}

function isDeleteQuery(query: any): query is DeleteQuery {
	return query && typeof query.id === "string" && isInteger(query.id);
}

type Data = Offer[] | undefined;

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const query = req.query;

	switch (req.method) {
		case "GET":
			if (isGetIdQuery(query)) {
				try {
					await db.query("BEGIN");
					let res_offer = await db.query(
						"SELECT * FROM Offer AS O, Supplier AS S, Address as A, Billing as B WHERE O.id = $1::integer AND S.id = O.supplier_id AND S.address_id = A.id AND B.id = S.billing",
						[query.id]
					);
					console.log(res_offer);
					let res_categories = await db.query(
						"SELECT category_name FROM Offer_Category WHERE offer_id = $1::integer",
						[query.id]
					);
					await db.query("COMMIT");

					console.log(res_offer.rows[0]);

					if (res_offer.rowCount === 0)
						return res.status(404).send(undefined);
					const row = res_offer.rows[0];
					const categories = res_categories.rows.map(
						(r) => r.category_name
					);
					const offers: [Offer] = [
						{
							categories,
							id: row.id,
							supplier: {
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
						},
					];

					return res.status(200).json(offers);
				} catch (e) {
					console.error(e);
				}
			} else if (isGetCategoriesQuery(query)) {
				const categories: Category[] =
					typeof query.categories === "string"
						? [query.categories]
						: query.categories;

				let result = await db.query(
					`SELECT * FROM Offer AS O, Supplier AS S, Address as A, Billing as B, Offer_Category AS OC
					WHERE OC.category_name = ANY( $1::text[] ) AND O.id = OC.offer_id AND S.id = O.supplier_id AND S.address_id = A.id AND B.id = S.billing`,

					[categories]
				);
				console.log(result);
				result.rows.reduce((o) => {
					const offer = {
						categories,
						id: o.id,
						supplier: {
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
				}, []);
			} else {
				break;
			}

		case "POST":
			if (!isPostQuery(query)) break;
			try {
				let result = await db.query("INSERT INTO Offer () VALUES (");
			} catch (e) {}
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
