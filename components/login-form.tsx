  import { Grid, Paper, Avatar, Typography, Link, Button, TextField} from '@mui/material';
  import { makeStyles } from "@mui/styles";
  import AccountCircleIcon from '@mui/icons-material/AccountCircle';
  import { Formik, Field, Form, FormikHelpers } from 'formik';
  interface Values {
      username: string;
      password: string;
  }

  const useStyles = makeStyles({
    center: {
      spacing: 0,
      alignItems: "center",
      justifyContent: "center",
    },
    btn: {
      backgroundColor:'#1bbd7e',
      color: 'black',
      width: '90%',
      margin:"10px auto",
      height: '50px',
    },
    paper: {
      height:'70vh',
      width:500, 
      margin:"20px auto",
    },
    avatar: {
      backgroundColor:'#1bbd7e',
    },
    formcontrol: {
      width: '90%',
      margin: '10px auto',
      height: '50px',
    }
  })

  const LoginForm = () => {
    
    const classes = useStyles();

    return (
      <Grid container className={classes.center}>
        <Paper elevation={10} className={classes.paper}>
          <Grid container className={classes.center}>
            <Avatar className={classes.avatar}><AccountCircleIcon/></Avatar>
            <h2>Login</h2>
          </Grid>
          <Grid container className={classes.center}>
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
              </Form>
            </Formik>
            <Button className={classes.btn}><Link href="/Registration">Registration</Link></Button>
          </Grid>
        </Paper>
      </Grid>
    );
  };
  export default LoginForm;