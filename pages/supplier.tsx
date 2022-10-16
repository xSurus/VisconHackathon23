import * as React from "react";
import { Button, Grid } from "@mui/material";
import CreateVoucher from "../source/components/SupplierComponents/createVoucher";
import Cookies from "cookies";
import { COOKIE_ID, COOKIE_TOKEN, COOKIE_V } from "./api/login";
import { GetServerSideProps } from "next";

type Data = { token: string; id: number; userType: string };

const Supplier = ({ data }: { data: Data }) => {
	const [activeIndex, setActiveIndex] = React.useState<number>(1);

	return (
		<Grid container>
			<Grid item>
				<CreateVoucher />
				<div>TEST</div>
				<Button>TEST</Button>
			</Grid>
		</Grid>
	);
};

export default Supplier;
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
