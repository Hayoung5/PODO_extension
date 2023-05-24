import React from 'react';
import { Link } from 'react-router-dom';
import { Stack, Typography, Button, Avatar, Box } from '@mui/material';
import { styled } from '@mui/system';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

export const BackgroundBox = styled(Box)`
	position: absolute;
	width: 360px;
    height: 470px;
	left: 0px;
	top: 60px;
	background: #282626;
	overflow-y: scroll;
	
    /* Hide the scrollbar */
    &::-webkit-scrollbar {
        width: 0
    }
`

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
	width: 320px;
	height: 72px;
    margin-top: 20px;
	margin-left: 20px;
	background: #2D2D2D;
	border-radius: 7.5px;
	color: #C0C0C0;
	padding: 20px;
	font-weight: 600;
	line-height: 22px;
	font-size: 18px;
	text-align: left;
`;

export const StyledHelpOutlineIcon = styled(HelpOutlineIcon)`
    font-size: 17px;
    color : #A0A0A0;
    left: 300px;
`;


export const ReportButton = ({ top }) => (
    <Button_Report component={Link} to="/report" variant="body2" style={{ top: `${top}px` }}>
        <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
            <div>
                <span style={{color : "#C80505", paddingRight: "5px"}}>{"피해 사례"}</span>
                {"신고하기"}
            </div>
            <ArrowForwardIosIcon sx={{color: '#C80505'}} />
        </Box>
    </Button_Report>
);

export const MyPageButton = ({ top }) => (
    <Button_Mypage component={Link} to="/myaccount" style={{ top: `${top}px` }}>
        <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
            <div>
                {"내 정보 확인하기"}
            </div>
            <ArrowForwardIosIcon />
        </Box>
    </Button_Mypage>
);
