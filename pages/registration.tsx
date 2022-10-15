import RegisterFormSupplier from '../components/register-form-supplier';
import RegisterFormSeeker from '../components/register-form-seeker';
import { useState } from "react";
import { Grid, Button } from '@mui/material';
import styled from '@emotion/styled';
const SeparatorBar = styled(Grid)`
  color: #696969;
  opacity: 0.5;
  margin-bottom: 0.3em;
  margin-right: 1em;
  margin-left: 1em;
`
const Registration = () => {

    const [form, showForm] = useState(<RegisterFormSupplier/>);
    const [isRegisterFormSupplier, setIsRegisterFormSupplier] = useState<boolean>(true);

    return (
        <Grid container>
            <Grid item container justifyContent={'center'} alignItems={'center'} style={{backgroundColor: 'darkgrey'}}>
                <Grid>
                    <Button
                    onClick={() => {showForm(<RegisterFormSupplier/>); setIsRegisterFormSupplier(true)}}
                    style={{color: isRegisterFormSupplier ? 'black' : 'rgba(0,0,0,0.5)', cursor:'pointer', display: 'inline'}}>
                        Supplier
                    </Button>
                </Grid>
                <SeparatorBar>
                    |
                </SeparatorBar>
                <Grid item>
                    <Button
                    onClick={() => {showForm(<RegisterFormSeeker/>); setIsRegisterFormSupplier(false)}}
                    style={{color: !isRegisterFormSupplier ? 'black' : 'rgba(0,0,0,0.5)', cursor:'pointer', display: 'inline'}}>
                        Seeker
                    </Button>
                </Grid>
            </Grid>
        { form }
        </Grid>
    ) 
}

export default Registration;