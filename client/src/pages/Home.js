/*global chrome*/

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Stack, TextField, Button, Tooltip, Box, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { styled } from '@mui/system';
import * as serverAPI from '../APIs/serverAPI';
import { BackgroundBox, StyledHelpOutlineIcon, ReportButton  } from '../styles/style';
import { returnType } from "../utils/utils";
import '../styles/styles.css';

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

const StyledTypography = styled(Typography)`
	position: absolute;
	width: 213px;
	height: 25px;
	left: 30px;
	top: 60px;
	font-style: normal;
	font-weight: 600;
	font-size: 20px;
	line-height: 25px;
	/* identical to box height */

	letter-spacing: 0.0589815px;

	color: #E6E6E6;
`

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
						<StyledTypography>
							궁금한 주소를 찾아보세요.
							<Tooltip title="웹사이트 주소나 거래를 하려는 지갑 주소, 컨트랙트 주소를 입력하세요.">
								<StyledHelpOutlineIcon style={{position: "absolute", left: "220px", top: "4px"}}/>
							</Tooltip>
						</StyledTypography>
						<input 
							type="text" 
							className="home_input" 
							placeholder="URL, 계정 주소를 입력하세요."
							onKeyPress={handleKeyPress} 
							style={{ height: '40px', color:"#C0C0C0", position: 'absolute', top: "105px"}} 
						/>
						<SearchIcon sx={{position: 'absolute', color: "#C0C0C0", fontSize: "30px", left: "290px", top: "130px"}} />
					</div>
				</Stack>
				<ReportButton top={239} />
				<MyPageButton top={326} />
		</BackgroundBox>
		</div>

	);
};

export default Home;