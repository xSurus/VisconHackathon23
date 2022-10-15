import { useState, useEffect } from "react";
import { TextField, Button, Card, Grid } from '@mui/material';
import type { Voucher } from '../util/schemas';
import axios from "axios";
import { fetchVouchers } from '../services/api-requests';
import CompanyVoucher from "./voucher-company";


const SeekerVouchers = () => {
    const [vouchers, setVouchers] = useState([]);

    useEffect(() => {
        fetchVouchers().then(res => {
          setVouchers(res.data)
        })
    },[])

    return (
        <div>
            {<Filter /> }
            <Grid container className={classes.container_content}>
                    {vouchers.map((voucher : Voucher) => {
                        return <Grid item xs={5} sm={4}>
                            <CompanyVoucher companyName = {voucher.name} voucherPrice = {voucher.price} key={voucher.id}/>
                        </Grid>
                    })}
                { console.log(JSON.stringify(vouchers)) }
            </Grid> 
        </div>
    );
};

export default SeekerVouchers; 