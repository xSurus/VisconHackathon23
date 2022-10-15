import * as React from 'react';
import {Button, Grid} from "@mui/material";

const Supplier = () => {


    const [activeIndex, setActiveIndex] = React.useState<number>(1);

    return (
        <Grid container>
            <Grid item>
                <div>
                    TEST
                </div>
                <Button >TEST</Button>
            </Grid>
        </Grid>
    )
}

export default Supplier;