import { useState, useEffect } from "react";
import { TextField, Button, Card, Grid } from '@mui/material';
import Filter from "./filter";
import OrderCard from "./order-card";
import type { Order } from '../util/schemas';
import { FetchOrders } from '../services/api-requests';
import type {Seeker} from '../util/schemas';

const SeekerOrders = () => {
    const [orders, setOrders] = useState<Order[]>();

    useEffect(() => {
        FetchOrders(1).then(res => {
            setOrders(res.data)
        })
    }, [])

    return (
        <div>
        <h1>Your orders</h1>
        <Grid container style={{display: 'flex'}} justifyContent={'end'}>
            {/* <Grid item style={{marginRight: '3em', marginTop: '2em'}}>
                <Filter/>
            </Grid> */}
            <Grid item container spacing={3}
                  style={{paddingRight: '3em', paddingLeft: '3em', marginBottom: '3em', marginTop: '0.3em'}}>
                {orders?.map((order: Order) => {
                    return <Grid item xs={5} sm={4}>
                        <OrderCard orderNumber={order.id} orderStatus={order.status} seeker={order.seeker ? order.seeker.name : ''}/>
                    </Grid>
                })}
            </Grid>
        </Grid>
        </div>
    )
};

export default SeekerOrders; 