import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { CardActionArea, Grid } from "@mui/material";
import { editOrder } from "../services/api-requests";
import { OrderStatus } from "../util/schemas";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface OrderCardProps {
	orderNumber: number;
	orderStatus: number;
	seeker: string;
}

const OrderCard = (props: OrderCardProps) => {
	const { orderNumber, orderStatus, seeker } = props;

	const getLabel = (orderStatus: OrderStatus) => OrderStatus[orderStatus];

    const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

	let buttons = <></>;

	switch (orderStatus) {
		case 3:
			buttons = (
				<div>
					<Button variant="outlined" onClick={handleClickOpen}>
						Show Billing information
					</Button>
					<Dialog
						open={open}
						onClose={handleClose}
						aria-labelledby="alert-dialog-title"
						aria-describedby="alert-dialog-description"
					>
						<DialogTitle id="alert-dialog-title">
							{"Use Google's location service?"}
						</DialogTitle>
						<DialogContent>
							<DialogContentText id="alert-dialog-description">
								IBAN: CH93 0076 2011 6238 5295 7
                                <br></br>
                                Via Pian Scairolo 43, 6912 Lugano. Svizzera
                                <br></br>
                                Your order will be confirmed by the supplier once the payment has been completed.
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleClose}>Close</Button>
						</DialogActions>
					</Dialog>
				</div>
			);
	}

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
						</Grid>
						{buttons}
					</Grid>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};
export default OrderCard;
