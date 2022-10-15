import { Grid, Paper, Avatar, Typography, Link, Button, TextField} from '@mui/material';
import { makeStyles } from "@mui/styles";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Formik, Field, Form, FormikHelpers, useFormik} from 'formik';
import * as Yup from 'yup';


const useStyles = makeStyles({
  center: {
    spacing: 0,
    alignItems: "center",
    justifyContent: "center",
    padding: '10px',
  },
  btn: {
    backgroundColor:'#7c7f65',
    color: 'darkgray',
    width: '90%',
    height: '50px',
  },
  paper: {
    height:'70vh',
    width:500,
    backgroundColor: "#cabac8",
  },
  avatar: {
    backgroundColor:'#49516f',
  },
  formcontrol: {
    width: '90%',
    height: '50px',
  }
})
interface Values {
  username: string;
  password: string;
}

const lowercaseRegEx = /(?=.*[a-z])/
const uppercaseRegEx = /(?=.*[A-Z])/
const numericRegEx = /(?=.*[0-9])/
const lengthRegEx = /(?=.{6,})/

let validationSchema = Yup.object().shape({
  userName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .matches(
      lowercaseRegEx,
      "Must contain one lowercase alphabetical character!"
    )
    .matches(
      uppercaseRegEx,
      "Must contain one uppercase alphabetical character!"
    )
    .matches(numericRegEx, "Must contain one numeric character!")
    .matches(lengthRegEx, "Must contain 6 characters!")
    .required("Required!"),
})

const LoginForm = () => {
  
  const formik = useFormik({
    initialValues: {
      email: 'foobar@example.com',
      password: 'foobar',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const classes = useStyles();

  return (
    <Grid className={classes.center}>
      <Paper elevation={10} className={classes.paper}>
        <h2>Login</h2>
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
            <TextField className={classes.formcontrol} id="username" name="username" placeholder="Username"/>
            <TextField className={classes.formcontrol} id="password" name="password" placeholder="Password"/>
            <Button type="submit" className={classes.btn}>Login</Button>
            <Link href="/Registration"><Button className={classes.btn}>Registration</Button></Link>
          </Form>
        </Formik>
      </Paper>
    </Grid>
  );
};
export default LoginForm;