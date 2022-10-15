import { ClassNames } from '@emotion/react';
import {makeStyles } from '@mui/styles';
import { Button, Grid } from '@mui/material'
import * as React from 'react';
import { grey } from '@mui/material/colors';

const useStyles = makeStyles({
    container:{
        backgroundColor: 'grey', 
        padding: '0px'
    },
    button:{
        color: 'black',
        padding: '2em',
        fontSize: '18px',
        font: 'bebas neue'
    }
});

const TopBar = (index: number) => {
    const classes = useStyles();
    return (
        <Grid container className={classes.container} justifyContent={'center'}>
            <Grid item >
                <Button  className={classes.button}>
                    My offers
                </Button>
                
            </Grid>

            <Grid item >
                <Button className={classes.button}>
                My Vouchers
                </Button>
            </Grid>

            <Grid item >
                <Button className={classes.button}>
                Profile
                </Button>
            </Grid>

            <Grid item>

            </Grid>
        </Grid>
    )
}

export default TopBar;