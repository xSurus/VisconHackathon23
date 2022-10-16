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
import { DeleteOffer } from '../services/api-requests';
import { DeleteQuery } from '../pages/api/order';

interface OfferCardProps {
    companyName: string,
    voucherPrice: number,
    companyImageUrl: string,
    offerDescription: string,
    availableVouchers: number,
    orderId: number
}
const DeleteVoucherButton = styled(Button)`
color: #ff5050;

&:hover {
  background-color: inherit;
  color: #ff0000;
}
`

const VoucherCard = (props: OfferCardProps) => {
    const deleteOnClick = () => {
        DeleteOffer({id : orderId})
    
    }
    const {companyName, voucherPrice, companyImageUrl, offerDescription, availableVouchers, orderId} = props;
    const [active, setActive] = useState(false);

   

    const contentUnclicked = <ul>
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
                            
                                <DeleteVoucherButton>
                                    Delete this offer
                                </DeleteVoucherButton>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </ul>

    const contentClicked = <ul>
            <CardContent>
                <Grid container direction={'column'} justifyContent={'center'} alignItems={'center'} spacing={2}>
                    <Grid item>
                        <Typography>
                            Are you sure?
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button type="submit"
                            variant="contained"
                            onMouseDown={event => event.stopPropagation()}
                            onClick={deleteOnClick}
                        >
                            Delete
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </ul>



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
export default VoucherCard;