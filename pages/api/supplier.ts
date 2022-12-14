import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../util/db";
import { Supplier, Id, Address, Billing, isInteger } from "../../util/schemas";
import { isSupplier, addId, isEmptyObj, isId } from "../../util/schemas";
import { Axios } from "axios";
import bcrypt from "bcrypt";

type GetQuery = Id | {};

/** `login_email` and `email` can be different! Beware!
 *
 * Also add a password check or something in case the user typos
 */
export type PostQuery = Omit<Omit<Omit<Supplier, "id">, "billing">, "address"> &
	Omit<Address, "id"> &
	Omit<Billing, "id"> & {
		login_email: string;
		password: string;
	};

type PostQueryFields = keyof PostQuery;

type DeleteQuery = Id;
type PatchQuery = Supplier;

type Post2Query = keyof PostQuery;

function isGetQuery(query: any): query is GetQuery {
	return (
		isEmptyObj(query) || (typeof query.id === "string" && !isNaN(query.id))
	);
}

let isPostQuery = (x: any): x is PostQuery => {
	const strings = [
		"name",
		"email",
		"street",
		"city",
		"country",
		"billing_address",
		"iban",
		"password",
		"login_email",
	];
	return (
		x &&
		strings.every((f) => typeof x[f] === "string") &&
		(!x.img || typeof x.img === "string") &&
		(x.homepage || typeof x.homepage === "string") &&
		isInteger(x.cap)
	);
};

let isPatchQuery = isSupplier;

let isDeleteQuery = isId;

type Data = Supplier[] | undefined;

export async function getSupplierById(
	id: number
): Promise<Supplier | undefined> {
	const result = await db.query(
		"SELECT S.id as sid, S.name as sname, S.img as simg, S.email as semail, S.homepage as shomepage, A.id as aid, A.street as astreet, A.cap as acap, A.city as acity, A.country as acountry, B.id as bid, B.billing_address as baddr, B.iban as biban FROM Address AS A, Supplier AS S, Billing as B WHERE S.id = $1::integer AND S.address_id=A.id AND S.billing = B.id",
		// @ts-ignore
		[query.id]
	);
	if (result.rows.length === 0) return undefined;

	const x = result.rows[0];
	return {
		id: x.sid,
		name: x.sname,
		img: x.simg,
		email: x.semail,
		homepage: x.shomepage,
		address: {
			id: x.aid,
			street: x.astreet,
			cap: x.acap,
			city: x.acity,
			country: x.acountry,
		},
		billing: {
			id: x.bid,
			billing_address: x.baddr,
			iban: x.biban,
		},
	};
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const { query, body } = req;

	switch (req.method) {
		case "GET":
			if (!isGetQuery(query)) break;
			try {
				let result: any[] = (
					isEmptyObj(query)
						? await db.query(
								"SELECT S.id as sid, S.name as sname, S.img as simg, S.email as semail, S.homepage as shomepage, A.id as aid, A.street as astreet, A.cap as acap, A.city as acity, A.country as acountry, B.id as bid, B.billing_address as baddr, B.iban as biban FROM Supplier as S, Address as A, Billing AS B WHERE S.address_id=A.id AND S.billing = B.id"
						  )
						: await db.query(
								"SELECT S.id as sid, S.name as sname, S.img as simg, S.email as semail, S.homepage as shomepage, A.id as aid, A.street as astreet, A.cap as acap, A.city as acity, A.country as acountry, B.id as bid, B.billing_address as baddr, B.iban as biban FROM Address AS A, Supplier AS S, Billing as B WHERE S.id = $1::integer AND S.address_id=A.id AND S.billing = B.id",
								// @ts-ignore
								[query.id]
						  )
				).rows;
				let tmp = result.map((x) => {
					return {
						id: x.sid,
						name: x.sname,
						img: x.sigm,
						email: x.semail,
						homepage: x.shomepage,
						address: {
							id: x.aid,
							street: x.astreet,
							cap: x.acap,
							city: x.acity,
							country: x.acountry,
						},
						billing: {
							id: x.bid,
							billing_address: x.baddr,
							iban: x.biban,
						},
					};
				});
				if (result.length == 0) return res.status(404).json(undefined);
				else return res.status(200).json(tmp);
			} catch (e) {
				console.log(e);
				return res.status(500).send(undefined);
			}
		// TODO !!!!!!!!!!!!!
		// case 'PUT':
		//     if (!isPutQuery(query)) break;
		//     try {
		//         let result = await db.query("INSERT INTO Category(name) VALUES ($1::text) ON CONFLICT DO NOTHING", [query.name]);
		//     } catch (e) { }
		//     return res.status(200).send(undefined);

		case "POST":
			if (!isPostQuery(query)) break; // FIXME: PASSING SENTITIVE INFO IN THE QUERY IS REALLY BAD! USE BODY INSTEAD
			try {
				await db.query("BEGIN");
				let addr_id = (
					await db.query(
						"INSERT INTO Address (street, cap, city, country) VALUES ($1::text, $2::integer, $3::text, $4::text) RETURNING id",
						[query.street, query.cap, query.city, query.country]
					)
				).rows[0].id;

				let bill_id = (
					await db.query(
						"INSERT INTO Billing (billing_address, iban) VALUES ($1::text, $2::text) RETURNING id",
						[query.billing_address, query.iban]
					)
				).rows[0].id;
				console.log(addr_id);
				console.log(bill_id);
				let result = await db.query(
					"INSERT INTO Supplier (name, img, email, address_id, homepage, billing) VALUES ($1::text, $2::text, $3::text, $4::integer, $5::text, $6::integer) RETURNING id",
					[
						query.name,
						query.img,
						query.email,
						addr_id,
						query.homepage,
						bill_id,
					]
				);

				if (result.rows.length > 0 && result.rows[0].id) {
					const hash_password = await bcrypt.hash(query.password, 13);
					// Create credentials
					let r = await db.query(
						"INSERT INTO SupplierCredential (supplier_id, email, password) VALUES ($1::integer, $2::text, $3::text) RETURNING token",
						[result.rows[0].id, query.login_email, hash_password]
					);

					if (r.rows.length === 0) {
						console.error(
							"Cannot create credentials for new user. Abort."
						);
						db.query("ABORT");
						return res.status(500).send(undefined);
					}

					await db.query("COMMIT");
					console.log("Created supplier USER!");

					res.status(201).send(undefined);
				} else {
					console.error(
						"Cannot create supplier entry! Abort transaction"
					);
					await db.query("ABORT");
				}
			} catch (e) {
				console.error(e);
			}
			return res.status(200).send(undefined);

		case "DELETE":
			if (!isDeleteQuery(query)) break;
			try {
				let result = await db.query(
					"DELETE FROM Seeker WHERE id = $1::integer",
					[query.id]
				);
			} catch (e) {
				console.log(e);
			}
			return res.status(200).send(undefined);
	}

	console.log("malformed supplier req");
	res.status(400).send(undefined);
}
