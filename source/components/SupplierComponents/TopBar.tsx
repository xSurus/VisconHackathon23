import {makeStyles} from '@mui/styles';
import {Button, Grid, IconButton} from '@mui/material'
import * as React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {useRouter} from 'next/router';

const useStyles = makeStyles({
    container: {
        backgroundColor: 'white',
        padding: '0px'
    },
    button: {
        color: 'black',
        padding: '2em',
        fontSize: '18px'
    },
    button_inactive: {
        color: 'gray',
        padding: '2em',
        fontSize: '18px'
    }
});

interface TopBarInterface {
    index: number
    setActiveIndex: any
}

const TopBar = (props: TopBarInterface) => {

    const classes = useStyles();
    const router = useRouter();
    let {index, setActiveIndex} = props
    const handleClick = (e: any, id: number) => {
        e.preventDefault();
        index = id;
        router.push("/supplier");
    }

    return (
        <Grid container className={classes.container} justifyContent={'center'}>
            <Grid item>
                <Button onClick={(e) => {
                    handleClick(e, 0); setActiveIndex(0)
                }} className={index === 0 ? classes.button : classes.button_inactive}>
                    My offers
                </Button>

            </Grid>

            <Grid item>
                <Button onClick={(e) => {
                    handleClick(e, 1); setActiveIndex(1)
                }} className={index === 1 ? classes.button : classes.button_inactive}>
                    My Vouchers
                </Button>
            </Grid>

            <Grid item>
                <Button onClick={(e) => {
                    handleClick(e, 2); setActiveIndex(2)
                }} className={index === 2 ? classes.button : classes.button_inactive}>
                    Profile
                </Button>
            </Grid>

            <Grid item onClick={(e) => {
                handleClick(e, 3); setActiveIndex(3)
            }} className={index === 3 ? classes.button : classes.button_inactive}>
                <IconButton aria-label='profile'>
                    <AccountCircleIcon/>
                </IconButton>
            </Grid>
        </Grid>
    )
}

export default TopBar;