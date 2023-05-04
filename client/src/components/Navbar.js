import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, IconButton,  Avatar, Button } from "@mui/material";
import { styled } from '@mui/system';

const StyledBox = styled(Box)`
	position: absolute;
	width: 360px;
	height: 60px;
	left: 0px;
	top: 0px;
	background: #2D2D2D;
`;

const StyledAvatar = styled(Avatar)`
	position: absolute;
	width: 36.79px;
	height: 38.99px;
	left: 15.53px;
	top: 10.47px;
	background: #131313;
`;

const Box2 = styled(Box)`
	position: absolute;
	width: 74px;
	height: 31px;
	left: 143px;
	top: 15px;

	font-style: normal;
	font-weight: 700;
	font-size: 25px;
	line-height: 31px;
	text-align: center;
	letter-spacing: 0.0581866px;

	color: #FFFFFF;
`;

const StyledButton = styled(Button)`
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	padding: 8px 3px;
	gap: 10px;

	position: absolute;
	width: 59px;
	height: 29px;
	left: 290px;
	top: 16px;

	background: #131313;
	border-radius: 15px;
	font-size: 8px;
	color: #FFFFFF;
	
`;


const Navbar = () => {

	return (
		<>
			<StyledBox>
				<IconButton component={Link} to="/" sx={{ flexGrow: 1, px: 0 }}>
					<StyledAvatar variant="circular" alt="Podo" src={require("../assets/podo_logo.png")} />
				</IconButton>
				<Box2>PODO</Box2>
				<StyledButton>Connected</StyledButton>
			</StyledBox>
		</>
	);
};

export default Navbar;