import * as React from 'react';
import {makeStyles} from "@mui/styles";
import {Grid} from "@mui/material";

const useStyles =  makeStyles({
    container: {
        backgroundColor: 'red',
    }
})

const SupplierPage = () => {

    const classes = useStyles();

    return (
        <Grid container>
            <Grid item>
                <div className={classes.container}>
                    TEST
                </div>
            </Grid>
        </Grid>
    )
}

export default SupplierPage;