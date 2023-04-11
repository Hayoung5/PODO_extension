/*global chrome*/
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { Typography, Avatar, Button, CssBaseline, TextField, Grid, Box, Container, Alert, Stack } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {createWallet} from '../APIs/walletAPI';

const theme = createTheme();

const Create = ({wallet, setWallet}) => {
	const navigate = useNavigate();
	const [myPassword, setMyPassword] = useState();
	const [myMnemonic, setMnemonic] = useState();
	
	useEffect(() => {
	}, [myPassword]);

  const [isPasswordSame, setIsPasswordSame] = useState(true);

	const handleSubmit = async(event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const password = data.get("password");
		const confirmpassword = data.get("confirmpassword");
		if (password === confirmpassword && password !== undefined) {
			setIsPasswordSame(true);
			setMyPassword(password);
			console.log('set password');
			const [wallet, mnemonic] = await createWallet(password);
			setMnemonic(mnemonic);
			setWallet(wallet);
		} else {
			setIsPasswordSame(false);
			setMyPassword();
			console.log('error')
		}
	};
	const handleLogin = () => {
		navigate(`/login`);
	}
	

	return (
		<div>
			<Box sx={{ flexGrow: 1 }}>
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
							{isPasswordSame ? (
									<Stack sx={{ width: '100%' }} spacing={2}>
										<Alert severity="success">{myMnemonic}</Alert>
									</Stack>
								) : (
									<Stack sx={{ width: '100%' }} spacing={2}>
										<Alert severity="error">일치하지 않습니다.</Alert>
									</Stack>
								)}
							<Typography component="h6" variant="h6">
								비밀번호를 입력하고, <br /> 니모닉 코드를 발급 받으세요.
							</Typography>
							<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
								<Grid container spacing={2}>
									<Grid item xs={12}>
										<TextField 
											required 
											fullWidth 
											name="password" 
											label="Password" 
											type="password" 
											id="password" 
											autoComplete="new-password" />
									</Grid>
									<Grid item xs={12}>
										<TextField
											required
											fullWidth
											name="confirmpassword"
											label="Confirm Password"
											type="password"
											id="confirmpassword"
												autoComplete="new-password-confirm"
											/>
										</Grid>
								</Grid>
								<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
									새로운 계정 생성
								</Button>
								<Button onClick={handleLogin} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
									로그인 하기
								</Button>
							</Box>
						</Box>
					</Container>
				</ThemeProvider>
			</Box>
		</div>
	);
};

export default Create;