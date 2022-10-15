import {Button, Grid } from "@mui/material";
import { useState } from "react";
import SeekerVouchers from "../components/seeker-vouchers";
import SeekerOrders from "../components/seeker-orders";


const Seeker = () => {

    const [page, showPage] = useState(<SeekerOrders/>);
    const [whichPage, setWhichPage] = useState<number>(1);

    return (
        <Grid container justifyContent={'space-between'} alignItems={'center'} style={{backgroundColor: '#a1a1a1'}}>
            <Grid item>
                <Button
                    onClick={() => {showPage(<SeekerOrders/>); setWhichPage(1)}}
                    style={{color: whichPage == 1 ? 'darkred' : 'rgba(0,0,0,1)', cursor:'pointer', display: 'inline', fontSize: '1.5em'}}>
                    Orders
                </Button>
            </Grid>
            <Grid item style={{marginRight: '2.5em', marginLeft: '2.5em', color: 'rgba(105,105,105,0.5)'}}>
                |
            </Grid>
           <Grid item>
               <Button
                   onClick={() => {showPage(<SeekerVouchers/>); setWhichPage(2)}}
                   style={{color: whichPage == 2 ? 'darkred' : 'rgba(0,0,0,1)', cursor:'pointer', display: 'inline', fontSize: '1.5em'}}>
                   Vouchers
               </Button>
           </Grid>
            { page }
        </Grid>
    )
}

export default Seeker;