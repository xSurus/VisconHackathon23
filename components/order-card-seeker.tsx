import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import {CardActionArea, Grid} from '@mui/material';
import { editOrder } from '../services/api-requests';
import { OrderStatus} from '../util/schemas';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

interface OrderCardProps {
    orderNumber: number,
    orderStatus: number,
    seeker: string,
    seeker_id: number,
}

const OrderCard = (props: OrderCardProps) => {

    const {orderNumber, orderStatus, seeker} = props;

    const getLabel = (orderStatus: OrderStatus) => OrderStatus[orderStatus]

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
                                <Link href="/api/pdf">
                                <Button onClick={() => {}}><PictureAsPdfIcon></PictureAsPdfIcon></Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </CardContent>
                </CardActionArea>
            </Card>
    );
}
export default OrderCard;