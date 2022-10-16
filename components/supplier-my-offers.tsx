import {useState, useEffect} from "react";
import {Grid} from '@mui/material';
import {FetchMyOffers, FetchOffers} from '../services/api-requests';
import OfferCard from "./offer-card";
import Filter from "./filter";
import {Offer} from "../util/schemas";
import Typography from "@mui/material/Typography";
import { FilterElement } from "./filter";

const SupplierOffers = () => {
    const [vouchers, setVouchers] = useState<Offer[]>();
    const [categories, setCategories] = useState<FilterElement[]>([]);

    //placeholder, later replaced through login data
    const seeker_id = 1;
    useEffect(() => {
        FetchMyOffers(seeker_id).then(res => {
            setVouchers(res.data)
        })
    }, [])

    return (
        <Grid container style={{display: 'flex', maxHeight: '8em'}} justifyContent={'space-between'}>
            <Grid item>
                <Typography style={{marginLeft: '3em', marginTop: '1.6em', fontSize: '1.3em', fontWeight: 'bold'}}>ALL YOUR OFFERS</Typography>
            </Grid>
            <Grid item style={{marginRight: '3em', marginTop: '2em'}}>
                <Filter categories={categories} setCategories={setCategories} />
            </Grid>
            <Grid container spacing={3} alignItems={'center'}
                  style={{paddingRight: '3em', paddingLeft: '3em', marginBottom: '6em', marginTop: '0.3em'}}>
                {vouchers?.filter(x => 
                    x.categories.filter(value => categories.map(x => x.cat).includes(value)).length > 0
                ).map((offer: Offer) => {
                    return <Grid item xs={12} sm={6} md={6} lg={4} key={offer.id}>
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

export default SupplierOffers;