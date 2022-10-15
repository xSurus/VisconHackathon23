import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import {CardActionArea} from '@mui/material';
import {useState} from "react";

interface OrderCardProps {
    orderNumber: number,
    orderStatus: number,
    seeker: string
}

type StatusMessage = {
    label:string,
    color:("default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" | undefined)
}

const OrderCard = (props: OrderCardProps) => {

    const {orderNumber, orderStatus, seeker} = props;

    const orderStatusMessage: StatusMessage = {
        color: undefined,
        label:''
    }

    switch (orderStatus) {
        case 0: {
            orderStatusMessage.color = 'warning'
            orderStatusMessage.label = 'Pending'
        }
        case 1 : {
            orderStatusMessage.color = 'success'
            orderStatusMessage.label = 'Confirmed'
        }
        case 2: {
            orderStatusMessage.color = 'error'
            orderStatusMessage.label = 'Declined'
        }
        case 3: {
            orderStatusMessage.color =  'success'
            orderStatusMessage.label = 'Paid'
        }
    }
    return (
        <Card elevation={3}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" style={{}}>
                        Order Number: {`${orderNumber}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed est finibus eros iaculis
                        pellentesque.
                        Nulla facilisi. Quisque a quam ac nisi tristique laoreet. Aliquam eget eros vitae turpis
                        sagittis rutrum vitae et justo.
                        Morbi et nisl euismod, dignissim urna vel, rhoncus magna. Curabitur justo neque, cursus eu lorem
                        id, vehicula sagittis ligula.
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        {`${seeker}`}
                    </Typography>
                    <Chip 
                        label= { orderStatusMessage.label } 
                        color= { orderStatusMessage.color }
                    />
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
export default OrderCard;