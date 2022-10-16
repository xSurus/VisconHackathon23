import axios from "axios";
import { PostQuery } from "../pages/api/order";
import { Offer } from "../util/schemas";
import { PostBody as LoginPostBody } from "../pages/api/login";

export const FetchOffers = async () => {
	const result = await axios.get("/api/offer");
	return result;
};

export const sendLogin = async (
	email: string,
	password: string,
	userType: LoginPostBody["v"]
) => {
	const body: LoginPostBody = { email, password, v: userType };
	const result = await axios.post("/api/login", body);
	return result;
};

export const FetchOrders = async (seeker_id: number) => {
	const result = await axios.get("/api/order", { params: { seeker_id } });
	return result;
};

export const SendSupplierRegistration = (data: PostQuery) => {
	const params = { params: data };
	const result = axios
		.post("/api/supplier", null, params)
		.then((response) => {
			console.log(response);
		});
	console.log("lol");
	return result;
};

export const SendSeekerRegistration = (data: PostQuery) => {
	const params = { params: data };
	const result = axios.post("/api/seeker", null, params).then((response) => {
		console.log(response);
	});
	console.log("lol");
	return result;
};

export const editOrder = async (id: number, status: number) => {
	const res = await axios.patch("/api/order", null, {
		params: { id, status },
	});
	return res;
};
