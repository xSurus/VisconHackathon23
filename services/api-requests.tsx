import axios from "axios";
import { PostQuery } from "../pages/api/order";
import {Offer} from "../util/schemas";
import type {Seeker} from '../util/schemas';
import { resourceLimits } from "worker_threads";
import { number } from "yup";

export const FetchOffers = async () => {
    const result = await axios.get(
      '/api/offer',
    );
    return result;
}

export const PostOrder = (seekeridG : number, id : number, num : number) => {
  const res = axios.post(
    '/api/order', null, { params: {offer_id: id, amount: num, seeker_id : seekeridG} }
  ).then (res => {
    console.log(res);
    console.log(res.data);
  });
  return res;
}


export const SendLogin = () => {
  const result = axios(
    '/api/seeker',
  );
  return result;
}
export const SendLoginSup = () => {
  const result = axios(
    '/api/supplier',
  );
  return result;
}

export const FetchOrders = async (seeker_id : number) => {
  const result = await axios.get(
    '/api/order', { params: {seeker_id} }
  );
  return result;
}

export const SendSupplierRegistration = (data: PostQuery) => {
  const params = {params: data}
  const result = axios.post('/api/supplier', null, params).then((response) => {
      console.log(response);
  });
  return result;
}

export const SendSeekerRegistration = (data: PostQuery) => {
  const params = {params: data}
  const result = axios.post('/api/seeker', null, params).then((response) => {
      console.log(response);
  });
  return result;
}

export const editOrder = async (id : number, status : number) => {
  const res = await axios.patch(
    '/api/order', null, { params: {id, status} }
  );
  return res;
}