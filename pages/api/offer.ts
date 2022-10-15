import db from '../../util/db'
import { Category, Offer, Supplier } from '../../util/schemas'


type GetQuery = { id: number }
type PostQuery = { supplier?: Supplier, categories: Category[], } 
type DeleteQuery = { id: number }
type PatchQuery = { id: number, street: string, cap: number, city: string, country: string }

function isGetQuery(query: any): query is GetQuery {
    return query && typeof query.id === 'string' && !isNaN(query.id)
}

function isPostQuery(query: any): query is PostQuery {
    return query && typeof query.supplier === 'string' && !isNaN(query.supplier) &&
}

function isDeleteQuery(query: any): query is DeleteQuery {
    return query && typeof query.id === 'number'
}

function isPatchQuery(query: any): query is PatchQuery {
    return query && typeof query.id === 'number' && query.street === 'string' && query.cap === 'number' && query.city === 'string' && query.country === 'string'
}

type Data = Offer
| undefined;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { query } = req;

    switch (req.method) {
        case 'GET':
            if (!isGetQuery(query)) break;
            try {
                let result = await db.query("SELECT * FROM Offer WHERE id = $1::integer", [query.id]);
                if (result.rowCount === 0) return res.status(404).send(undefined);
                let row: Data = result.rows[0];
                return res.status(200).json(row);
            } catch (e) { }
            return res.status(200).send(undefined);
        case 'POST':
            if (!isPostQuery(query)) break;
            try {
                let result = await db.query("")
            }
    }
} 