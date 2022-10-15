import * as React from 'react';
import {makeStyles} from "@mui/styles";
import {Button, Grid} from "@mui/material";

const useStyles =  makeStyles({
    container: {
        backgroundColor: 'blue',
    },
    btn: {
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
                <Button className={classes.btn}>TEST</Button>
                
            </Grid>
        </Grid>
    )
}

export default SupplierPage;