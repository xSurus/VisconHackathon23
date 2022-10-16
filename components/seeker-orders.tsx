import { useState, useEffect } from "react";
import { TextField, Button, Card, Grid } from "@mui/material";
import Filter from "./filter";
import OrderCard from "./order-card-seeker";
import type { Order } from "../util/schemas";
import { FetchOrdersSeeker } from "../services/api-requests";
import type { Seeker } from "../util/schemas";
import { OrderStatus } from "../util/schemas";
import Typography from "@mui/material/Typography";
import type { FilterElement } from "./filter";

const SeekerOrders = ({seeker_id}: {seeker_id: number}) => {
	const [orders, setOrders] = useState<Order[]>([]);

	const [categories, setCategories] = useState<FilterElement[]>([
		{
			cat: OrderStatus[OrderStatus.Pending],
			checked: true,
		},
		{
			cat: OrderStatus[OrderStatus.Confirmed],
			checked: true,
		},
		{
			cat: OrderStatus[OrderStatus.Declined],
			checked: true,
		},
		{
			cat: OrderStatus[OrderStatus.Paid],
			checked: true,
		},
	]);

    useEffect(() => {
		FetchOrdersSeeker(1).then((res) => {
			setOrders(res.data);
		});
	}, []);


	return (
		<Grid
			container
			style={{ display: "flex", maxHeight: "8em" }}
			justifyContent={"space-between"}
		>
			<Grid item>
				<Typography
					style={{
						marginLeft: "3em",
						marginTop: "1.6em",
						fontSize: "1.3em",
						fontWeight: "bold",
						fontFamily: "Roboto",
					}}
				>
					ALL ORDERS
				</Typography>
			</Grid>
			<Grid item style={{ marginRight: "3em", marginTop: "2em" }}>
				<Filter categories={categories} setCategories={setCategories} />
			</Grid>
			<Grid
				item
				container
				spacing={2}
				style={{
					paddingRight: "3em",
					paddingLeft: "3em",
					marginBottom: "3em",
					marginTop: "0.3em",
				}}
			>
				{orders.filter(x => categories.filter(x => x.checked).map(x => x.cat).filter(value => value === OrderStatus[x.status]).length > 0
                    ).map((order: Order) => {
					return (
						<Grid item xs={12} key={order.id}>
							<OrderCard
								orderNumber={order.id}
								orderStatus={order.status}
								seeker={order.seeker ? order.seeker.name : ""}
								key={order.id}
								seeker_id={seeker_id}
							/>
						</Grid>
					);
				})}
			</Grid>
		</Grid>
	);
};

export default SeekerOrders;