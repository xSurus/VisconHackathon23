import { makeStyles } from "@mui/styles";
import { AppBar, Button, Grid } from "@mui/material";
import { useState } from "react";
import SeekerVouchers from "../components/seeker-vouchers";
import SeekerOrders from "../components/seeker-orders";
import Header from "../components/header";


const Seeker = () => {

    const [page, showPage] = useState(<SeekerOrders/>);
    const [whichPage, setWhichPage] = useState<number>(1);

    return (
        <div>
            <h2 
            onClick={() => {showPage(<SeekerOrders/>); setWhichPage(1)}}
            style={{color: whichPage == 1 ? 'black' : 'rgba(0,0,0,0.5)', cursor:'pointer', display: 'inline'}}>
                Orders
            </h2> 
            <h2 
            onClick={() => {showPage(<SeekerVouchers/>); setWhichPage(2)}}
            style={{color: whichPage == 2 ? 'black' : 'rgba(0,0,0,0.5)', cursor:'pointer', display: 'inline'}}>
                Vouchers
            </h2>
            { page }
        </div>
    ) 
}

export default Seeker;