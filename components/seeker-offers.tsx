import { useState, useEffect } from "react";
import { Grid } from '@mui/material';
import { FetchOffers } from '../services/api-requests';
import OfferCard from "./offer-card";
import Filter from "./filter";
import {Offer} from "../util/schemas";
import Typography from "@mui/material/Typography";


const SeekerOffers = () => {
    const [offers, setOffers] = useState<Offer[]>();

    useEffect(() => {
        FetchOffers().then((res:any) => {
          setOffers(res.data)
        })
    },[])

    return (
        <Grid container style={{display: 'flex', maxHeight: '8em'}} justifyContent={'space-between'}>
            <Grid item>
                <Typography style={{marginLeft: '3em', marginTop: '1.6em', fontSize: '1.3em', fontWeight: 'bold'}}>ALL OUR OFFERS</Typography>
            </Grid>
            <Grid item style={{marginRight: '3em', marginTop: '2em'}}>
                <Filter/>
            </Grid>
                        <OfferCard companyName={offer.name} voucherPrice={offer.price_per_voucher}
            </Grid>
        </Grid>
    );
};

export default SeekerOffers;