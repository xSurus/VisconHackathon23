import axios from "axios";
import type { Offer } from '../util/schemas';

export const FetchOffers = async () => {
    const result = await axios(
      '/api/offer',
    );
    return result;
}