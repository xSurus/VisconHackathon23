import { Button, Grid, Icon, IconButton } from "@mui/material";
import { useState } from "react";
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
`;

type Data = { userType: string; token: string; id: number };

const Seeker = ({ data }: { data: Data }) => {
	const [page, showPage] = useState(<SeekerOrders seeker_id={data.id} />);
	const [whichPage, setWhichPage] = useState<number>(1);

	const HeaderM = styled(Grid)`
		background-color: #white;
		height: 3em;
		width: 100%;
		margin-bottom: 1em;
	`;
	const HeaderText = styled(Grid)`
		font-size: 1.5em;
		font-weight: bold;
		text-align: center;
		fontsize: large;
	`;
	const AccountIcon = styled(IconButton)`
		float: right;
		margin-top: 0.5em;
		margin-right: 0.5em;
	`;
	return (
		<Grid container>
			<Grid
				item
				container
				justifyContent={"center"}
				alignItems={"center"}
				style={{ backgroundColor: "#0C7B93" }}
			>
				<Grid>
					<Button
						onClick={() => {
							showPage(<SeekerOrders seeker_id={data.id}/>);
							setWhichPage(1);
						}}
						style={{
							color:
								whichPage === 1 ? "darkred" : "rgba(0,0,0,1)",
							cursor: "pointer",
							display: "inline",
							fontSize: "1.5em",
						}}
					>
						Orders
					</Button>
				</Grid>
				<SeparatorBar>|</SeparatorBar>
				<Grid item>
					<Button
						onClick={() => {
							showPage(<SeekerOffers />);
							setWhichPage(2);
						}}
						style={{
							color:
								whichPage === 2 ? "darkred" : "rgba(0,0,0,1)",
							cursor: "pointer",
							display: "inline",
							fontSize: "1.5em",
						}}
					>
						Offers
					</Button>
				</Grid>
				<SeparatorBar>|</SeparatorBar>
				<Grid item>
					<IconButton
						onClick={() => {
							showPage(<LoginForm />);
							setWhichPage(3);
						}}
						style={{
							color:
								whichPage === 3 ? "darkred" : "rgba(0,0,0,1)",
							fontSize: "1.5em",
						}}
					>
						<AccountBoxIcon />
					</IconButton>
				</Grid>
			</Grid>
			<Grid container style={{ marginTop: whichPage === 3 ? "-3em" : 0 }}>
				{page}
			</Grid>
		</Grid>
	);
};

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
