import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import {CardActionArea, Grid} from '@mui/material';

interface OrderCardProps {
    orderNumber: number,
    orderStatus: number,
    seeker: string
}

const OrderCard = (props: OrderCardProps) => {

    const {orderNumber, orderStatus, seeker} = props;

    const getLabel = (orderStatus: number) => {
        switch (orderStatus) {
            case 0: return 'Pending';
            case 1: return 'Confirmed';
            case 2: return 'Declined';
            case 3: return 'Paid';
            default: return '';
        }
    }

    const getColor = (orderStatus: number) => {
        switch (orderStatus) {
            case 0: return 'warning';
            case 1: return 'success';
            case 2: return 'error';
            case 3: return 'success';
            default: return undefined;
        }
    }

    return (
            <Card elevation={3}>
                <CardActionArea>
                    <CardContent>
                        <Grid container justifyContent={'space-between'}>
                            <Grid item style={{marginLeft: '5   em'}}>
                                <Typography gutterBottom variant="h5" component="div" style={{}}>
                                    Order Number: {`${orderNumber}`}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography gutterBottom variant="h5" component="div">
                                    Ordered by {`${seeker}`}
                                </Typography>
                            </Grid>
                            <Grid item style={{marginRight: '5em'}}>
                                <Chip
                                    label={getLabel(orderStatus)}
                                    color={getColor(orderStatus)}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </CardActionArea>
            </Card>
    );
}
export default OrderCard;