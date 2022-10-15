import { Grid, Paper } from '@mui/material';
import {makeStyles} from "@mui/styles";
import { Formik, Field, Form, FormikHelpers } from 'formik';

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

const RegisterFormSupplier = () => {
  
  const classes = useStyles();

  return (
    <div> 
        <h1> Dio </h1>
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
            <Field className="form-control" id="username" name="username" placeholder="Username"/>

            <Field className="form-control"  id="password" name="password" placeholder="Password" />
            <button type="submit" className={classes.btn}>Login</button>
        </Form>
        </Formik>
    </div>
  );
};

export default RegisterFormSupplier;