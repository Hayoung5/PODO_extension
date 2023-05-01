import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Stack, Typography, Button, Avatar, Box } from "@mui/material";
import { TestButton } from "../styles/style";
import * as serverAPI from '../APIs/serverAPI';

const Home = () => {
	const navigate = useNavigate();

	const [option, setOption] = useState('');

	useEffect(() => {
		
	}, );

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
			<Box>
				<Stack direction="column" justifyContent="flex-start" alignItems="center" spacing={4} sx={{ mt: 4 }}>
					<Typography variant="h5">Podo Extension</Typography>
					<Avatar variant="square" alt="Podo" src={require("../assets/podo_logo.png")} sx={{ width: 40, height: 40 }} />
					<Stack direction="column" justifyContent="flex-start" alignItems="center" spacing={1}>
						<TestButton component={Link} to="/search" variant="body2">
							조회 하기
						</TestButton>
					</Stack>
					<Stack direction="column" justifyContent="flex-start" alignItems="center" spacing={1}>
						<Link component={Link} to="/findmnemonic" variant="body2">
							신고 하기
						</Link>
					</Stack>
					<Stack direction="column" justifyContent="flex-start" alignItems="center" spacing={1}>
						<Link component={Link} to="/findmnemonic" variant="body2">
							내 정보
						</Link>
						<Button onClick={handleClick}> GET 테스트 </Button>
						<Button onClick={handleClick2}> POST 테스트 </Button>
					</Stack>
				</Stack>
			</Box>
		</Box>
		</div>

	);
};

export default Home;