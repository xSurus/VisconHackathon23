import {FormControl, Grid, Input, InputLabel, Paper, Button, useTheme, useMediaQuery} from '@mui/material';
import Typography from "@mui/material/Typography";
import GoogleIcon from '@mui/icons-material/Google';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LoginIcon from '@mui/icons-material/Login';
import styled from '@emotion/styled'
import Link from "next/link";

const LoginForm = () => {

    const theme = useTheme();
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

    const LoginButton = styled(Button)`
      color: #fff;
      font-weight: bold;
      background-color: black;
      border-radius: 0;
      width: 15em;
      margin-right: 0.1em;
      height: 3em;

      :hover {
        background-color: black;
      }
    `
    const PaperGoogle = styled(Paper)`
      padding: 0.5em 1.5em;
      margin-top: 2em;
      border-radius: 2em;
      background-color: #000000;

      :hover {
        cursor: pointer;
      }
    `
    const PaperEmail = styled(Paper)`
      padding: 0.5em 1.5em;
      margin-top: 1em;
      border-radius: 2em;
      background-color: #000000;
      margin-bottom: 3.5em;

      :hover {
        cursor: pointer;
      }
    `
    const PaperContainer = styled(Paper)`
      height: auto;
      width: 500px;
      margin-top: 1em;
      border-radius: 1em;
      background-color: #d0cece;
    `
    const handleGoogleAuth = () => {

    }

    return (
        <Grid container direction={'row'} justifyContent={'center'} alignItems={'center'} style={{height:'100vh'}}>
            <Grid item style={{marginRight: '3em'}}>
                <Grid item container direction={'column'}>
                    <Grid item>
                         <Typography style={{lineHeight: '2em', letterSpacing: '0.2em'}}>
                            Hey!
                        </Typography>
                    </Grid>
                    <Typography >
                        In order to see our offers, please LOGIN or REGISTER yourself!
                    </Typography>
                    <Typography >
                        In our webapp you will be able to add vouchers, see different
                    </Typography>
                    <Typography >
                        offers provided by our partner suppliers, and purchase them!
                    </Typography>
                </Grid>
            </Grid>
            <Grid item>
                <Grid item container justifyContent={'center'} alignItems={'center'}>
                    <PaperContainer elevation={10}>
                        <Grid container justifyContent={'center'} alignItems={'center'} direction={'column'}
                              style={{display: 'flex'}}>
                            <Grid item>
                                <Typography style={{
                                    marginTop: '1.5em',
                                    marginBottom: '0.5em',
                                    fontSize: '1.5em',
                                    fontWeight: 'bold',
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
                                    <Grid container justifyContent={'center'} alignItems={'center'}>
                                        <Grid item>
                                            <LoginButton>
                                                Access
                                                <LoginIcon style={{marginLeft: '0.5em'}}/>
                                            </LoginButton>
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
                                <PaperGoogle onClick={handleGoogleAuth}>
                                    <Grid container justifyContent={'start'} alignItems={'center'}>
                                        <Grid item style={{marginRight: '1em', marginTop: '0.2em'}}>
                                            <GoogleIcon style={{color: 'white'}}/>
                                        </Grid>
                                        <Typography style={{color: 'white'}}>
                                            Continue with Google
                                        </Typography>
                                    </Grid>
                                </PaperGoogle>
                                <Link href={'/registration'}>
                                    <PaperEmail>
                                        <Grid container justifyContent={'start'} alignItems={'center'}>
                                            <Grid item style={{marginRight: '1em'}}>
                                                <VpnKeyIcon fontSize={'medium'}
                                                            style={{marginTop: '0.2em', color: 'white'}}/>
                                            </Grid>
                                            <Typography style={{color: 'white'}}>
                                                Register using e-mail
                                            </Typography>
                                        </Grid>
                                    </PaperEmail>
                                </Link>
                            </Grid>
                        </Grid>
                    </PaperContainer>
                </Grid>
            </Grid>
        </Grid>
    );
};
export default LoginForm;