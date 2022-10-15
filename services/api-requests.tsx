import axios from "axios";
import {Offer} from "../util/schemas";

export const FetchOffers = async () => {
    const result = await axios(
      '/api/offer',
    );
    return result;
}

export const FetchOrders = async () => {
  const result = await axios(
    '/api/order',
  );
  return result;
}

export const PostOffer = async (offer : Offer) => {
  const result = await axios.post(
    'api/offer',
    offer
  );
  return result;
}