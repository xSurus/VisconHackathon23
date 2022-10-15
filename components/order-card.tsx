import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea} from '@mui/material';
import {useState} from "react";

interface OrderCardProps {
    orderNumber: number,
    orderStatus: number,
    seeker: string
}

const OrderCard = (props: OrderCardProps) => {

    const {orderNumber, orderStatus, seeker} = props;

    return (
        <Card elevation={3}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" style={{}}>
                        {`${orderNumber}`}
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
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
export default OrderCard;