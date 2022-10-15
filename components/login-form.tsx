import {FormControl, Grid, Input, InputLabel, Paper, Button} from '@mui/material';
import {makeStyles} from "@mui/styles";
import Typography from "@mui/material/Typography";
import GoogleIcon from '@mui/icons-material/Google';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LoginIcon from '@mui/icons-material/Login';


const useStyles = makeStyles({
    container: {
    },
    btn: {
        backgroundColor: '#7c7f65',
        color: 'darkgray',
        width: '90%',
        height: '50px',
    },
    paper: {
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

    return (
        <Grid container justifyContent={'center'} alignItems={'center'} style={{height: '100vh'}}>
            <Grid item>
                <Paper elevation={10} style={{
                    height: '70vh',
                    width: 500,
                    backgroundColor: "#cabac8",
                    borderRadius: '1.5em'}}>
                    <Grid container justifyContent={'center'} alignItems={'center'} direction={'column'}
                          style={{display: 'flex'}}>
                        <Grid item>
                            <Typography style={{
                                marginTop: '1.5em',
                                fontSize: '1.5em',
                                fontWeight: 'bold',
                                backgroundColor: 'rgba(100,100,100,0.2)',
                                padding: '0.5em',
                                borderRadius: '0.5em'
                            }}>LOGIN</Typography>
                        </Grid>
                        <Grid item>
                            <FormControl fullWidth sx={{m: 1}} variant="standard">
                                <InputLabel htmlFor="email-field">Email</InputLabel>
                                <Input
                                    type="email"
                                    id="email-field"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <FormControl fullWidth sx={{m: 1}} variant="standard">
                                <InputLabel htmlFor="password-field">Password</InputLabel>
                                <Input
                                    type="password"
                                    id="password-field"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <Paper style={{borderRadius: 0, width: '13em', marginTop: '1.3em', marginLeft: '1em'}}>
                                <Grid container justifyContent={'center'} alignItems={'center'} style={{backgroundColor: 'white'}}>
                                    <Grid item>
                                        <Button style={{color: '#fff', fontWeight:'bold', backgroundColor: 'red', borderRadius: 0, width: '15em', marginRight: '0.1em'}}>
                                            Access
                                            <LoginIcon style={{marginLeft: '0.5em'}}/>
                                        </Button>
                                    </Grid>
                                    <Grid item>

                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item style={{
                            borderBottom: '1px solid black',
                            borderBottomColor: 'rgba(100,100,100,0.5)',
                            display: 'flex',
                            width: '80%',
                            marginTop: '2.5em'
                        }}>
                            <div/>
                        </Grid>
                        <Grid item>
                            <Paper style={{
                                paddingTop: '0.5em',
                                paddingBottom: '0.5em',
                                paddingLeft: '1.5em',
                                paddingRight: '1.5em',
                                marginTop: '2em',
                                borderRadius: '2em',
                                backgroundColor: '#007dff'
                            }}>
                                <Grid container justifyContent={'start'} alignItems={'center'}>
                                    <Grid item style={{marginRight: '1em', marginTop: '0.2em'}}>
                                        <GoogleIcon style={{color: 'white'}}/>
                                    </Grid>
                                    <Typography style={{color: 'white'}}>
                                        Continue with Google
                                    </Typography>
                                </Grid>
                            </Paper>
                            <Paper style={{
                                paddingTop: '0.5em',
                                paddingBottom: '0.5em',
                                paddingLeft: '1.5em',
                                paddingRight: '1.5em',
                                marginTop: '1em',
                                borderRadius: '2em',
                                backgroundColor: 'red'
                            }}>
                                <Grid container justifyContent={'start'} alignItems={'center'}>
                                    <Grid item style={{marginRight: '1em'}}>
                                        <VpnKeyIcon fontSize={'medium'} style={{marginTop: '0.2em', color: 'white'}}/>
                                    </Grid>
                                    <Typography style={{color: 'white'}}>
                                        Register using e-mail
                                    </Typography>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};
export default LoginForm;