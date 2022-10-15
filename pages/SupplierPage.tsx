import * as React from 'react';
import {makeStyles} from "@mui/styles";
import {Grid} from "@mui/material";
import TopBar from "../source/components/SupplierComponents/TopBar";

const useStyles =  makeStyles({
})


const SupplierPage = () => {

    const classes = useStyles();

    return (
        <TopBar index={0} />
    )
}

export default SupplierPage;