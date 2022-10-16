import { NextApiHandler } from "next";
import db from "../../util/db";
import bcrypt from "bcrypt";
import Cookies from "cookies";

const saltRounds = 13;

export type PostBody = {
	email: string;
	password: string;
	v: "seeker" | "supplier";
};

export function isPostBody(b: any): b is PostBody {
	return (
		b &&
		typeof b.email === "string" &&
		typeof b.password === "string" &&
		typeof b.v === "string" &&
		(b.v === "seeker" || b.v === "supplier")
	);
}

export const COOKIE_TOKEN = "__token";
export const COOKIE_V = "__SSV";
export const COOKIE_ID = "__id";

const handler: NextApiHandler = async (req, res) => {
	const { body } = req;
	if (req.method === "POST" && isPostBody(body)) {
		const { email, password: p_unsafe } = body;
		// hashed password (safe)

		if (body.v === "seeker") {
			console.log("Seeker login attempt");
			const result = await db.query(
				"SELECT seeker_id AS id, token, password FROM SeekerCredential WHERE email=$1::text",
				[email]
			);

			if (result.rows.length > 0) {
				const { id, token, password } = result.rows[0];
				if (await bcrypt.compare(p_unsafe, password)) {
					console.log(`Successful login for seeker id ${id}`);
					const cookies = new Cookies(req, res);
					cookies.set(COOKIE_TOKEN, token);
					cookies.set(COOKIE_V, body.v);
					cookies.set(COOKIE_ID, id);
					return res.status(200).send(undefined);
				}
			}
		} else {
			console.log("supplier login attempt");
			const result = await db.query(
				"SELECT supplier_id AS id, token, password FROM SupplierCredential WHERE email=$1::text",
				[email]
			);

			if (result.rows.length > 0) {
				const { id, token, password } = result.rows[0];
				if (await bcrypt.compare(p_unsafe, password)) {
					console.log(`Successful login for supplier id ${id}`);
					const cookies = new Cookies(req, res);
					cookies.set(COOKIE_TOKEN, token);
					cookies.set(COOKIE_V, body.v);
					cookies.set(COOKIE_ID, id);
					return res.status(200).send(undefined);
				}
			}
		}
	}

	res.status(403).send(undefined);
};

export default handler;
