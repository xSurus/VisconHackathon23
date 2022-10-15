import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../util/db'


type GetQuery = { id: number }
type DeleteQuery = { id: number }
type PatchQuery = { id: number, street: string, cap: number, city: string, country: string }

function isGetQuery(query: any): query is GetQuery {
    return query && typeof query.id === 'number'
}

function isDeleteQuery(query: any): query is DeleteQuery {
    return query && typeof query.id === 'number'
}

function isPatchQuery(query: any): query is PatchQuery {
    return query && typeof query.id === 'number' && query.street === 'string' && query.cap === 'number' && query.city === 'string' && query.country === 'string'
}

type Data = {
    id: number,
    street: string,
    cap: number,
    city: string,
    country: string,
} | undefined;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { query } = req;

    switch (req.method) {
        case 'GET':
            if (!isGetQuery(query)) break;
            try {
                let result = await db.query("SELECT * FROM Address WHERE id = $1::integer", [query.id]);
                if (result.rowCount === 0) return res.status(400).send(undefined);
                let row: Data = result.rows[0];
                return res.status(200).json(row);
            } catch (e) { }
    }
}