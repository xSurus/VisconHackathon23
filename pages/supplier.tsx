import * as React from 'react';
import {AppBar, Button, Grid, Link, Toolbar, Typography, IconButton } from "@mui/material";
import Cookies from "cookies";
import { COOKIE_ID, COOKIE_TOKEN, COOKIE_V } from "./api/login";
import { GetServerSideProps } from "next";
import CreateVoucher from "../components/createVoucher";
import styled from "@emotion/styled";
import SupplierOrders from "../components/supplier-orders";
import LoginForm from "../components/login-form";

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { style } from "@mui/system";
import SupplierOffers from "../components/supplier-my-offers";
import { useState } from "react";

type Data = { token: string; id: number; userType: string };

const Supplier = (data: Data) => {
	const [page, showPage] = useState(<SupplierOrders />);
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
                Voucher bros
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
                    showPage(<SupplierOrders/>);
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
                    showPage(<SupplierOffers/>);
                    setWhichPage(2)
                }}
                sx={{ my: 1, mx: 1.5 }}
                >
                Offers
                </Link>
                <Link
                variant="button"
                color="text.primary"
                href="#"
                style={{
                    opacity: whichPage === 3 ? 1 : 0.4,
                }}
                onClick={() => {
                    showPage(<CreateVoucher/>);
                    setWhichPage(3)
                }}
                sx={{ my: 1, mx: 1.5 }}
                >
                Create Voucher
                </Link>
            </nav>
            <Button onClick={() => {
                            showPage(<LoginForm/>);
                            setWhichPage(4)
                        }} variant="outlined" href="#" sx={{ my: 1, mx: 1.5 }} 
                        style={{
                            opacity: whichPage === 4 ? 1 : 0.4,
                        }}>
                Login/Profile
            </Button>
            </Toolbar>
            </AppBar>
            <Grid item>
                {page}
            </Grid>
        </Grid>
    )
}

export const getServerSideProps: GetServerSideProps<Data> = async (context) => {
	const cookies = new Cookies(context.req, context.res);
	const id = cookies.get(COOKIE_ID);
	const token = cookies.get(COOKIE_TOKEN);
	const userType = cookies.get(COOKIE_V);
	if (!id || !token || !userType || userType === "seeker") {
		cookies.set(COOKIE_ID);
		cookies.set(COOKIE_TOKEN);
		cookies.set(COOKIE_V);

		return { redirect: { destination: "/", permanent: true } };
	} else {
		return { props: { id: parseInt(id, 10), token, userType } };
	}
};

export default Supplier;
