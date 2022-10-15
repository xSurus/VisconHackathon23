import axios from "axios";

export const fetchVouchers = async () => {
    const result = await axios(
      '/api/vouchers',
    );
    return result;
}