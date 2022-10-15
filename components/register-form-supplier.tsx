import { TextField, Button, Card } from '@mui/material';

const RegisterFormSupplier = () => {


  return (
    <div>
        <Card variant="outlined">
                <TextField className="form-control" id="username" name="username" placeholder="Username"/>

                <TextField className="form-control"  id="password" name="password" placeholder="Password" />
                <Button type="submit">Register</Button>
        </Card>
    </div>
  );
};

export default RegisterFormSupplier;