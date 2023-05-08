import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Stack, TextField, Button, Avatar, Box } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import * as serverAPI from '../APIs/serverAPI';
import { styled } from '@mui/system';
import { returnType } from "../utils/utils";
import '../styles/styles.css';

const StyledBox = styled(Box)`
	position: absolute;
	width: 360px;
	height: 470px;
	left: 0px;
	top: 60px;
	/* Back_Phantom */
	background: #131313;
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

const StyledButton1 = styled(Button)`
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

const StyledButton2 = styled(Button)`
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
    line-height: 22px;
    font-size: 18px;
`;

const Home = ({setInputValue, setIsURL}) => {
	const navigate = useNavigate();

	useEffect(() => {
	}, );

	const handleKeyPress = (event) => {
	  if (event.key === 'Enter') {
		const input = event.target.value;
		const type = returnType(input);
		if (type === "INVALID ADDRESS") {
			alert(`유효하지 않은 계정 주소 입니다. 다시 한번 확인해보세요. \n입력값 : ${input}`);
		} else if (type === "INVALID URL") {
			alert(`유효하지 않은 URL 입니다. 다시 한번 확인해보세요. \n입력값 : ${input}`);
		} else if (type === "URL") {
			setInputValue(input);
			setIsURL(true);
			navigate("/searchResult");
		} else if (type === "ADDRESS") {
			setInputValue(input);
			setIsURL(false);
			navigate("/searchResult");
		} else {
			alert(`유효하지 않은 입력값 입니다. 다시 한번 확인해보세요. \n입력값 : ${input}`);
		}
	  }
	};



	return (
		<div>
		<StyledBox>
			<Box>
				<Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={3} sx={{ mt: 4 }}>
				<div style={{ position: 'relative' }}>
					<input type="text" className="home_input" placeholder="검색할 정보를 입력하세요" onKeyPress={handleKeyPress} />
					<SearchIcon sx={{position: 'absolute', color: "#FFFFFF", fontSize: "30px", left: "290px", top: "100px"}} />
				</div>
					{/* <Button onClick={handleClick}> GET 테스트 </Button>
					<Button onClick={handleClick2}> POST 테스트 </Button> */}
				</Stack>
				<StyledButton1 component={Link} to="/report" variant="body2">
					<span style={{color : "#DF4C0D", paddingRight: "5px"}}>{"피해 사례"}</span>
					{"등록 하기"}
				</StyledButton1>
				<StyledButton2>
					{"내 정보 확인하기"}
				</StyledButton2>
			</Box>
		</StyledBox>
		</div>

	);
};

export default Home;