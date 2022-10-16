import type { NextApiRequest, NextApiResponse } from "next";
import PDFDocument from "pdfkit";
import fs from "fs";
import axios from "axios";
import type { Voucher, Supplier } from "../../util/schemas";
type Data =
	| {
			name: string;
	  }
	| undefined;

let generate_qr_code = async (uuid: string, dimensions: number) => {
	const size = dimensions.toString() + "x" + dimensions.toString();
	const data = uuid;
	const qr = await axios.get("https://api.qrserver.com/v1/create-qr-code/", {
		params: { size, data },
		responseType: "arraybuffer",
	});
	return qr.data;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const { query } = req;

	if (query && typeof query.uuid === "string") {
		const uuid = query.uuid;
		res.writeHead(200, {
			"Content-Type": "application/pdf",
		});
		const doc = new PDFDocument({ size: "A4" });
		doc.pipe(res);
		const voucher = (
			await axios.get("http://localhost:3000/api/voucher", {
				params: { id: uuid },
			})
		).data;

		console.log(voucher);

		const value = voucher[0].price;
		const activity = voucher[0].name;
		const supplier_id = voucher[0].supplier_id;
		const offer_id = voucher[0].offer_id;

		const supplier_s: Supplier = (
			await axios.get("http://localhost:3000/api/supplier", {
				params: { id: supplier_id },
			})
		).data;
		const supplier_img = supplier_s.img;

		console.log(supplier_s);

		doc.fontSize(40).text("Gift Voucher\n\n");
		doc.fontSize(50).text(value + "CHF.-");
		doc.fontSize(30).text("for " + activity + "\n\n\n");
		doc.fontSize(20).text("at\n\n\n\n\n\n\n");
		doc.fontSize(20).text("Proudly sponsored by:");

		const qr = await generate_qr_code(
			"http://balls.axelmontini.dev/redeem/" + uuid,
			150
		);
		const seeker = await fetchImage(
			"https://www.mrw.it/img/cope/0iwkf4_1609360688.jpg"
		);
		const supplier = await fetchImage(
			supplier_img || "https://www.mrw.it/img/cope/0iwkf4_1609360688.jpg"
		);

		doc.image(qr, 400, 50);
		doc.image(seeker, 300, 415, {
			fit: [150, 150],
			align: "center",
			valign: "center",
		});
		doc.image(supplier, 300, 260, {
			fit: [150, 150],
			align: "center",
			valign: "center",
		});

		doc.end();
	} else {
		return res.status(400).send(undefined);
	}
}

async function fetchImage(src: string) {
	const image = await axios.get(src, {
		responseType: "arraybuffer",
	});
	return image.data;
}
