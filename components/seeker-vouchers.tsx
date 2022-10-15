import { useState, useEffect } from "react";
import { TextField, Button, Card, Grid } from '@mui/material';
import type { Voucher } from '../util/schemas';
import axios from "axios";
import { fetchVouchers } from '../services/api-requests';
import CompanyVoucher from "./voucher-company";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    container_content: {
        margin: 20,
    },
    header: {
        marginBottom: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
    },
})

const SeekerVouchers = () => {
    const classes = useStyles();
    const [vouchers, setVouchers] = useState([]);

    useEffect(() => {
        fetchVouchers().then(res => {
          setVouchers(res.data)
        })
    },[])

    return (
        <div>
            <Grid container justifyContent={'center'} className={classes.container_content}>
                <Grid container className={classes.container_content} spacing={2}>
                    <Grid item xs={5} sm={4}>
                        <CompanyVoucher companyName = 'asdf' voucherPrice = {2}/>
                    </Grid>
                    <Grid item xs={4} sm={4}>
                        <CompanyVoucher companyName = 'asdf' voucherPrice = {2}/>
                    </Grid>
                    <Grid item xs={4} sm={4}>
                        <CompanyVoucher companyName = 'asdf' voucherPrice = {2}/>
                    </Grid>
                    <Grid item xs={5} sm={4}>
                        <CompanyVoucher companyName = 'asdf' voucherPrice = {2}/>
                    </Grid>
                    <Grid item xs={4} sm={4}>
                        <CompanyVoucher companyName = 'asdf' voucherPrice = {2}/>
                    </Grid>
                    <Grid item xs={4} sm={4}>
                        <CompanyVoucher companyName = 'asdf' voucherPrice = {2}/>
                    </Grid>
                    
                </Grid>
            </Grid>
            <pre>   
                <code> {JSON.stringify(vouchers, null, 2)} </code>
            </pre>
        </div>
    );
};

export default SeekerVouchers;