import * as React from 'react';
import {makeStyles} from "@mui/styles";
import TopBar from "../source/components/SupplierComponents/TopBar";

const useStyles =  makeStyles({
})


const Supplier = () => {

    const classes = useStyles();

    return (
        <TopBar index={0} />
    )
}

export default Supplier;