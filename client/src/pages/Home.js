/*global chrome*/
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Stack, Typography, Button, Avatar, Box } from "@mui/material";
import * as serverAPI from '../APIs/serverAPI';

const Home = () => {
	const navigate = useNavigate();
	const [isLogin, setIsLogin] = useState(false);
	useEffect(() => {
		chrome.storage.local.get("login", (res) => {
			if (res.login == true) {
			navigate(`/content`);
			setIsLogin(true);
			}
		});
		
	}, [isLogin]);

	const handleClick = async (event) => {
		console.log("test1");
		await serverAPI.getGreeting()
		.then((res) => {
			console.log(res);
			if (res.status == 200){
				console.log("성공");
		}}).catch(function (error) {
			let res = error.response.data;
			console.log(`${res.status} ERROR!: ${res.message}`);
		});
	};


	const handleClick2 = async (event) => {
		console.log("test2");
		await serverAPI.postText("abcde")
		.then((res) => {
			console.log(res);
			if (res.status == 200){
				console.log("성공");
		}}).catch(function (error) {
			let res = error.response.data;
			console.log(`${res.status} ERROR!: ${res}`);
		});
	};

	return (
		<div>
		<Box sx={{ flexGrow: 1 }}>
			{isLogin ? (
				navigate(`/content`)
			) : (
				<Box>
					<Stack direction="column" justifyContent="flex-start" alignItems="center" spacing={4} sx={{ mt: 4 }}>
						<Typography variant="h5">Podo Wallet</Typography>
						<Avatar variant="square" alt="Podo" src={require("../assets/podo_logo.png")} sx={{ width: 40, height: 40 }} />
						<Stack direction="column" justifyContent="flex-start" alignItems="center" spacing={1}>
							<Typography variant="subtitle2">패스워드를 입력하여 로그인</Typography>
							<Button variant="contained" color="info" component={Link} to="/login">
								Login
							</Button>
						</Stack>
						<Stack direction="column" justifyContent="flex-start" alignItems="center" spacing={1}>
							<Typography variant="subtitle2">지갑 생성하기</Typography>
							<Button variant="contained" color="info" component={Link} to="/create">
								Create Wallet
							</Button>
						</Stack>

						<Stack direction="column" justifyContent="flex-start" alignItems="center" spacing={1}>
							<Link component={Link} to="/findmnemonic" variant="body2">
								패스워드를 잊으셨나요?
							</Link>
							<Link component={Link} to="/initaccount" variant="body2">
								복구 구문을 잊으셨나요?
							</Link>
							<Button onClick={handleClick}> GET 테스트 </Button>
							<Button onClick={handleClick2}> POST 테스트 </Button>
						</Stack>
					</Stack>
				</Box>
			)}
		</Box>
		</div>

	);
};

export default Home;