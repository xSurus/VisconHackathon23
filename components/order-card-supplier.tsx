import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { CardActionArea, Grid } from "@mui/material";
import { editOrder } from "../services/api-requests";
import { OrderStatus } from "../util/schemas";
import { useMemo, useState } from "react";

interface OrderCardProps {
	orderNumber: number;
	orderStatus: number;
	seeker: string;
	setOrderStatus: (id: number, status: number) => void;
}

const OrderCard = (props: OrderCardProps) => {
	const { orderNumber, orderStatus, seeker } = props;

	const getLabel = (orderStatus: OrderStatus) => OrderStatus[orderStatus];

	let buttons = <></>

	const getColor = (orderStatus: number) => {
		switch (orderStatus) {
			case 0:
				return "warning";
			case 1:
				return "success";
			case 2:
				return "error";
			case 3:
				return "success";
			default:
				return undefined;
		}
	};

	switch (orderStatus) {
		case 0:
			buttons = (
				<div>
					<Button onClick={() => setStatusAPI(orderNumber, 1)}>
						Confirm Order
					</Button>
					<Button onClick={() => setStatusAPI(orderNumber, 2)}>
						Decline Order
					</Button>
				</div>
			);
		case 1:
			buttons =(
				<div>
					<Button onClick={() => setStatusAPI(orderNumber, 3)}>
						Confirm order as paid
					</Button>
				</div>
			);
	}

	const setStatusAPI = (order_id: number, toSet: number) => {
		editOrder(order_id, toSet).then((res) => {
			console.log("Diomerda");
			props.setOrderStatus(order_id, toSet);
		});
	};

	return (
		<Card elevation={3}>
			<CardActionArea>
				<CardContent>
					<Grid container justifyContent={"space-between"}>
						<Grid item style={{ marginLeft: "5   em" }}>
							<Typography
								gutterBottom
								variant="h5"
								component="div"
								style={{}}
							>
								Order Number: {`${orderNumber}`}
							</Typography>
						</Grid>
						<Grid item>
							<Typography
								gutterBottom
								variant="h5"
								component="div"
							>
								Ordered by {`${seeker}`}
							</Typography>
						</Grid>
						<Grid item style={{ marginRight: "5em" }}>
							<Chip
								label={getLabel(orderStatus)}
								color={getColor(orderStatus)}
							/>
							{ buttons }
						</Grid>
					</Grid>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};
export default OrderCard;
