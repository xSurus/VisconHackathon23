import { Grid, Paper } from '@mui/material';
import {makeStyles} from "@mui/styles";
import { Formik, Field, Form, FormikHelpers } from 'formik';
import TextField from '@mui/material/TextField';

interface Values {
    username: string;
    password: string;
}

const useStyles = makeStyles({
  center: {
    alightItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    spacing: 0,
  },
  btn: {
    backgroundColor: 'lime',
  },
  paper: {
    height:'70vh',
    width:500, 
    margin:"20px auto",
  },
})

const RegisterFormSeeker = () => {
  
  const classes = useStyles();

  return (
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
    <Form>
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

        <TextField id="password" label="Password" variant="outlined" />
        <TextField id="password" label="Repeat Password" variant="outlined" />
    </Form>
    </Formik>
  );
};

export default RegisterFormSeeker;