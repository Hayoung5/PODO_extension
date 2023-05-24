/*global chrome*/
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Box, IconButton,  Avatar, Button } from "@mui/material";
import { styled } from '@mui/system';
import { getAddData } from "../APIs/walletAPI";
import { convertChecksumAdd } from "../utils/utils";

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
	const [connect, setConnect] = useState(false);

	const handleConnect = async(event) => {
		event.preventDefault(); 
		try {
			const res = await getAddData();
			if (res.length) {
				let add = res[0];
				add = convertChecksumAdd(add);
				setConnectedAdd(add);
				chrome.storage.local.set({ connectedAdd: add });
				setConnect(true);
			}
		} catch (error) {
			console.error('Error fetching data:', error);
		}

	}

	const handleUnconnect = (event) => {
		event.preventDefault(); 
		chrome.storage.local.set({connectedAdd: null});
		setConnect(false);
	}

    useEffect(() => {


        const fetchData = async () => {

            const getStoredData = await new Promise((resolve) => {
                chrome.storage.local.get("connectedAdd", (result) => {
                    resolve(result.connectedAdd);
                });
            });
    
            if (getStoredData) {
				let add = getStoredData;
				add = convertChecksumAdd(add);
				setConnectedAdd(add);
				setConnect(true);
            } 
        }

        fetchData();

    }, []);

	return (
		<>
			<StyledBox>
				<Box2 component={Link} to="/">PODO</Box2>
				{connect ? 
				<StyledButton onClick={(event) => {handleUnconnect(event)}}>
					Connected
				</StyledButton>
				:<StyledButton onClick={(event) => {handleConnect(event)}}>
					Unconnected
				</StyledButton>
				}
			</StyledBox>
		</>
	);
};

export default Navbar;