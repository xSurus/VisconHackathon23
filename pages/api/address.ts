import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../util/db'


type GetQuery = { id: number }
type PostQuery = { street: string, cap: number, city: string, country: string }
type DeleteQuery = { id: number }
type PatchQuery = { id: number, street: string, cap: number, city: string, country: string }

function isGetQuery(query: any): query is GetQuery {
    return query && typeof query.id === 'string' && !isNaN(query.id)
}

function isPostQuery(query: any): query is PostQuery {
    return query && typeof query.street === 'string' && typeof query.cap === 'string' && !isNaN(query.cap) && typeof query.city === 'string' && typeof query.country === 'string'
}

function isDeleteQuery(query: any): query is DeleteQuery {
    return query && typeof query.id === 'string' && !isNaN(query.id)
}

function isPatchQuery(query: any): query is PatchQuery {
    return query && typeof query.id === 'string' && !isNaN(query.id) && typeof query.street === 'string' && typeof query.cap === 'string' && !isNaN(query.cap) && typeof query.city === 'string' && typeof query.country === 'string'
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
                if (result.rowCount === 0) return res.status(404).send(undefined);
                let row: Data = result.rows[0];
                return res.status(200).json(row);
            } catch (e) {
                return res.status(500).json(undefined);
            }

        case 'POST':
            if (!isPostQuery(query)) break;
            try {
                let result = await db.query("INSERT INTO Address(street, cap, city, country) VALUES ($1::text, $2::integer, $3::text, $4::text)", [query.street, query.cap, query.city, query.country]);
            } catch (e) {
                return res.status(500).send(undefined);
            }
            return res.status(200).send(undefined);

        case 'DELETE':
            if (!isDeleteQuery(query)) break;
            try {
                let result = await db.query("DELETE FROM Address WHERE id = $1::integer", [query.id]);
            } catch (e) { }
            return res.status(200).send(undefined);

        case 'PATCH':
            if (!isPatchQuery(query)) break;
            try {
                let result = await db.query("UPDATE Address SET street=$2::text, cap=$3::integer, city=$4::text, country=$5::text WHERE id=$1::integer", [query.id, query.street, query.cap, query.city, query.country]);
            } catch (e) { }
            return res.status(200).send(undefined);
    }
    res.status(400).send(undefined);
}