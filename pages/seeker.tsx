import {AppBar, Button, Grid, Icon, IconButton, Link, Toolbar, Typography} from "@mui/material";
import {useState} from "react";
import SeekerOffers from "../components/seeker-offers";
import SeekerOrders from "../components/seeker-orders";
import CompanyVoucher from "../components/offer-card";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LoginForm from "../components/login-form";
import styled from "@emotion/styled";
import { GetServerSideProps } from "next";
import Cookies from "cookies";
import { COOKIE_ID, COOKIE_TOKEN, COOKIE_V } from "./api/login";

const SeparatorBar = styled(Grid)`
  color: #696969;
  opacity: 0.5;
  margin-bottom: 0.3em;
  margin-right: 1em;
  margin-left: 1em;
`
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

type Data = { userType: string; token: string; id: number };

const Seeker = (data: Data) => {
    const [page, showPage] = useState(<SeekerOrders/>);
    const [whichPage, setWhichPage] = useState<number>(1);
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

export const getServerSideProps: GetServerSideProps<Data> = async (context) => {
	const cookies = new Cookies(context.req, context.res);
	const id = cookies.get(COOKIE_ID);
	const token = cookies.get(COOKIE_TOKEN);
	const userType = cookies.get(COOKIE_V);

	if (!id || !token || !userType || userType === "supplier") {
		// Remove cookies and redirect
		cookies.set(COOKIE_ID);
		cookies.set(COOKIE_TOKEN);
		cookies.set(COOKIE_V);

		return { redirect: { destination: "/", permanent: true } };
	} else {
		return { props: { id: parseInt(id, 10), token, userType } };
	}
};