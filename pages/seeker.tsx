import {AppBar, Button, Grid, Icon, IconButton, Link, Toolbar, Typography} from "@mui/material";
import {useState} from "react";
import SeekerOffers from "../components/seeker-offers";
import SeekerOrders from "../components/seeker-orders";
import CompanyVoucher from "../components/offer-card";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LoginForm from "../components/login-form";
import styled from "@emotion/styled";

const SeparatorBar = styled(Grid)`
  color: #696969;
  opacity: 0.5;
  margin-bottom: 0.3em;
  margin-right: 1em;
  margin-left: 1em;
`

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
        <Grid container>
            <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{ borderBottom: `1px solid black` }}
            >
            <Toolbar sx={{ flexWrap: 'wrap' }}>
            <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                OUR NAME
            </Typography>
            <nav>
                <Link
                variant="button"
                color="text.primary"
                href="#"
                style={{
                    opacity: whichPage === 1 ? 1 : 0.4,
                }}
                onClick={() => {
                    showPage(<SeekerOrders/>);
                    setWhichPage(1)
                }}
                sx={{ my: 1, mx: 1.5 }}
                >
                Orders
                </Link>
                <Link
                variant="button"
                color="text.primary"
                href="#"
                style={{
                    opacity: whichPage === 2 ? 1 : 0.4,
                }}
                onClick={() => {
                    showPage(<SeekerOffers/>);
                    setWhichPage(2)
                }}
                sx={{ my: 1, mx: 1.5 }}
                >
                Offers
                </Link>
            </nav>
            <Button onClick={() => {
                            showPage(<LoginForm/>);
                            setWhichPage(3)
                        }} variant="outlined" href="#" sx={{ my: 1, mx: 1.5 }} 
                        style={{
                            opacity: whichPage === 3 ? 1 : 0.4,
                        }}>
                Login/Profile
            </Button>
            </Toolbar>
            </AppBar>
            <Grid container style={{marginTop: whichPage === 3 ? '-3em' : 0}}>
                {page}
            </Grid>
        </Grid>
    )
}

export default Seeker;


// THIS IS THE PREVIOUS CODE IN CASE SOMEONE COMPLAINS ABOUT THE NEW CODE
{/* <Grid item container justifyContent={'center'} alignItems={'center'} style={{backgroundColor: '#0C7B93'}}>
                <Grid>
                    <Button
                        onClick={() => {
                            showPage(<SeekerOrders/>);
                            setWhichPage(1)
                        }}
                        style={{
                            color: 'rgba(0,0,0,1)',
                            cursor: 'pointer',
                            display: 'inline',
                            fontSize: '1.5em',
                            opacity: whichPage === 1 ? 1 : 0.4,
                        }}>
                        Orders
                    </Button>
                </Grid>
                <SeparatorBar>
                    |
                </SeparatorBar>
                <Grid item>
                    <Button
                        onClick={() => {
                            showPage(<SeekerOffers/>);
                            setWhichPage(2)
                        }}
                        style={{
                            color: 'rgba(0,0,0,1)',
                            cursor: 'pointer',
                            display: 'inline',
                            fontSize: '1.5em',
                            opacity: whichPage === 2 ? 1 : 0.4,
                        }}>
                        Offers
                    </Button>
                </Grid>
                <SeparatorBar>
                    |
                </SeparatorBar>
                <Grid item>
                    <IconButton
                        onClick={() => {
                            showPage(<LoginForm/>);
                            setWhichPage(3)
                        }}
                        style={{opacity: whichPage === 3 ? 1 : 0.4, fontSize: '1.5em'}}>
                        <AccountBoxIcon/>
                    </IconButton>
                </Grid>
            </Grid>
            <Grid container style={{marginTop: whichPage === 3 ? '-3em' : 0}}>
                {page}
            </Grid>
        </Grid>*/}