import { Grid } from '@mui/material';
import type {NextPage} from 'next'
import Head from 'next/head'
import LoginForm from '../components/login-form';

const Landing: NextPage = () => {
    return (
        <Grid container>
            <Head>  
                <title>Balls</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet"/>
            </Head>
            <LoginForm/>
        </Grid>
    )
}

export default Landing