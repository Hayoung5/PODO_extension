
 

/*global chrome*/
import React, { useEffect, useState } from "react";
import { Typography, Box, AppBar, Toolbar, Button, IconButton, Avatar, Stack, Divider, Modal, Chip } from "@mui/material";
import { Link } from "react-router-dom";
import Transaction from "../components/Transaction";
import TokenList from "../components/TokenList";
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
import { getAddBalance } from '../APIs/walletAPI';

import { MetaMaskInpageProvider } from '@metamask/inpage-provider';
import PortStream from 'extension-port-stream';

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 280,
	bgcolor: "background.paper",
	border: "1px",
	borderRadius: "15px",
	boxShadow: 10,
	p: 3,
};

function getMetaMaskId() {
    return "nkbihfbeogaeaoehlefnkodbefgpgknn"
}

const Content = () => {
	const [open, setOpen] = React.useState(false);
	const [userAdd, setUserAdd] = useState();
	const [bal, setBal] = useState('');

	const getData = async () => {
		let provider
		try {
			let currentMetaMaskId = getMetaMaskId()
			const metamaskPort = chrome.runtime.connect(currentMetaMaskId)
			const pluginStream = new PortStream(metamaskPort)
			provider = new MetaMaskInpageProvider(pluginStream)
		} catch (e) {
			console.dir(`Metamask connect error `, e)
			throw e
		}
		const address = await provider.request({method: 'eth_requestAccounts'})
		setUserAdd(address);
		const balance = await getAddBalance(address);
		console.log(2,balance);
		setBal(balance);
	}
	
	useEffect(() => {
		getData();
	}, []);

	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static">
					<Toolbar variant="dense">
					<Typography variant="caption" align="left" sx={{ flexGrow: 1 }}>
							ADDRESS: 
						</Typography>
						<Typography variant="caption" align="right" sx={{ flexGrow: 1 }}>
							{userAdd}
						</Typography>
					</Toolbar>
				</AppBar>
			</Box>
			<Box sx={{ p: 3 }}>
				<Stack spacing={3} direction="column" justifyContent="center" alignItems="center">
					<Chip label="Token List" variant="outlined" color="success" onClick={handleOpen} />
					<Modal open={open} onClose={handleClose} aria-labelledby="child-modal-title" aria-describedby="child-modal-description">
						<Box sx={style}>
							<TokenList />
							<Stack direction="row" justifyContent="flex-end" spacing={2}>
								<Button color="info" variant="contained" onClick={handleClose}>
									Close
								</Button>
							</Stack>
						</Box>
					</Modal>

					<Avatar><PaidRoundedIcon/></Avatar>
					<Stack spacing={2} direction="row" justifyContent="center" alignItems="center">
						<Typography variant="h6">잔액</Typography>
						<Typography>{`${bal} 이더`}</Typography>
					</Stack>
					<Stack spacing={2} direction="column" justifyContent="center" alignItems="center">
						<Button fullWidth size="small" variant="contained" component={Link} to="/transfer">
							전송하기
						</Button>
					</Stack>
					
				</Stack>
				
			</Box>
			<Divider />

			<Transaction />
		</div>
	);
};

export default Content;