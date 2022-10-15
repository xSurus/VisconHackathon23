import { TextField, Button, Card } from '@mui/material';

const RegisterFormSeeker = () => {

  return (
    <Card variant="outlined">
            <TextField id="username" label="Username"     variant="outlined" />
            <TextField id="email"    label="E-mail"       variant="outlined" />
            <TextField id="phone"    label="Phone Number" variant="outlined" />
            <h3>Office Address</h3>
            <TextField id="street"          label="Street" variant="outlined" />
            <TextField id="building-number" label="Number"         variant="outlined" />
            <TextField id="zip"             label="Zip"            variant="outlined" />
            <TextField id="city"            label="City"           variant="outlined" />
            <TextField id="country"         label="Country"        variant="outlined" />

            <TextField id="website" label="Your Website" variant="outlined" />

            <TextField id="password" label="Password" variant="outlined" type="password" />
            <TextField id="password_repeated" label="Repeat Password" variant="outlined" type="password"/>
            <Button type="submit">Register</Button>
    </Card>
  );
};

export default RegisterFormSeeker;