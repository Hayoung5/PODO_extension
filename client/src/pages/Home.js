/*global chrome*/

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Stack, TextField, Button, Avatar, Box } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { styled } from '@mui/system';
import * as serverAPI from '../APIs/serverAPI';
import { BackgroundBox } from '../styles/style';
import { returnType } from "../utils/utils";
import '../styles/styles.css';
  
const Button_Report = styled(Button)`
	position: absolute;
	width: 320px;
	height: 72px;
	left: 20px;
	background: #2D2D2D;
	border-radius: 7.5px;
	color: #C0C0C0;
    padding: 20px;
    font-weight: 600;
    font-size: 17.5px;
    line-height: 22px;
    font-size: 18px;
	text-align: left; 
`;

const Button_Mypage = styled(Button)`
	position: absolute;
	width: 320px;
	height: 72px;
	left: 20px;
	background: #2D2D2D;
	border-radius: 7.5px;
	color: #C0C0C0;
	padding: 20px;
	font-weight: 600;
	line-height: 22px;
	font-size: 18px;
	text-align: left;
`;


const Home = ({setInputValue, setIsURL}) => {
	const navigate = useNavigate();

	useEffect(() => {
        const fetchData = async () => {

            const getStoredData = await new Promise((resolve) => {
                chrome.storage.local.get("msg", (res) => {
                    resolve(res.msg);
                });
            });
    
            if (getStoredData) {
				console.log(getStoredData);
                navigate(`/tx`);
            }
        }

        fetchData();
	}, []);

	const handleKeyPress = (event) => {
	  if (event.key === 'Enter') {
		const input = event.target.value;
		const type = returnType(input);
		if (type === "INVALID ADDRESS") {
			alert(`유효하지 않은 계정 주소 입니다. 다시 한번 확인해보세요. \n입력값 : ${input}`);
		} else if (type === "INVALID URL") {
			alert(`유효하지 않은 URL 입니다.\n도메인 주소 앞에 https://가 입력되어 있는지 확인해보세요. \n입력값 : ${input}`);
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

	const ReportButton = ({ top }) => (
		<Button_Report component={Link} to="/report" variant="body2" style={{ top: `${top}px` }}>
			<Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
				<div>
					<span style={{color : "#DF4C0D", paddingRight: "5px"}}>{"피해 사례"}</span>
					{"신고하기"}
				</div>
				<ArrowForwardIosIcon sx={{color: '#DF4C0D'}} />
			</Box>
		</Button_Report>
	);
	
	const MyPageButton = ({ top }) => (
		<Button_Mypage component={Link} to="/mypage" style={{ top: `${top}px` }}>
			<Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
				<div>
					{"내 정보 확인하기"}
				</div>
				<ArrowForwardIosIcon />
			</Box>
		</Button_Mypage>
	);
	


	return (
		<div>
		<BackgroundBox>
				<Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={3} sx={{ mt: 0 }}>
				<div style={{ position: 'relative' }}>
				<input 
					type="text" 
					className="home_input" 
					placeholder="검색할 정보를 입력하세요"
					onKeyPress={handleKeyPress} 
					style={{ height: '90px' }} 
				/>
					<SearchIcon sx={{position: 'absolute', color: "#C0C0C0", fontSize: "30px", left: "290px", top: "115px"}} />
				</div>
					{/* <Button onClick={handleClick}> GET 테스트 </Button>
					<Button onClick={handleClick2}> POST 테스트 </Button> */}
				</Stack>
				<ReportButton top={239} />
				<MyPageButton top={326} />
		</BackgroundBox>
		</div>

	);
};

export default Home;