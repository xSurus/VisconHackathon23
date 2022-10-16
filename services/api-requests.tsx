import axios from "axios";
import { PostQuery } from "../pages/api/order";
import {Offer} from "../util/schemas";
import type {Seeker} from '../util/schemas';
import { resourceLimits } from "worker_threads";

export const FetchOffers = async () => {
    const result = await axios.get(
      '/api/offer',
    );
    return result;
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
    console.log('lol');
    return result;
}


export const editOrder = async (id : number, status : number) => {
  const res = await axios.patch(
    '/api/order', null, { params: {id, status} }
  );
  return res;
}