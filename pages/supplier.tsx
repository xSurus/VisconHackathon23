import * as React from 'react';
import {Button, Grid} from "@mui/material";
import CreateVoucher from '../source/components/SupplierComponents/createVoucher';

const Supplier = () => {


    const [page, showPage] = useState(<SeekerOrders/>);
    const [whichPage, setWhichPage] = useState<number>(1);

    return (
        <Grid container>
            <Grid item>
                <CreateVoucher/>
                <div>
                    TEST
                </div>
                <Button >TEST</Button>
            </Grid>
        </Grid>
    )
}

export default Supplier;