import { useState, useEffect } from "react";
import { TextField, Button, Card, Grid } from "@mui/material";
import Filter from "./filter";
import OrderCard from "./order-card-supplier";
import type { Order } from "../util/schemas";
import { FetchOrders } from "../services/api-requests";
import type { Seeker } from "../util/schemas";
import { OrderStatus } from "../util/schemas";
import Typography from "@mui/material/Typography";
import type { FilterElement } from "./filter";

const SupplierOrders = () => {
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
		FetchOrders(1).then((res) => {
			setOrders(res.data);
		});
	}, []);

	const setOrderStatus = (id: number, status: number) => {
		const order_idx = orders.findIndex((o) => o.id == id);
		if (order_idx != -1) {
			orders[order_idx].status = status;
		}
		setOrders([...orders]);
	};

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
								setOrderStatus={setOrderStatus}
								orderNumber={order.id}
								orderStatus={order.status}
								seeker={order.seeker ? order.seeker.name : ""}
								key={order.id}
							/>
						</Grid>
					);
				})}
			</Grid>
		</Grid>
	);
};

export default SupplierOrders;
