import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {CardActionArea, Grid} from '@mui/material';
import {useMemo, useState} from "react";
import styled from "@emotion/styled";
import { PostOrder } from '../services/api-requests';
import Seeker from '../pages/seeker';

interface OfferCardProps {
    companyName: string,
    voucherPrice: number,
    offerid: number,
    companyImageUrl: string,
    offerDescription: string,
    availableVouchers: number
}
const BuyVoucherButton = styled(Button)`
color: #545050;

&:hover {
  background-color: inherit;
  color: #ff0000;
}
`

const OfferCard = (props: OfferCardProps) => {

    const {companyName, voucherPrice, offerid, companyImageUrl, offerDescription, availableVouchers} = props;
    const [active, setActive] = useState(false);

    const [vouchersToOrder, setVouchersToOrder] = useState(-1);
    const handleTextFieldChange = (e : any) => {
        setVouchersToOrder(e.target.value);
    }
    const submitOrder = () => {
        if (vouchersToOrder < 0) {
            alert('Please enter a number of vouchers to order');
        } else if (vouchersToOrder > availableVouchers) {
            alert('There are not enough vouchers available');
        } else {
            /* TODO ADD COOKIE NOT USE ALERT*/
            PostOrder(2, offerid, vouchersToOrder);
            alert('Order submitted');
        }
}
   

    const contentUnclicked = 
            <CardContent>
                <Grid item container direction={'column'}>
                    <Grid item>
                        <Typography gutterBottom variant="h5" component="div">
                            {companyName}
                        </Typography>
                    </Grid>
                    <Grid item style={{minHeight: '3em', maxHeight: '5em'}}>
                        <Typography variant="body2" color="text.secondary" sx={{
                            display: '-webkit-box',
                            overflow: 'hidden',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 6,
                        }}>
                            {offerDescription}
                        </Typography>
                    </Grid>
                    <Grid item style={{marginTop: '1em'}}>
                        <Typography gutterBottom variant="h6" component="div">
                            {voucherPrice} CHF / Voucher
                            <br></br>
                            <p>{availableVouchers} Vouchers remaining!</p>
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Grid item container justifyContent={'end'} alignItems={'center'}>
                            <Grid item>
                                <BuyVoucherButton>
                                    Click to buy vouchers
                                </BuyVoucherButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>

    const contentClicked = 
            <CardContent>
                <Grid container direction={'column'} justifyContent={'center'} alignItems={'center'} spacing={2}>
                    <Grid item>
                        <Typography>
                            Order Vouchers
                        </Typography>
                    </Grid>
                    <Grid item style={{minHeight: '3em', maxHeight: '5em', marginTop: '2em'}}>
                        <TextField
                            sx={{display: 'flex', alignSelf: 'center'}}
                            id="outlined-basic"
                            label="Amount of vouchers"
                            variant="outlined"
                            value={vouchersToOrder}
                            onChange={handleTextFieldChange}
                            onMouseDown={event => event.stopPropagation()}
                            onClick={event => {
                                event.stopPropagation();
                                event.preventDefault();
                            }}
                            error={vouchersToOrder == -1}
                            helperText={vouchersToOrder < 0 ? 'Please enter a number' : ''}
                        />
                    </Grid>
                    <Grid item margin={'3em'} style={{minHeight: '3em', maxHeight: '5em'}}>
                        <Button
                            variant="contained"
                            onMouseDown={event => event.stopPropagation()}
                            size="large"
                            onClick={event => {
                                event.stopPropagation();
                                event.preventDefault();
                                submitOrder();
                            }}
                        >
                            Place Order!
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>



    const handleClick = () => {
        if (!active) {
            setActive(true);
            return;
        }
        setActive(false);
    }

   


    return (
        <Card elevation={4} style={{borderRadius: '1em', minHeight: '15em', maxHeight: '25em'}}>
            <CardActionArea onClick={handleClick}>
                <>
                <CardMedia
                    component="img"
                    width="100%"
                    image={companyImageUrl}
                    alt={companyName}
                    sx={{maxHeight: '10em', objectFit: "contain"}}
                />
                {active ? contentClicked : contentUnclicked}</>
            </CardActionArea>
        </Card>
    );
}
export default OfferCard;