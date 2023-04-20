/*global chrome*/
import React, { useEffect, useState } from "react";
import { Typography, Box, Stack, Card, CardActions, CardContent, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { borderRadius } from "@mui/system";
import * as serverAPI from '../APIs/serverAPI';

const cardStyle = {
	width: "100%",
	border: "1px",
	borderRadius: "15px",
	boxShadow: 2,
	p: 1,
	textAlign: "left",
};


const Transaction = () => {
	const [logs, setLogs] = useState([]);

	const getLog = async() => {
		const result = await serverAPI.getLogs();
		const list = result.map((el) => { return ({
			address : el.address,
			description: el.description,
			domain : el.domain,
			ethAmount : el.ethAmount,
			time : el.time,
			txHash : el.txHash
		  });
		})
		setLogs(list);
	}

	useEffect(() => {
		getLog();
	}, []);

	const handleButtonClick = (event, txHash) => {
		event.preventDefault();
		window.open(`https://goerli.etherscan.io/tx/${txHash}`, '_blank');
	};

	return (
		<div>
			<React.Fragment>
				<Box sx={{ p: 3 }}>
					<Stack spacing={1} direction="column" justifyContent="center">
						<Typography align="left" variant="h6">
							Transaction List
						</Typography>
						<Box>
							{
								logs.length == 0 ? <div>아직 트랜잭션이 내역이 없어요.</div> : logs.map((el) => {return (
									<Card sx={cardStyle}>
										<CardContent>
											<Stack spacing={1} direction="row">
												<Typography sx={{ fontSize: 14 }} color="green" gutterBottom>
													거래 종류 : 
												</Typography>
												<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
													{el.description}
												</Typography>
											</Stack>
											<Typography sx={{ fontSize: 18 }} color="black" gutterBottom>
												{`address : ${el.address.slice(0,10)}...`}
											</Typography>
											<Typography sx={{ fontSize: 18 }} color="black" gutterBottom>
												{`${el.ethAmount} ETH`}
											</Typography>
											<Typography variant="body2" color="text.secondary">
												{el.time}
											</Typography>
										</CardContent>
										<CardActions>
											<Button size="small" onClick={(event) => handleButtonClick(event, el.txHash)} > 이더스캔 익스플로러 연결</Button>
											<Button size="small"> 신고하기 </Button>
										</CardActions>
									</Card>
								)})
							}
						</Box>
					</Stack>
				</Box>
			</React.Fragment>
		</div>
	);
}

export default Transaction;