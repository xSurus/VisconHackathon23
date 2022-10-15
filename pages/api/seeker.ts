import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../util/db";
import type { Seeker, Id, Address } from "../../util/schemas";
import { isSeeker, addId, isEmptyObj, isId } from "../../util/schemas";
import { Axios } from "axios";

type GetQuery = Id | {};
type PostQuery = Omit<Seeker, "id">;
type DeleteQuery = Id;
type PatchQuery = Seeker;

function isGetQuery(query: any): query is GetQuery {
	return (
		isEmptyObj(query) || (typeof query.id === "string" && !isNaN(query.id))
	);
}

let isPostQuery = (x: any) => isSeeker(addId(x));

let isPatchQuery = isSeeker;

let isDeleteQuery = isId;

type Data = Seeker[] | undefined;

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const { query } = req;

	switch (req.method) {
		case "GET":
			if (!isGetQuery(query)) break;
			try {
				let result: any[] = (
					isEmptyObj(query)
						? await db.query(
								"SELECT S.id as sid, S.name as sname, S.img as simg, S.email as semail, S.homepage as shomepage, A.id as aid, A.street as astreet, A.cap as acap, A.city as acity, A.country as acountry FROM Seeker as S, Address as A WHERE S.address_id=A.id"
						  )
						: await db.query(
								"SELECT S.id as sid, S.name as sname, S.img as simg, S.email as semail, S.homepage as shomepage, A.id as aid, A.street as astreet, A.cap as acap, A.city as acity, A.country as acountry FROM Address AS A, Seeker AS S WHERE S.id = $1::integer AND S.address_id=A.id",
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
			//if (!isPostQuery(query)) break;
			try {
				let addr_id = await db.query(
					"INSERT INTO Address (street, cap, city, country) VALUES ($1::text, $2::integer, $3::text, $4::text) RETURNING",
					[query.street, query.cap, query.city, query.country]
				);
				console.log(addr_id);
				let result = await db.query(
					"INSERT INTO Seeker (name, img, email, address_id, homepage) VALUES ($1::text, $2::text, $3::integer, $4::text",
					[
						query.name,
						query.img,
						query.email,
						addr_id,
						query.homepage,
					]
				);
				await db.query("COMMIT");
			} catch (e) {
				console.log(e);
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
	res.status(400).send(undefined);
}
