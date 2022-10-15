import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../util/db'

type DeleteQuery = { name: string }
type PutQuery = { name: string }

function isDeleteQuery(query: any): query is DeleteQuery {
    return query && typeof query.name === 'string'
}

function isPutQuery(query: any): query is PutQuery {
    return query && typeof query.name === 'string'
}

type Data = {
    categories: string[],
} | undefined;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { query } = req;

    switch (req.method) {
        case 'GET':
            try {
                let result = await db.query("SELECT name FROM Category");
                // Always string, see db schema
                let rows: string[] = result.rows.map(x => x.name);
                return res.status(200).json({ categories: rows });
            } catch (e) {
                return res.status(500).send(undefined);
            }

        case 'PUT':
            if (!isPutQuery(query)) break;
            try {
                let result = await db.query("INSERT INTO Category(name) VALUES ($1::text) ON CONFLICT DO NOTHING", [query.name]);
            } catch (e) { }
            return res.status(200).send(undefined);

        case 'DELETE':
            if (!isDeleteQuery(query)) break;
            try {
                let result = await db.query("DELETE FROM Category WHERE name = $1::text", [query.name]);
            } catch (e) { }
            return res.status(200).send(undefined);
    }
    res.status(400).send(undefined);
}

