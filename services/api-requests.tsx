import axios from "axios";
import {Offer} from "../util/schemas";

export const FetchOffers = async () => {
    const result = await axios(
      '/api/offer',
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

export const PostOffer = async (offer : Offer) => {
  const result = await axios.post(
    'api/offer',
    offer
  );
  return result;
};