import { Grid, Paper, Avatar, Typography, Link, Button, TextField} from '@mui/material';
import { makeStyles } from "@mui/styles";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Formik, Field, Form, FormikHelpers, useFormik} from 'formik';


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