import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../util/db";
import type { Seeker, Id, Address } from "../../util/schemas";
import { isSeeker, addId, isEmptyObj, isId } from "../../util/schemas";
import { Axios } from "axios";
import bcrypt from "bcrypt";

type GetQuery = Id | {};
export type PostQuery = Omit<Omit<Omit<Seeker, "id">, "billing">, "address"> &
	Omit<Address, "id"> & { login_email: string; password: string };
type DeleteQuery = Id;
type PatchQuery = Seeker;

function isGetQuery(query: any): query is GetQuery {
	return (
		isEmptyObj(query) || (typeof query.id === "string" && !isNaN(query.id))
	);
}

let isPostQuery = (x: any): x is PostQuery => true; // TODO:

let isPatchQuery = isSeeker;

let isDeleteQuery = isId;

type Data = Seeker[] | undefined;

function rowToSeeker(x: any): Seeker {
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
	};
}

export async function getSeekers(): Promise<Seeker[]> {
	const res = await db.query(
		"SELECT S.id as sid, S.name as sname, S.img as simg, S.email as semail, S.homepage as shomepage, A.id as aid, A.street as astreet, A.cap as acap, A.city as acity, A.country as acountry FROM Seeker as S, Address as A WHERE S.address_id=A.id"
	);
	const seekers = res.rows.map(rowToSeeker);
	return seekers;
}

export async function getSeekerById(id: number): Promise<Seeker | undefined> {
	const res = await db.query(
		"SELECT S.id as sid, S.name as sname, S.img as simg, S.email as semail, S.homepage as shomepage, A.id as aid, A.street as astreet, A.cap as acap, A.city as acity, A.country as acountry FROM Address AS A, Seeker AS S WHERE S.id = $1::integer AND S.address_id=A.id",
		// @ts-ignore
		[id]
	);

	if (res.rows.length) {
		const x = res.rows[0];
		const seeker = rowToSeeker(x);

		return seeker;
	} else return undefined;
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const { query } = req;

	switch (req.method) {
		case "GET":
			if (!isGetQuery(query)) break;
			try {
				if ("id" in query) {
					// Fuck the type system, it doesn't even infer correctly from a type guard...................................................................................................................................
					const seeker = await getSeekerById((query as any).id);
					if (!seeker) return res.status(404).json(undefined);
					else return res.status(200).json([seeker]);
				} else {
					const seekers = await getSeekers();
					return res.status(200).json(seekers);
				}
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
			if (!isPostQuery(query)) break;
			try {
				await db.query("BEGIN");
				let addr_id = (
					await db.query(
						"INSERT INTO Address (street, cap, city, country) VALUES ($1::text, $2::integer, $3::text, $4::text) RETURNING id",
						[query.street, query.cap, query.city, query.country]
					)
				).rows[0].id;
				console.log(addr_id);
				let result = await db.query(
					"INSERT INTO Seeker (name, img, email, address_id, homepage) VALUES ($1::text, $2::text, $3::text, $4::integer, $5::text)",
					[
						query.name,
						query.img,
						query.email,
						addr_id,
						query.homepage,
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

					return res.status(201).send(undefined);
				}
			} catch (e) {
				console.log(e);
				res.status(500).send(undefined);
			}
			db.query("ABORT");

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
	res.status(400).send(undefined);
}
