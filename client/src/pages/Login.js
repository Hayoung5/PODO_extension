import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Typography, Avatar, Button, CssBaseline, TextField, Grid, Box, Container } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { LogIn} from "../APIs/walletAPI";

const theme = createTheme();

const Login = ({setWallet}) => {
	const navigate = useNavigate();
	const [isLogin, setIsLogin] = useState(false);

	useEffect(() => {
	}, [isLogin]);

	const handleLogin = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const pw = data.get("password");

		console.log(11);

		await LogIn(pw).then((res) => {
			console.log("login");
			console.log(res);
			setWallet(res);
			setIsLogin(true);
			alert("로그인 성공");
			navigate("/content");
		})
	};

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 6,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}>
					<Avatar sx={{ m: 3, bgcolor: "success.main" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h5" variant="h6">
						비밀번호를 입력하여 <br /> 계정에 로그인하세요.
					</Typography>
					<Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 3 }}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField required fullWidth name="password" label="Password" type="password" id="password" autoComplete="new-password" />
							</Grid>
						</Grid>
						<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
							로그인
						</Button>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
};

export default Login;