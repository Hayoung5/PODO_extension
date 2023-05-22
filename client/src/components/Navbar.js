/*global chrome*/
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Box, IconButton,  Avatar, Button } from "@mui/material";
import { styled } from '@mui/system';
import { getAddData } from "../APIs/walletAPI";
import { ethers } from "ethers";
import { utils } from "ethers";

const StyledBox = styled(Box)`
	position: absolute;
	width: 360px;
	height: 60px;
	left: 0px;
	top: 0px;
	background: #242424;
	border-bottom: 2px solid #333333;
	box-sizing: border-box;
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
	position: relative;
	width: 74px;
	height: 31px;
	left: 25px;
	top: 15px;

	font-style: normal;
	font-weight: 700;
	font-size: 25px;
	line-height: 31px;
	text-align: center;
	letter-spacing: 0.0581866px;
	text-decoration: none;

	color: #5660E6;
`;

const StyledButton = styled(Button)`
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 8px 3px;
	gap: 10px;

	position: absolute;
	width: 60px;
	height: 30px;
	left: 275px;
	top: 15px;

	background: #131313;
	border-radius: 15px;
	font-size: 8px;
	color: #FFFFFF;
	text-transform: capitalize;
`;


const Navbar = () => {
    const [connectedAdd, setConnectedAdd] = useState();

    useEffect(() => {
		chrome.storage.local.get("connectedAdd", async(res) => {
            if (res.connectedAdd) {
				let add = res.connectedAdd;
				if(/^[0-9a-z]+$/.test(add)){
					add = ethers.getAddress(add);
				}
				setConnectedAdd(add);
			} else {
				try {
					const res = await getAddData();
					if (res.length) {
						console.log(res);
						let add = res[0];
						setConnectedAdd(add);
						if(/^[0-9a-z]+$/.test(add)){
							add = ethers.getAddress(add);
						}
						console.log(add);
						chrome.storage.local.set({ connectedAdd: add });
					}
				} catch (error) {
					console.error('Error fetching data:', error);
				}
			}
		});

    }, []);

	return (
		<>
			<StyledBox>
				<Box2 component={Link} to="/home">PODO</Box2>
				{connectedAdd ? 
				<StyledButton>Connected</StyledButton>
				:<StyledButton>Unconnected</StyledButton>
				}
			</StyledBox>
		</>
	);
};

export default Navbar;