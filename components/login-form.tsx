import {
    FormControl,
    Grid,
    Input,
    InputLabel,
    Paper,
    Button,
    useTheme,
    useMediaQuery,
    Select,
    MenuItem,
    SelectChangeEvent, CircularProgress,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import GoogleIcon from "@mui/icons-material/Google";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import LoginIcon from "@mui/icons-material/Login";
import styled from "@emotion/styled";
import Link from "next/link";
import {sendLogin} from "../services/api-requests";
import React, {useState, useEffect, useRef} from "react";
import Router, {useRouter} from "next/router";

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
`;
const PaperGoogle = styled(Paper)`
  padding: 0.5em 1.5em;
  margin-top: 2em;
  border-radius: 2em;
  background-color: #000000;

  :hover {
    cursor: pointer;
  }
`;
const PaperEmail = styled(Paper)`
  padding: 0.5em 1.5em;
  margin-top: 1em;
  border-radius: 2em;
  background-color: #000000;
  margin-bottom: 3.5em;

  :hover {
    cursor: pointer;
  }
`;
const PaperContainer = styled(Paper)`
  height: auto;
  width: 500px;
  margin-top: 1em;
  border-radius: 1em;
  background-color: #d0cece;
`;

const LoginForm = () => {
    const theme = useTheme();
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

    const [email, setEmail] = useState("");
    const [error, setError] = useState(true);
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState<"seeker" | "supplier">("seeker");
    const router = useRouter();

    const handleChangeType = (
        event: SelectChangeEvent<"seeker" | "supplier">
    ) => {
        setUserType(event.target.value as any);
    };

    const handleGoogleAuth = () => {
    };

    const onSubmitHandler = async () => {
        if (email && password) {
            setLoading(true);
            await sendLogin(email, password, userType).then((res: any) => {
                if (res.status === 200) {
                    console.log("Login succeeded, redirecting...");
                    router.push(`/${userType}`);
                } else {
                    console.log("Failed login");
                }
            }).catch((err) => {
                setError(true);
                console.log(err);
            });
        }
    };

    useEffect(() => {
        setLoading(false);
    }, [error])

    useEffect(() => {
        setError(false);
    }, [loading])

    return (
        <div>
            <Grid container direction={matchesMD ? 'column' : 'row'} justifyContent={'center'} alignItems={'center'}>
                <Grid item xs={!matchesMD ? 4 : 12}>
                    <Grid item container direction={'column'} sx={{
                        paddingLeft: '2em',
                        paddingRight: '2em'
                    }}>
                        <Grid item>
                            <Typography textAlign={matchesMD ? 'center' : 'inherit'} style={{
                                lineHeight: '2em',
                                letterSpacing: '0.1em',
                                fontFamily: 'Roboto',
                                fontWeight: 'bold',
                                fontSize: matchesSM ? '1em' : matchesMD ? '2em' : '3em'
                            }} variant={'h3'}>
                                Hey!
                            </Typography>
                        </Grid>
                        <Typography textAlign={matchesMD ? 'center' : 'inherit'} variant={'overline'}
                                    style={{marginBottom: '1em'}}>
                            In order to see our offers, please LOGIN or REGISTER yourself!
                        </Typography>
                        <Typography textAlign={matchesMD ? 'center' : 'inherit'} variant={'overline'}
                                    style={{marginBottom: matchesMD ? '2em' : 0}}>
                            In our webapp you will be able to add vouchers, see different offers provided by our partner
                            suppliers, and purchase them!
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={!matchesMD ? 5 : 12}
                      sx={{width: matchesSM ? '70%' : '100%', marginTop: !matchesMD ? '2em' : 0}}>
                    <Grid item container justifyContent={'center'} alignItems={'center'}>
                        <PaperContainer elevation={10} sx={{width: matchesMD ? '5em' : '13em'}}>
                            <Grid container justifyContent={'center'} alignItems={'center'} direction={'column'}>
                                <Grid>
                                    <Typography style={{
                                        marginTop: !matchesMD ? '1.5em' : 0,
                                        marginBottom: !matchesMD ? '0.5em' : 0,
                                        fontSize: '1.5em',
                                        fontWeight: 'bold',
                                        padding: '0.5em',
                                        borderRadius: '0.5em'
                                    }}>LOGIN</Typography>
                                </Grid>
                                <Grid item>
                                    <FormControl sx={{m: 1}} >
                                        <InputLabel htmlFor="email-field">Email</InputLabel>
                                        <Input
                                            type="email"
                                            id="email-field"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item>
                                    <FormControl fullWidth sx={{m: 1}} variant="standard">
                                        <InputLabel htmlFor="password-field">Password</InputLabel>
                                        <Input
                                            value={password}
                                            type="password"
                                            id="password-field"
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item>
                                    <Grid item>
                                        <FormControl
                                            fullWidth
                                            sx={{m: 1}}
                                            variant="standard"
                                        >
                                            <InputLabel htmlFor="type-field">
                                                Type
                                            </InputLabel>
                                            <Select
                                                name="v"
                                                id="password-field"
                                                value={userType}
                                                onChange={handleChangeType}
                                            >
                                                <MenuItem value={"seeker"}>
                                                    Seeker
                                                </MenuItem>
                                                <MenuItem value={"supplier"}>
                                                    Supplier
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Paper
                                        style={{
                                            borderRadius: 0,
                                            width: matchesSM ? '5em' : matchesMD ? '10em' : '13em',
                                            marginTop: '1.3em',
                                            marginLeft: '1em'
                                        }}>
                                        <Grid container justifyContent={'center'} alignItems={'center'}>
                                            <Grid item>
                                                <LoginButton onClick={onSubmitHandler}>
                                                    <Grid container justifyContent={'center'} alignItems={'center'}>
                                                        <Grid item style={{marginRight: '3em'}}>
                                                            Access
                                                        </Grid>
                                                        <Grid item>
                                                            <Grid item container alignItems={'center'}>
                                                                {!loading ? <LoginIcon/> : error ? <LoginIcon/> :
                                                                    <CircularProgress color={'inherit'} size={25}/>}
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
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
        </div>
    );
};
export default LoginForm;