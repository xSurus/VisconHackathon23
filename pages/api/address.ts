import type { NextApiRequest, NextApiResponse } from "next";
import type { Id, Address } from "../../util/schemas";
import { isId, isAddress, addId } from "../../util/schemas";
import db from "../../util/db";

type GetQuery = Id;
type PostQuery = Omit<Address, "id">;
type DeleteQuery = Id;
type PatchQuery = Address;

let isGetQuery = isId;

let isDeleteQuery = isId;

let isPatchQuery = isAddress;
let isPostQuery = (x: any) => isAddress(addId(x));

type Data = Address | undefined;

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const { query } = req;

	switch (req.method) {
		case "GET":
			if (!isGetQuery(query)) break;
			try {
				let result = await db.query(
					"SELECT * FROM Address WHERE id = $1::integer",
					[query.id]
				);
				if (result.rowCount === 0)
					return res.status(404).send(undefined);
				let row: Data = result.rows[0];
				return res.status(200).json(row);
			} catch (e) {
				return res.status(500).json(undefined);
			}

		case "POST":
			if (!isPostQuery(query)) break;
			try {
				let result = await db.query(
					"INSERT INTO Address(street, cap, city, country) VALUES ($1::text, $2::integer, $3::text, $4::text)",
					[query.street, query.cap, query.city, query.country]
				);
			} catch (e) {
				return res.status(500).send(undefined);
			}
			return res.status(200).send(undefined);

		case "DELETE":
			if (!isDeleteQuery(query)) break;
			try {
				let result = await db.query(
					"DELETE FROM Address WHERE id = $1::integer",
					[query.id]
				);
			} catch (e) {}
			return res.status(200).send(undefined);

		case "PATCH":
			if (!isPatchQuery(query)) break;
			try {
				let result = await db.query(
					"UPDATE Address SET street=$2::text, cap=$3::integer, city=$4::text, country=$5::text WHERE id=$1::integer",
					[
						query.id,
						query.street,
						query.cap,
						query.city,
						query.country,
					]
				);
			} catch (e) {}
			return res.status(200).send(undefined);
	}
	res.status(400).send(undefined);
}
