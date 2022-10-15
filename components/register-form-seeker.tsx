import {FormControl, Grid, Input, InputLabel, Paper, Button} from '@mui/material';
import Typography from "@mui/material/Typography";
import GoogleIcon from '@mui/icons-material/Google';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LoginIcon from '@mui/icons-material/Login';
import styled from '@emotion/styled'
import Link from "next/link";

const RegisterFormSeeker = () => {
    const CustomButton = styled(Button)`
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
  const UploadButton = styled(Button)`
    color: #fff;
    font-weight: bold;
    background-color: gray;
    component: "label":
    border-radius: 0;
    width: 15em;
    margin-right: 0.1em;
    height: 3em;
    :hover {
        background-color: black;
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
        <Grid container justifyContent={'center'} alignItems={'center'} style={{height: '100vh'}}>
                <Grid item>
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
                                }}>REGISTER</Typography>
                            </Grid>
                            <Grid item>
                                <FormControl fullWidth sx={{m: 1}} variant="standard">
                                    <InputLabel htmlFor="name-field">Name</InputLabel>
                                    <Input
                                        type="name"
                                        id="name-field"
                                    />
                                </FormControl>
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
                                <FormControl fullWidth sx={{m: 1}} variant="standard">
                                    <InputLabel htmlFor="street-field">Street</InputLabel>
                                    <Input
                                        type="street"
                                        id="street-field"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <FormControl fullWidth sx={{m: 1}} variant="standard">
                                    <InputLabel htmlFor="cap-field">ZIP</InputLabel>
                                    <Input
                                        type="cap"
                                        id="cap-field"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <FormControl fullWidth sx={{m: 1}} variant="standard">
                                    <InputLabel htmlFor="city-field">City</InputLabel>
                                    <Input
                                        type="city"
                                        id="city-field"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <FormControl fullWidth sx={{m: 1}} variant="standard">
                                    <InputLabel htmlFor="country-field">Country</InputLabel>
                                    <Input
                                        type="country"
                                        id="country-field"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <Paper style={{borderRadius: 0, width: '13em', marginTop: '1.3em', marginLeft: '1em'}}>
                                    <Grid container justifyContent={'center'} alignItems={'center'}>
                                        <Grid item>
                                            <input
                                                accept="image/*"
                                                style={{ display: 'none' }}
                                                id="raised-button-file"
                                                multiple
                                                type="file"
                                                color='red'
                                                />
                                                <label htmlFor="raised-button-file">
                                                <Button component="span" style={{
                                                    color: 'white',
                                                    backgroundColor: 'black',
                                                    fontWeight: 'bold',
                                                    borderRadius: 0,
                                                    width: '15em',
                                                    height: '3em',
                                                    marginRight: '0.1em',
                                                  }}>
                                                    Upload Logo
                                                </Button>
                                            </label> 
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item>
                                <Paper style={{borderRadius: 0, width: '13em', marginTop: '1.3em', marginLeft: '1em', marginBottom: '2em'}}>
                                    <Grid container justifyContent={'center'} alignItems={'center'}>
                                        <Grid item>
                                            <CustomButton>
                                                Register
                                                <LoginIcon style={{marginLeft: '0.5em'}}/>
                                            </CustomButton>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        </Grid>
                    </PaperContainer>
                </Grid>
            </Grid>
    );
};

export default RegisterFormSeeker;