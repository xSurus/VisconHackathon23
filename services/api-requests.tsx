import axios from "axios";
import type { Voucher } from '../util/schemas';

export const fetchVouchers = async () => {
    const result = await axios(
      '/api/voucher',
    );
    return result;
}