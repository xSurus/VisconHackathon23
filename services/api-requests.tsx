import axios from "axios";
import { PostBody as LoginPostBody } from "../pages/api/login";
import { GetIdQuery, PostQuery } from "../pages/api/offer";

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

export const FetchOffersById = async (query: GetIdQuery) => {
	const params = { params: query };
	const result = await axios.get("/api/offer", params);
	return result;
};

export const FetchOrdersSeeker = async (seeker_id: number) => {
	const result = await axios.get("/api/order", { params: { seeker_id } });
	return result;
};

export const FetchOrdersSupplier = async (supplier_id: number) => {
	const result = await axios.get("/api/order", { params: { supplier_id } });
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
/* export const PostOffer = async (offer : PostQuery) => {
  const params = {paramsSerializer: {serialize: (params :any)=>{ return qs.stringify(params, {arrayFormat: 'repeat'})}} , params: offer}
  console.log(offer);
  const result = await axios.post('api/offer', null, params ).then((response:any) => {
    console.log(response);
});
  return result;
};
 */
