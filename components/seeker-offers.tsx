import { useState, useEffect } from "react";
import { Grid } from '@mui/material';
import { FetchOffers } from '../services/api-requests';
import OfferCard from "./offer-card";
import Filter from "./filter";
import {Offer} from "../util/schemas";


const SeekerOffers = () => {
    const [offers, setOffers] = useState<Offer[]>();

    useEffect(() => {
        FetchOffers().then(res => {
          setOffers(res.data)
        })
    },[])

    return (
        <Grid container style={{display: 'flex'}} justifyContent={'end'}>
            <Grid item style={{marginRight: '3em', marginTop: '2em'}}>
                <Filter/>
            </Grid>
            <Grid item container spacing={3} style={{paddingRight: '3em', paddingLeft: '3em', marginBottom: '3em', marginTop: '0.3em'}}>
                    {offers?.map((offer : Offer) => {
                        return <Grid item xs={5} sm={4}>
                        <OfferCard companyName={offer.name} voucherPrice={offer.price_per_voucher}
                                        companyImageUrl={offer.supplier ? offer.supplier.img : ''}
                                        key={offer.id}/>
                        </Grid>
                    })}
            </Grid>
        </Grid>
    );
};

export default SeekerOffers;