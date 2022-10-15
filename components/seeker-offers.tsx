import { useState, useEffect } from "react";
import { Grid } from '@mui/material';
import type { Voucher } from '../util/schemas';
import { FetchOffers } from '../services/api-requests';
import CompanyVoucher from "./offer-card";
import Filter from "./filter";


const SeekerOffers = () => {
    const [vouchers, setVouchers] = useState([]);

    useEffect(() => {
        FetchOffers().then(res => {
          setVouchers(res.data)
        })
    },[])

    return (
        <Grid container style={{display: 'flex'}} justifyContent={'end'}>
            <Grid item style={{marginRight: '3em', marginTop: '2em'}}>
                <Filter/>
            </Grid>
            <Grid item container spacing={3} style={{paddingRight: '3em', paddingLeft: '3em', marginBottom: '3em', marginTop: '0.3em'}}>
                    {vouchers.map((voucher : Voucher) => {
                        return <Grid item xs={5} sm={4}>
                            <CompanyVoucher companyName = {voucher.name} voucherPrice = {voucher.price} key={voucher.id}/>
                        </Grid>
                    })}
            </Grid>
        </Grid>
    );
};

export default SeekerOffers;