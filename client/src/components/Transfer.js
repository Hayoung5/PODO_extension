import React, { useState, useEffect } from 'react';
import { Typography, Box, Stack, TextField, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
import { Link } from "react-router-dom";
import {transfer} from '../APIs/walletAPI_backup';

const Transfer = ({wallet}) => {
	const [ToAddress, setToAddress] = useState(""); // 받는 사람 주소
  	const [amount, setAmount] = useState(""); // 전송할 토큰 양
	const handleTo = (e) => { setToAddress(e.target.value); };
  	const handleAmount = (e) => { setAmount(e.target.value); };
	console.log(1112233);
	console.log(wallet);
	const handleClick = async(event) => {
		const toAddress = ToAddress;
		const ethAmount = amount;
		console.log("wallet");
		console.log(wallet);

		const result = await transfer(wallet, toAddress, ethAmount);
		console.log(3, result);
		alert('success transfer: ' + result);
	};

	return (
		<>
			<Box sx={{ p: 3 }}>
				<Stack spacing={2} direction="column" justifyContent="center">
					<Typography variant="h6">Token Transfer</Typography>
					<Stack direction="column" justifyContent="space-between" alignItems="left" spacing={1}>
						<Typography align="left" variant="h7">
							받는 사람
						</Typography>
						<TextField id="ToAddress" label="To Address" variant="outlined" size="small" onChange={(e) => handleTo(e)} />
					</Stack>
					<Stack direction="column" justifyContent="space-between" alignItems="left" spacing={1}>
						<Typography align="left" t="h7">
							이더 양
						</Typography>
						<TextField id="Amount" label="Token Amount" variant="outlined" size="small" onChange={(e) => handleAmount(e)} />
					</Stack>
					<Stack direction="column" justifyContent="space-between" alignItems="left" spacing={1}>
						<Typography align="left" t="h7">
							예상 수수료
						</Typography> 
						<TextField id="예상 수수료" label="0.004697 이더" variant="outlined" size="small" disabled />
					</Stack>
          			<Stack spacing={2} sx={{ pt:2 }}>
            			<Button type="submit" onClick={handleClick} variant="contained">Transfer</Button>
          			</Stack>
				</Stack>
			</Box>
		</>
	);
};

export default Transfer;