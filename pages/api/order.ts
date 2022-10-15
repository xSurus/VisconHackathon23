import { NextApiHandler } from "next";
import { isInteger, Offer, Order, Voucher } from "../../util/schemas";
import db from "../../util/db";
import { getSeekerById } from "./seeker";
import { Result } from "@mui/system/cssVars/useCurrentColorScheme";
import { getSupplierById } from "./supplier";
import { getOfferById } from "./offer";

export type PostData =
	| {
			order: Order;
			vouchers: Voucher[];
	  }
	| string;
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
	/** Id of who's ordering */
	seeker_id: number;
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
	return (
		query &&
		isInteger(query.offer_id) &&
		isInteger(query.amount) &&
		isInteger(query.seeker_id)
	);
}

export function isGetQuery(query: any): query is GetQuery {
	return query && isInteger(query.seeker_id);
}

export async function getAvailableVouchersCount(
	offer_id: number
): Promise<number> {
	const result_vouchers = await db.query(
		"SELECT COUNT(*)::int FROM Voucher V LEFT JOIN Voucher_Order O ON O.voucher_id = V.id WHERE ordine_id IS NULL AND offer_id = $1::integer",
		[offer_id]
	);

	const count = result_vouchers.rows[0].count;

	return count;
}

export async function getAvailableVouchers(
	offer_id: number
): Promise<Voucher[]> {
	const result_vouchers = await db.query(
		"SELECT * FROM Voucher V LEFT JOIN Voucher_Order O ON O.voucher_id = V.id WHERE ordine_id IS NULL AND offer_id = $1::integeer"[
			offer_id
		]
	);

	const offer = await getOfferById(offer_id);
	if (!offer) return [];

	return result_vouchers.rows.map((voucher: any) => ({
		id: voucher.id,
		name: voucher.name,
		price: voucher.price,
		offer,
		supplier: offer.supplier,
	}));
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

		await db.query("BEGIN");
		// Free vouchers
		const f = async () => {
			console.log("Checkint query params");

			const offer = await getOfferById(query.offer_id);
			const seeker = await getSeekerById(query.seeker_id);
			if (!seeker) return res.status(400).send("invalid-seeker");

			if (!offer) {
				// not found offer id
				return res.status(404).send("invalid-offer");
			}
			console.log("Checking voucher count");
			const vouchers = await getAvailableVouchers(offer.id);

			// Enough
			if (vouchers.length >= query.amount) {
				const order_result = await db.query(
					"INSERT INTO Ordine (status, seeker_id) VALUES (0, $1::integer) RETURNING id, status, seeker_id",
					[query.seeker_id]
				);

				const {
					id: order_id,
					status,
					seeker_id,
				} = order_result.rows[0];
				const vouchers: Voucher[] = [];
				for (let i = 0; i < query.amount; i++) {
					const voucher = vouchers[i];
					const result = await db.query(
						"INSERT INTO Voucher_Order (ordine_id, voucher_id) VALUES ($1::integer, $2::uuid)",
						[order_id, voucher.id]
					);

					vouchers.push(voucher);
				}

				const ans: PostData = {
					order: {
						id: order_id,
						status,
						seeker,
					},
					vouchers,
				};

				res.status(200).json(ans);
			} else {
				res.status(404).send("not-enough-vouchers");
			}
		};
		f();

		await db.query("COMMIT");
	} else if (req.method === "DELETE" && isDeleteQuery(query)) {
	} else {
		res.status(400).send(undefined);
	}
};

export default handler;
