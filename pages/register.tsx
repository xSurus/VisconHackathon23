import RegisterFormSupplier from "../components/register-form-supplier";
import RegisterFormSeeker from "../components/register-form-seeker";
import { useState } from "react";
import { Grid, Button, AppBar, Toolbar, Typography, Link } from "@mui/material";
import styled from "@emotion/styled";
const SeparatorBar = styled(Grid)`
	color: #696969;
	opacity: 0.5;
	margin-bottom: 0.3em;
	margin-right: 1em;
	margin-left: 1em;
`;
const Registration = () => {
	const [form, showForm] = useState(<RegisterFormSupplier />);
	const [isRegisterFormSupplier, setIsRegisterFormSupplier] =
		useState<boolean>(true);

	return (
		<Grid container>
			<AppBar
				position="static"
				color="default"
				elevation={0}
				sx={{ borderBottom: `1px solid black` }}
			>
				<Toolbar sx={{ flexWrap: "wrap" }}>
					<Typography
						variant="h6"
						color="inherit"
						noWrap
						sx={{ flexGrow: 1 }}
					>
						OUR NAME
					</Typography>
					<nav>
						<Link
							variant="button"
							color="text.primary"
							href="#"
							style={{
								opacity: !isRegisterFormSupplier ? 1 : 0.4,
							}}
							onClick={() => {
								showForm(<RegisterFormSeeker />);
								setIsRegisterFormSupplier(false);
							}}
							sx={{ my: 1, mx: 1.5 }}
						>
							Seeker
						</Link>
						<Link
							variant="button"
							color="text.primary"
							href="#"
							style={{
								opacity: isRegisterFormSupplier ? 1 : 0.4,
							}}
							onClick={() => {
								showForm(<RegisterFormSupplier />);
								setIsRegisterFormSupplier(true);
							}}
							sx={{ my: 1, mx: 1.5 }}
						>
							Supplier
						</Link>
					</nav>
				</Toolbar>
			</AppBar>
			{form}
		</Grid>
	);
};

export default Registration;

// PREVIOUS CODE FOR REFERENCE
{
	/* <Grid item container justifyContent={'center'} alignItems={'center'} style={{backgroundColor: 'darkgrey'}}>
                <Grid>
                    <Button
                    onClick={() => {showForm(<RegisterFormSupplier/>); setIsRegisterFormSupplier(true)}}
                    style={{color: isRegisterFormSupplier ? 'black' : 'rgba(0,0,0,0.5)', cursor:'pointer', display: 'inline'}}>
                        Supplier
                    </Button>
                </Grid>
                <SeparatorBar>
                    |
                </SeparatorBar>
                <Grid item>
                    <Button
                    onClick={() => {showForm(<RegisterFormSeeker/>); setIsRegisterFormSupplier(false)}}
                    style={{color: !isRegisterFormSupplier ? 'black' : 'rgba(0,0,0,0.5)', cursor:'pointer', display: 'inline'}}>
                        Seeker
                    </Button>
                </Grid>
            </Grid> */
}
