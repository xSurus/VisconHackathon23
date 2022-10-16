import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../util/db";
import type { Voucher } from "../../util/schemas";

type GetQuery = { id: string } | undefined;
type DeleteQuery = { id: string };
type PutQuery = { id: string };

function isGetQuery(query: any): query is GetQuery {
	return (
		!Object.keys(query).length || (query && typeof query.id === "string")
	);
}

function isDeleteQuery(query: any): query is DeleteQuery {
	return query && typeof query.id === "string";
}

type Data = Voucher[] | undefined;

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const { query } = req;

	switch (req.method) {
		case "GET":
			if (!isGetQuery(query)) break;
			try {
				let result: Voucher[] = (
					!Object.keys(query).length
						? await db.query("SELECT * FROM Voucher")
						: await db.query(
								"SELECT * FROM Voucher WHERE id = $1::uuid",
								[query.id]
						  )
				).rows;
				if (result.length == 0) return res.status(404).json(undefined);
				else return res.status(200).json(result);
			} catch (e) {
				return res.status(500).send(undefined);
			}
		case "DELETE":
			if (!isDeleteQuery(query)) break;
			try {
				let result = await db.query(
					"DELETE FROM Voucher WHERE id = $1::integer",
					[query.id]
				);
			} catch (e) {}
			return res.status(200).send(undefined);
	}
	res.status(400).send(undefined);
}
