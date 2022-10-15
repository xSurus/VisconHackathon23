import RegisterFormSupplier from '../components/register-form-supplier';
import RegisterFormSeeker from '../components/register-form-seeker';
import { useState } from "react";

const Registration = () => {

    const [form, showForm] = useState(<RegisterFormSupplier/>);
    const [isRegisterFormSupplier, setIsRegisterFormSupplier] = useState<boolean>(true);

    return (
        <div>
            <h2 
            onClick={() => {showForm(<RegisterFormSupplier/>); setIsRegisterFormSupplier(true)}}
            style={{color: isRegisterFormSupplier ? 'red' : 'black', cursor:'pointer', display: 'inline'}}>
                Supplier
            </h2> 
            <h2 
            onClick={() => {showForm(<RegisterFormSeeker/>); setIsRegisterFormSupplier(false)}}
            style={{color: !isRegisterFormSupplier ? 'red' : 'black', cursor:'pointer', display: 'inline'}}>
                Seeker
            </h2>
            { form }
        </div>
    ) 
}

export default Registration;