import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {CardActionArea, Grid} from '@mui/material';
import {useState} from "react";
import styled from "@emotion/styled";

interface OfferCardProps {
    companyName: string,
    voucherPrice: number,
    companyImageUrl: string,
    offerDescription: string
}

const OfferCard = (props: OfferCardProps) => {

    const {companyName, voucherPrice, companyImageUrl, offerDescription} = props;
    const [active, setActive] = useState(false);

    const BuyVoucherButton = styled(Button)`
      color: #545050;

      &:hover {
        background-color: inherit;
        color: #ff0000;
      }
    `

    const contentUnclicked = () => {
        return (
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
        )
    }

    const [content, setContent] = useState(contentUnclicked);

    const contentClicked = () => {
        return (
            <CardContent>
                <Grid container direction={'column'} justifyContent={'center'} alignItems={'center'} spacing={2}>
                    <Grid item>
                        <Typography>
                            Order Vouchers
                        </Typography>
                    </Grid>
                    <Grid item>
                        <TextField
                            sx={{display: 'flex', alignSelf: 'center'}}
                            id="outlined-basic"
                            label="Amount of vouchers"
                            variant="outlined"
                            onMouseDown={event => event.stopPropagation()}
                            onClick={event => {
                                event.stopPropagation();
                                event.preventDefault();
                                console.log("Button clicked");
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            onMouseDown={event => event.stopPropagation()}
                            onClick={event => {
                                event.stopPropagation();
                                event.preventDefault();
                                console.log("Button clicked");
                            }}
                        >
                            Place Order!
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        )
    };

    const handleClick = () => {
        if (!active) {
            setActive(true);
            setContent(contentClicked);
            return;
        }
        setActive(false);
        setContent(contentUnclicked);
    }

    const CardModified = styled(Card)`
      &:hover {
        background-color: transparent;
      }
    `


    return (
        <CardModified elevation={4} style={{borderRadius: '1em', minHeight: '20em', maxHeight: '25em'}}>
            <CardActionArea onClick={handleClick}>
                <CardMedia
                    component="img"
                    width="100%"
                    image={companyImageUrl}
                    alt={companyName}
                    sx={{maxHeight: '8em'}}
                />
                {content}
            </CardActionArea>
        </CardModified>
    );
}
export default OfferCard;