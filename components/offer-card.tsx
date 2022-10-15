import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {CardActionArea} from '@mui/material';
import {useState} from "react";

interface OfferCardProps {
    companyName: string,
    voucherPrice: number,
    companyImageUrl: string
}

const OfferCard = (props: OfferCardProps) => {

    const {companyName, voucherPrice, companyImageUrl} = props;
    const [active, setActive] = useState(false);

    const contentUnclicked = <CardContent>
                                <Typography gutterBottom variant="h5" component="div" style={{}}>
                                    {`${companyName}`}
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
                                    {`${voucherPrice}`} CHF / Voucher
                                </Typography>
                                <Typography gutterBottom variant="h5" component="div">
                                    Click to buy vouchers
                                </Typography>
                            </CardContent>

    const [content, setContent] = useState(contentUnclicked);

    const contentClicked = <CardContent>
                                <Typography>
                                    Order Vouchers
                                </Typography>
                                Amount of vouchers to buy
                                <TextField 
                                    id="outlined-basic" 
                                    label="Outlined" 
                                    variant="outlined" 
                                    onMouseDown={event => event.stopPropagation()}
                                    onClick={event => {
                                    event.stopPropagation();
                                    event.preventDefault();
                                    console.log("Button clicked");
                                    }}
                                />
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
                            </CardContent>

    const handleClick = () => {
        if (!active) {
            setActive(true); setContent(contentClicked); return;
        }
        setActive(false); setContent(contentUnclicked);
    }

    return (
        <Card elevation={3}>
            <CardActionArea onClick = { handleClick }>
                <CardMedia
                    component="img"
                    width="100%"
                    image={companyImageUrl}
                    alt={companyName}
                    sx={{maxHeight: '8em'}}
                />
                { content }
            </CardActionArea>
        </Card>
    );
}
export default OfferCard;