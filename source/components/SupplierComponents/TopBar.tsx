import { ClassNames } from '@emotion/react';
import {makeStyles } from '@mui/styles';
import { Button, Grid } from '@mui/material'
import * as React from 'react';
import { grey } from '@mui/material/colors';

const useStyles = makeStyles({
    container:{
        backgroundColor: 'white', 
        padding: '0px'
    },
    button:{
        color:'black',
        padding: '2em',
        fontSize: '18px'
    },
    button_inactive:{
        color:'gray',
        padding: '2em',
        fontSize: '18px'
    }
});

interface TopBarInterface {
    index: number
}

const TopBar = (props: TopBarInterface) => {
    const classes = useStyles();
    const {index} = props
    return (
        <Grid container className={classes.container} justifyContent={'center'}>
            <Grid item >
                <Button  className={index===0?classes.button:classes.button_inactive}>
                    My offers
                </Button>
                
            </Grid>

            <Grid item >
                <Button className={index===1?classes.button:classes.button_inactive}>
                My Vouchers
                </Button>
            </Grid>

            <Grid item >
                <Button className={index===2?classes.button:classes.button_inactive}>
                Profile
                </Button>
            </Grid>

            <Grid item>

            </Grid>
        </Grid>
    )
}

export default TopBar;