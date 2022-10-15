import { NextApiHandler } from "next";
import { isInteger, Order } from "../../util/schemas";
import db from "../../util/db";
import { getSeekerById } from "./seeker";
import { Result } from "@mui/system/cssVars/useCurrentColorScheme";

export type PostData = Order;
/** Delete given offer */
export type DeleteData = undefined;
export type GetData = Order[];

export type Data = GetData | PostData | DeleteData;

/** Get all orders of this */
export type GetQuery = {
	seeker_id: number;
};

/** Create order for request */
export type PostQuery = {
	/** What offer to create an order for */
	offer_id: number;
	/** How many vouchers to order */
	amount: number;
};

export type DeleteQuery = {
	order_id: number;
};

export function isDeleteQuery(query: any): query is DeleteQuery {
	return query && isInteger(query.order_id);
}

export function isPostQuery(query: any): query is PostQuery {
	return query && isInteger(query.offer_id) && isInteger(query.amount);
}

export function isGetQuery(query: any): query is GetQuery {
	return query && isInteger(query.seeker_id);
}

const handler: NextApiHandler<Data> = async (req, res) => {
	const { query } = req;

	if (req.method === "GET" && isGetQuery(query)) {
		const result = await db.query(
			"SELECT * FROM Ordine WHERE seeker_id = $1::integer",
			[query.seeker_id]
		);

		const orders: Order[] = [];
		for (const order of result.rows) {
			const seeker = await getSeekerById(order.seeker_id);

			orders.push({
				id: order.id,
				status: order.status,
				seeker: seeker ? seeker : undefined,
			});
		}

		return res.status(200).json(orders);
	} else if (req.method == "POST" && isPostQuery(query)) {
		// Check if ENOUGH vouchers are available (not already part of an order).
		// If that's the case, send a 404 to indicate that not enough voucher were found.
		db.query("SELECT * FROM Voucher LEFT JOIN");
	} else if (req.method === "DELETE" && isDeleteQuery(query)) {
	} else {
		res.status(400).send(undefined);
	}
};

export default handler;
