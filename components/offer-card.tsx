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
    companyImageUrl: string
}

const OfferCard = (props: OfferCardProps) => {

    const {companyName, voucherPrice, companyImageUrl} = props;
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
                            {`${companyName}`}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2" color="text.secondary" sx={{
                            display: '-webkit-box',
                            overflow: 'hidden',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 6,
                        }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed est finibus eros iaculis
                            pellentesque.
                            Nulla facilisi. Quisque a quam ac nisi tristique laoreet. Aliquam eget eros vitae turpis
                            sagittis rutrum vitae et justo.
                            Morbi et nisl euismod, dignissim urna vel, rhoncus magna. Curabitur justo neque, cursus eu lorem
                            id, vehicula sagittis ligula.
                        </Typography>
                    </Grid>
                    <Grid item style={{marginTop: '1em'}}>
                        <Typography gutterBottom variant="h6" component="div">
                            {`${voucherPrice}`} CHF / Voucher
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

    return (
        <Card elevation={4} style={{borderRadius: '1em'}}>
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
        </Card>
    );
}
export default OfferCard;