import {
	FormControl,
	Grid,
	Input,
	InputLabel,
	Paper,
	Button,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import GoogleIcon from "@mui/icons-material/Google";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import LoginIcon from "@mui/icons-material/Login";
import styled from "@emotion/styled";
import Link from "next/link";
import { PostQuery } from "../pages/api/seeker";
import { useState } from "react";
import Router from "next/router";
import { SendSeekerRegistration } from "../services/api-requests";

const CustomButton = styled(Button)`
	color: #fff;
	font-weight: bold;
	background-color: black;
	border-radius: -1;
	width: 18em;
	height: 5em;
	:hover {
		background-color: black;
	}
`;
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
`;
const PaperContainer = styled(Paper)`
	height: auto;
	width: 500px;
	margin-top: 1em;
	border-radius: 1em;
	background-color: #d0cece;
`;
const RegisterFormSeeker = () => {
	const registerModel: PostQuery = {
		img: "",
		city: "",
		country: "",
		email: "",
		name: "",
		street: "",
		cap: 0,
		homepage: "",
		login_email: "",
		password: "",
	};

	const [model, setModel] = useState<PostQuery>(registerModel);
	const handleClickButton = () => {
		SendSeekerRegistration(model);
		Router.push("/seeker");
	};
	return (
		<Grid
			container
			justifyContent={"center"}
			alignItems={"center"}
			style={{ height: "100vh" }}
		>
			<Grid item>
				<PaperContainer elevation={10}>
					<Grid
						container
						justifyContent={"center"}
						alignItems={"center"}
						direction={"column"}
						style={{ display: "flex" }}
					>
						<Grid item>
							<Typography
								style={{
									marginTop: "1.5em",
									marginBottom: "0.5em",
									fontSize: "1.5em",
									fontWeight: "bold",
									padding: "0.5em",
									borderRadius: "0.5em",
								}}
							>
								REGISTER
							</Typography>
						</Grid>
						<Grid item>
							<FormControl
								fullWidth
								sx={{ m: 1 }}
								variant="standard"
							>
								<InputLabel htmlFor="name-field">
									Name
								</InputLabel>
								<Input
									type="name"
									id="name-field"
									value={model.name}
									onChange={(e) =>
										setModel({
											...model,
											["name"]: e.target.value,
										})
									}
								/>
							</FormControl>
						</Grid>
						<Grid item>
							<FormControl
								fullWidth
								sx={{ m: 1 }}
								variant="standard"
							>
								<InputLabel htmlFor="email-field">
									Email
								</InputLabel>
								<Input
									type="email"
									id="email-field"
									value={model.email}
									onChange={(e) =>
										setModel({
											...model,
											["email"]: e.target.value,
											["login_email"]: e.target.value,
										})
									}
								/>
							</FormControl>
						</Grid>
						<Grid item>
							<FormControl
								fullWidth
								sx={{ m: 1 }}
								variant="standard"
							>
								<InputLabel htmlFor="password-field">
									Password
								</InputLabel>
								<Input
									type="password"
									id="password-field"
									value={model.password}
									onChange={(e) =>
										setModel({
											...model,
											["password"]: e.target.value,
										})
									}
								/>
							</FormControl>
						</Grid>
						<Grid item>
							<FormControl
								fullWidth
								sx={{ m: 1 }}
								variant="standard"
							>
								<InputLabel htmlFor="street-field">
									Street
								</InputLabel>
								<Input
									type="street"
									id="street-field"
									value={model.street}
									onChange={(e) =>
										setModel({
											...model,
											["street"]: e.target.value,
										})
									}
								/>
							</FormControl>
						</Grid>
						<Grid item>
							<FormControl
								fullWidth
								sx={{ m: 1 }}
								variant="standard"
							>
								<InputLabel htmlFor="cap-field">ZIP</InputLabel>
								<Input
									type="cap"
									id="cap-field"
									value={model.cap}
									onChange={(e) =>
										setModel({
											...model,
											["cap"]: parseInt(
												e.target.value,
												10
											),
										})
									}
								/>
							</FormControl>
						</Grid>
						<Grid item>
							<FormControl
								fullWidth
								sx={{ m: 1 }}
								variant="standard"
							>
								<InputLabel htmlFor="city-field">
									City
								</InputLabel>
								<Input
									type="city"
									id="city-field"
									value={model.city}
									onChange={(e) =>
										setModel({
											...model,
											["city"]: e.target.value,
										})
									}
								/>
							</FormControl>
						</Grid>
						<Grid item>
							<FormControl
								fullWidth
								sx={{ m: 1 }}
								variant="standard"
							>
								<InputLabel htmlFor="country-field">
									Country
								</InputLabel>
								<Input
									type="country"
									id="country-field"
									value={model.country}
									onChange={(e) =>
										setModel({
											...model,
											["country"]: e.target.value,
										})
									}
								/>
							</FormControl>
						</Grid>
						<Grid item>
							<Paper
								style={{
									borderRadius: 0,
									width: "13em",
									marginTop: "1.3em",
									marginLeft: "1em",
									marginBottom: "2em",
								}}
							>
								<Grid
									container
									justifyContent={"center"}
									alignItems={"center"}
								>
									<Grid item>
										<CustomButton
											onClick={handleClickButton}
										>
											Register
											<LoginIcon
												style={{ marginLeft: "0.5em" }}
											/>
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
