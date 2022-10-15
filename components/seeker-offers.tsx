import {useState, useEffect} from "react";
import {Grid} from '@mui/material';
import {FetchOffers} from '../services/api-requests';
import OfferCard from "./offer-card";
import Filter from "./filter";
import {Offer} from "../util/schemas";
import Typography from "@mui/material/Typography";


const SeekerOffers = () => {
    const [vouchers, setVouchers] = useState<Offer[]>();

    useEffect(() => {
        FetchOffers().then(res => {
            setVouchers(res.data)
        })
    }, [])

    return (
        <Grid container style={{display: 'flex', maxHeight: '8em'}} justifyContent={'space-between'}>
            <Grid item>
                <Typography style={{marginLeft: '3em', marginTop: '1.6em', fontSize: '1.3em', fontWeight: 'bold'}}>ALL OUR OFFERS</Typography>
            </Grid>
            <Grid item style={{marginRight: '3em', marginTop: '2em'}}>
                <Filter/>
            </Grid>
            <Grid container spacing={3} alignItems={'center'}
                  style={{paddingRight: '3em', paddingLeft: '3em', marginBottom: '3em', marginTop: '0.3em'}}>
                {vouchers?.map((offer: Offer) => {
                    return <Grid item xs={1} sm={2} md={6} lg={4}>
                        <OfferCard companyName={offer.name} voucherPrice={offer.price_per_voucher}
                                   companyImageUrl={offer.supplier ? offer.supplier.img : ''}
                                   offerDescription={offer.description}
                                   key={offer.id}/>
                    </Grid>
                })}
            </Grid>
        </Grid>
    );
};

export default SeekerOffers;