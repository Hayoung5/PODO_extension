
/*global chrome*/
import React, { useEffect, useState } from "react";
import { Typography, Box, AppBar, Toolbar, Button, IconButton, Avatar, Stack, Divider, Modal, Chip } from "@mui/material";
import { Link } from "react-router-dom";
import Transaction from "../components/Transaction";
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
import { getAddBalance } from '../APIs/walletAPI';

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 280,
	bgcolor: "#FF98A3",
	border: "1px",
	borderRadius: "15px",
	boxShadow: 10,
	p: 3,
};


const SearchAccount = ({account, open, setOpen}) => {

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
            <Modal open={open} onClose={handleClose} aria-labelledby="child-modal-title" aria-describedby="child-modal-description">
                <Box sx={style}>
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
                    <Stack direction="row" justifyContent="flex-end" spacing={2}>
                        <Button color="info" variant="contained" onClick={handleClose}>
                            Close
                        </Button>
                    </Stack>
                </Box>
            </Modal>
		</div>
	);
};

export default SearchAccount;