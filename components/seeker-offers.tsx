import { useState, useEffect } from "react";
import { TextField, Button, Card, Grid } from '@mui/material';
import type { Offer } from '../util/schemas';
import axios from "axios";
import { FetchOffers } from '../services/api-requests';
import OfferCard from "./offer-card";
import Filter from "./filter";


const SeekerOffers = () => {
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        FetchOffers().then(res => {
          setOffers(res.data)
        })
    },[])

    return (
        <div>
            {<Filter /> }
            <Grid container>
                    {offers.map((offer : Offer) => {
                        return <Grid item xs={5} sm={4}>
                            <OfferCard supplier = {offer.supplier?.name} price = {5} key={offer.id}/>
                        </Grid>
                    })}
            </Grid> 
        </div>
    );
};

export default SeekerOffers; 