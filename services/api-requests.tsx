import axios from "axios";
import {Offer} from "../util/schemas";
import type {Seeker} from '../util/schemas';

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

export const SendSupplierRegistration = (data: any) => {
  const params = new URLSearchParams();
  for (const key in data) {
    params.append(key, data[key]);
  }
    console.log(data);
    const result = axios.post('/api/supplier', params).then((response) => {
        console.log(response);
    });
    console.log('lol');
    return result;
}