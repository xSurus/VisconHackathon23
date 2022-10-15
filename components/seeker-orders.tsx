import { useState, useEffect } from "react";
import { TextField, Button, Card, Grid } from '@mui/material';
import Filter from "./filter";
import OrderCard from "./order-card";
import type { Order } from '../util/schemas';
import { FetchOrders } from '../services/api-requests';
import type {Seeker } from '../util/schemas';
import { OrderStatus } from '../util/schemas';
import Typography from "@mui/material/Typography";
import type { FilterElement } from "./filter";


const SeekerOrders = () => {
    const [orders, setOrders] = useState<Order[]>();

    const [categories, setCategories] = useState<FilterElement[]>([{
        cat: OrderStatus.Pending.toString(),
        checked: true,
    }, {
        cat: OrderStatus.Confirmed.toString(),
        checked: true,
    }, {
    cat: OrderStatus.Declined.toString(),
    checked: true,
    }, {
        cat: OrderStatus.Paid.toString(),
        checked: true,
    }]);

    useEffect(() => {
        FetchOrders(1).then(res => {
            setOrders(res.data)
        })
    }, []);

    return (
        <Grid container style={{display: 'flex', maxHeight: '8em'}} justifyContent={'space-between'}>
            <Grid item>
                <Typography style={{
                    marginLeft: '3em',
                    marginTop: '1.6em',
                    fontSize: '1.3em',
                    fontWeight: 'bold',
                    fontFamily: 'Roboto'
                }}>ALL ORDERS</Typography>
            </Grid>
            <Grid item style={{marginRight: '3em', marginTop: '2em'}}>
                <Filter categories={categories} setCategories={setCategories} />
            </Grid>
            <Grid item container spacing={2}
                  style={{paddingRight: '3em', paddingLeft: '3em', marginBottom: '3em', marginTop: '0.3em'}}>
                {orders?.filter(order => {
                    categories.filter(x => x.checked).map(x => parseInt(x.cat)).filter(x => x == order.status)
                }).map((order: Order) => {
                    return (
                        <Grid item xs={12} key={order.id}>
                            <OrderCard orderNumber={order.id} orderStatus={order.status}
                                       seeker={order.seeker ? order.seeker.name : ''} key={order.id}/>
                        </Grid>
                    )
                })}
            </Grid>
        </Grid>
)};

export default SeekerOrders; 