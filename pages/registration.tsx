import RegisterFormSupplier from '../components/register-form-supplier';
import RegisterFormSeeker from '../components/register-form-seeker';
import { useState } from "react";
import { FormControl, InputLabel, Input, FormHelperText } from '@mui/material';

const Registration = () => {

    const [form, showForm] = useState(<RegisterFormSupplier/>);
    const [isRegisterFormSupplier, setIsRegisterFormSupplier] = useState<boolean>(true);

    return (
        <div>
            <h2 
            onClick={() => {showForm(<RegisterFormSupplier/>); setIsRegisterFormSupplier(true)}}
            style={{color: isRegisterFormSupplier ? 'black' : 'rgba(0,0,0,0.5)', cursor:'pointer', display: 'inline'}}>
                Supplier
            </h2> 
            <h2 
            onClick={() => {showForm(<RegisterFormSeeker/>); setIsRegisterFormSupplier(false)}}
            style={{color: !isRegisterFormSupplier ? 'black' : 'rgba(0,0,0,0.5)', cursor:'pointer', display: 'inline'}}>
                Seeker
            </h2>
            { form }
        </div>
    ) 
}

export default Registration;