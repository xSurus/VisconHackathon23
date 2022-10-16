import * as React from 'react';
import {AppBar, Button, Grid, Link, Toolbar, Typography} from "@mui/material";
import CreateVoucher from '../source/components/SupplierComponents/createVoucher';

const Supplier = () => {


    const [activeIndex, setActiveIndex] = React.useState<number>(1);

    return (
        <Grid container>
            <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{ borderBottom: `1px solid black` }}
            >
            <Toolbar sx={{ flexWrap: 'wrap' }}>
            <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                OUR NAME
            </Typography>
            <nav>
                <Link
                variant="button"
                color="text.primary"
                href="#"
                /*style={{
                    opacity: whichPage === 1 ? 1 : 0.4,
                }}
                onClick={() => {
                    showPage(<SeekerOrders/>);
                    setWhichPage(1)
                }} */
                sx={{ my: 1, mx: 1.5 }}
                >
                Orders
                </Link>
                <Link
                variant="button"
                color="text.primary"
                href="#"
                /*style={{
                    opacity: whichPage === 2 ? 1 : 0.4,
                }}
                onClick={() => {
                    showPage(<SeekerOffers/>);
                    setWhichPage(2)
                }}*/
                sx={{ my: 1, mx: 1.5 }}
                >
                Offers
                </Link>
            </nav>
            <Button /*onClick={() => {
                            showPage(<LoginForm/>);
                            setWhichPage(3)
                        }} */variant="outlined" href="#" sx={{ my: 1, mx: 1.5 }} 
                        /*style={{
                            opacity: whichPage === 3 ? 1 : 0.4,
                        }}*/>
                Login/Profile
            </Button>
            </Toolbar>
            </AppBar>
            <Grid item>
                <CreateVoucher/>s
            </Grid>
        </Grid>
    )
}

export default Supplier;