import {useState, useEffect} from "react";
import {Grid} from '@mui/material';
import {FetchOffers} from '../services/api-requests';
import OfferCard from "./offer-card";
import Filter from "./filter";
import {Offer} from "../util/schemas";


const SeekerOffers = () => {
    const [vouchers, setVouchers] = useState<Offer[]>();

    useEffect(() => {
        FetchOffers().then(res => {
            setVouchers(res.data)
        })
    }, [])

    return (
        <div>
        <h1>All our offers</h1>
        {<Grid container style={{display: 'flex'}} justifyContent={'end'}>
            <Grid item style={{marginRight: '3em', marginTop: '2em'}}>
                <Filter/>
            </Grid>
            <Grid item container spacing={3}
                  style={{paddingRight: '3em', paddingLeft: '3em', marginBottom: '3em', marginTop: '0.3em'}}>
                {vouchers?.map((voucher: Offer) => {
                    return <Grid item xs={5} sm={4}>
                        <OfferCard      companyName={voucher.name} voucherPrice={voucher.price_per_voucher}
                                        companyImageUrl={voucher.supplier ? voucher.supplier.img : ''}
                                        key={voucher.id}/>
                    </Grid>
                })}
            </Grid>
        </Grid>}
        </div>
    );
};

export default SeekerOffers;