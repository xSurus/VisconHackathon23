import {Button, Grid, Icon, IconButton } from "@mui/material";
import { useState } from "react";
import SeekerOrders from "../components/seeker-orders";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LoginForm from "../components/login-form";
import styled from "@emotion/styled";
import SeekerOffers from "../components/seeker-offers";
//
// const useStyles = makeStyles({
//     container_content: {
//         margin: 2,
//     },
//     btn: {
//         margin: 10,
//     },
//     headertext: {
//         fontSize: 20,
//         fontWeight: 600,
//         textAlign: 'center',
//     },
//     body : {
//         backgroundColor: '#f7f7f7',
//         padding: 20,
//     },
// })
const Seeker = () => {

    const [page, showPage] = useState(<SeekerOrders/>);
    const [whichPage, setWhichPage] = useState<number>(1);

    const HeaderM = styled(Grid)`
        background-color: #white;
        height: 3em;
        width: 100%;
        margin-bottom: 1em; 
    `
    const HeaderText = styled(Grid)`
        font-size: 1.5em;
        font-weight: bold;
        text-align: center;
        fontSize: large;
    `
    const AccountIcon = styled(IconButton)`
        float: right;
        margin-top: 0.5em;
        margin-right: 0.5em;
    `
    return (
        <Grid>
            <HeaderM container >
                <HeaderText item xs={4} >
                    <Button
                        onClick={() => {showPage(<SeekerOrders/>); setWhichPage(1)}}
                        style={{color: whichPage == 1 ? 'darkred' : 'rgba(0,0,0,1)', cursor:'pointer', display: 'inline', fontSize: '1.5em'}}>
                        Orders
                    </Button>
                </HeaderText>
                <HeaderText item xs={4}>
                <Button
                    onClick={() => {showPage(<SeekerOffers/>); setWhichPage(2)}}
                    style={{color: whichPage == 2 ? 'darkred' : 'rgba(0,0,0,1)', cursor:'pointer', display: 'inline', fontSize: '1.5em'}}>
                    Offers
                </Button>
                </HeaderText>
                <HeaderText item xs={4}>
                    <IconButton
                        onClick={() => {showPage(<LoginForm/>); setWhichPage(3)}}
                        style={{color: whichPage == 3 ? 'darkred' : 'rgba(0,0,0,1)', cursor:'pointer', display: 'inline', fontSize: '1.5em'}}>
                        <AccountBoxIcon />
                    </IconButton>
                </HeaderText>
            </HeaderM>
            <Grid container>
            { page }
            </Grid>
        </Grid>
    )
}

export default Seeker;