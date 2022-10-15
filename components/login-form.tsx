import {Grid, Paper} from '@mui/material';
import {makeStyles} from "@mui/styles";


const useStyles = makeStyles({
    center: {
        spacing: 0,
        alignItems: "center",
        justifyContent: "center",
        padding: '10px',
    },
    btn: {
        backgroundColor: '#7c7f65',
        color: 'darkgray',
        width: '90%',
        height: '50px',
    },
    paper: {
        height: '70vh',
        width: 500,
        backgroundColor: "#cabac8",
    },
    avatar: {
        backgroundColor: '#49516f',
    },
    formcontrol: {
        width: '90%',
        height: '50px',
    }
})

const LoginForm = () => {

    const classes = useStyles();

    return (
        <Grid className={classes.center}>
            <Paper elevation={10} className={classes.paper}>
                <h2>Login</h2>
            </Paper>
        </Grid>
    );
};
export default LoginForm;