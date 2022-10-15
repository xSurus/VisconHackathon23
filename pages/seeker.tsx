import {Button, Grid } from "@mui/material";
import { useState } from "react";
import SeekerVouchers from "../components/seeker-vouchers";
import SeekerOrders from "../components/seeker-orders";
import CompanyVoucher from "../components/voucher-company";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    container_content: {
        margin: 20,
    },
    header: {
        marginBottom: 20,
        color: '#white',
    },
    btn: {
        margin: 10,
    },
    headertext: {
        fontSize: 20,
        fontWeight: 600,
        textAlign: 'center',
    },
    body : {
        backgroundColor: '#f7f7f7',
        padding: 20,
    },
})
const Seeker = () => {

    const [page, showPage] = useState(<SeekerOrders/>);
    const [whichPage, setWhichPage] = useState<number>(1);
    const classes = useStyles();

    return (
        <Grid>
            <Grid container className={classes.header}>
                <Grid item xs={6} className={classes.headertext}>
                    <Button
                        onClick={() => {showPage(<SeekerOrders/>); setWhichPage(1)}}
                        style={{color: whichPage == 1 ? 'darkred' : 'rgba(0,0,0,1)', cursor:'pointer', display: 'inline', fontSize: '1.5em'}}>
                        Orders
                    </Button>
                </Grid>
                <Grid item xs={6} className={classes.headertext}>
                <Button
                    onClick={() => {showPage(<SeekerVouchers/>); setWhichPage(2)}}
                    style={{color: whichPage == 2 ? 'darkred' : 'rgba(0,0,0,1)', cursor:'pointer', display: 'inline', fontSize: '1.5em'}}>
                    Vouchers
                </Button>
                </Grid>
            </Grid>
            <Grid container className={classes.body}>
            { page }
            </Grid>
        </Grid>
    )
}

export default Seeker;