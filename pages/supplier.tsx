import * as React from 'react';
import {makeStyles} from "@mui/styles";
import TopBar from "../source/components/SupplierComponents/TopBar";
import {useState} from "react";

const useStyles =  makeStyles({
})


const Supplier = () => {

    const classes = useStyles();

    const [activeIndex, setActiveIndex] = useState<number>(1);

    return (
        <TopBar index={activeIndex} setActiveIndex={setActiveIndex} />
    )
}

export default Supplier;