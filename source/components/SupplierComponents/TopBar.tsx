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
    const menu_points = [{id:0, name:"My Offers"}, {id:1, name:"My Vouchers"}, {id:2, name:"Stats"}]
    return (
        <Grid container className={classes.container} justifyContent={'center'}>
            {menu_points.map((entry) =>(
                <Grid item>
                    <Button onClick={(e) => {
                    handleClick(e, entry.id); setActiveIndex(entry.id)
                }} className={index === entry.id ? classes.button : classes.button_inactive}>
                    {entry.name}
                </Button>
                </Grid>
            ))}

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