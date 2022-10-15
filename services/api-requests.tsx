import axios from "axios";
import {Offer} from "../util/schemas";

export const FetchOffers = async () => {
    const result = await axios(
      '/api/offer',
    );
    return result;
}