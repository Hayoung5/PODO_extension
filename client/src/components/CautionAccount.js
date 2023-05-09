
import React, { useEffect, useState } from "react";
import { Typography, Box, AppBar, Toolbar, Button, IconButton, Avatar, Stack, Divider, Modal, Chip } from "@mui/material";
import { Link } from "react-router-dom";
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
import { styled } from '@mui/system';
import { getAddBalance } from '../APIs/walletAPI';


const StyledBox = styled(Box)`
	position: absolute;
	width: 360px;
	height: 470px;
	left: 0px;
	top: 60px;
	/* Back_Phantom */
	background: #131313;
    color : #FFFFFF;
`;


const SearchAccount = ({account, open, setOpen}) => {

	const handleClose = () => {
		setOpen(false);
	};

	return (
        <StyledBox>
            <Stack direction="column" justifyContent="flex-end" spacing={2}>
                <Typography align="left" variant="h6">
                    🚨 주의! 해당 계정은 3회 신고를 받았어요.
                </Typography>
                <Typography align="left" variant="h6">
                    {account}
                </Typography>
                <Typography align="left" variant="h6">
                    신고내역
                </Typography>
                <Typography align="left" variant="h7">
                    2020.12.13 이 사람 유명한 사기꾼이에요!
                </Typography>
                <Typography align="left" variant="h7">
                    2020.12.24 이 사람 이더리움 먼저 보내주면 2배로 불려준다고 사기치고 다님
                </Typography>
            </Stack>
        </StyledBox>
	);
};

export default SearchAccount;