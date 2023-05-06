import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Stack, TextField, Button, Avatar, Box } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import * as serverAPI from '../APIs/serverAPI';
import { styled } from '@mui/system';
import '../styles/styles.css';

const BackgroundBox = styled(Box)`
	position: absolute;
	width: 360px;
	height: 470px;
	left: 0px;
	top: 60px;
	/* Back_Phantom */
	background: #202020;
`;

const StyledTextField = styled(TextField)`
	position: absolute;
	width: 330px;
	left: 15px;
	top: 126px;
	font-size: 30px;
	color: #FFFFFF;

	/* Button_Phantom */

	background: #2D2D2D;
	border-radius: 7.5px;
`;

const Button_Report = styled(Button)`
	position: absolute;
	width: 320px;
	height: 72px;
	left: 20px;
	top: 239px;

	/* Button_Phantom */

	background: #2D2D2D;
	border-radius: 7.5px;
	color: #C0C0C0;
    padding: 20px;
    font-weight: 600;
    font-size: 17.5px;
    line-height: 22px;
    font-size: 18px;
`;

const Button_Mypage = styled(Button)`
	position: absolute;
	width: 320px;
	height: 72px;
	left: 20px;
	top: 326px;

	/* Button_Phantom */

	background: #2D2D2D;
	border-radius: 7.5px;
	color: #C0C0C0;
    padding: 20px;
    font-weight: 600;
    font-size: 17.5px;
    line-height: 22px;
    font-size: 18px;
`;

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
		<BackgroundBox>
			<Box>
				<Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={3} sx={{ mt: 4 }}>
				<div style={{ position: 'relative'}}>
					<input type="text" className="home_input" placeholder="검색할 정보를 입력하세요" />
					<SearchIcon sx={{position: 'absolute', color: "#FFFFFF", fontSize: "30px", left: "290px", top: "100px"}} />
				</div>
					{/* <Button onClick={handleClick}> GET 테스트 </Button>
					<Button onClick={handleClick2}> POST 테스트 </Button> */}
				</Stack>
				<Button_Report component={Link} to="/report">
					<span style={{color : "#DF4C0D", paddingRight: "5px"}}>{"피해 사례"}</span>
					{"등록 하기"}
				</Button_Report>
				<Button_Mypage component={Link} to="/myaccount">
					{"내 정보 확인하기"}
				</Button_Mypage>
			</Box>
			<Box style={{position: "absolute", top: "430px",}}>
				<Button component={Link} to="/resultnormal">
						{"(테스트)일반"}
				</Button>
				<Button component={Link} to="/resultwarning">
						{"(테스트)주의"}
				</Button>
				<Button component={Link} to="/resultscam">
						{"(테스트)스캠"}
				</Button>
			</Box>
		</BackgroundBox>
		</div>

	);
};

export default Home;