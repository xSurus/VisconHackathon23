import { Grid, Paper } from '@mui/material';
import {makeStyles} from "@mui/styles";
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { TextField, Button, Card } from '@mui/material';

interface Values {
    username: string;
    password: string;
}


const RegisterFormSupplier = () => {
  

  return (
    <div> 
        <Formik
        initialValues={{
            username: '',
            password: '',
        }}

        onSubmit={(
            values: Values,
            { setSubmitting }: FormikHelpers<Values>
        ) => {
            setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
            }, 500);
        }}

        >
        <Card variant="outlined">
            <Form>
                <TextField className="form-control" id="username" name="username" placeholder="Username"/>

                <TextField className="form-control"  id="password" name="password" placeholder="Password" />
                <Button type="submit">Register</Button>
            </Form>
        </Card>
        </Formik>
    </div>
  );
};

export default RegisterFormSupplier;