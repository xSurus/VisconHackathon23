import { Grid, Paper, Avatar, Typography, Link, Button, TextField, Card, CardHeader, CardContent, FormControl, CardActions, InputLabel, } from '@mui/material';
import { makeStyles } from "@mui/styles";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Formik, Field, Form, FormikHelpers, useFormik} from 'formik';
import * as Yup from 'yup';


const useStyles = makeStyles({
  center: {
    /*spacing: 0,
    alignItems: "center",
    justifyContent: "center",
    padding: '10px',*/
    justifyContent: 'center',
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
  },
  padding: {
    padding: '10px',
  },
  button: {
    margin:'10px',
  },
})
interface Values {
  username: string;
  password: string;
}

const initialValues = {
  userName: "",
  password: "",
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

  const classes = useStyles();

  const onSubmit = (values: any) => {
    console.log(values)
  }
  const formik = useFormik({
    initialValues: {
      email: 'foobar@example.com',
      password: 'foobar',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });


  return (
    <Grid container className={classes.center} spacing={1}>
      <Grid item md={6}>
        <Card className={classes.padding}>
          <CardHeader title="REGISTER FORM"></CardHeader>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            {({ dirty, isValid, values, handleChange, handleBlur }) => {
              return (
                <Form>
                  <CardContent>
                    <Grid item container className={classes.center}>
                      <Grid item xs={12} sm={6} md={6}>
                        <Field
                          label="Username"
                          variant="outlined"
                          fullWidth
                          name="userName"
                          value={values.userName}
                          component={TextField}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <Field
                          label="Password"
                          variant="outlined"
                          fullWidth
                          name="password"
                          value={values.password}
                          type="password"
                          component={TextField}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
{/*                   <CardActions>
                    <Button
                      disabled={!dirty || !isValid}
                      variant="contained"
                      color="primary"
                      type="Submit"
                      className={classes.button}>
                      <Button>
                      REGISTER
                    </Button>
                  </CardActions> */}
                </Form>
              )
            }}
          </Formik>
        </Card>
      </Grid>
    </Grid>
  );
};
export default LoginForm;