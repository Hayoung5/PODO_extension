/*global chrome*/
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Stack, Button, Box, Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";

const ShowMnemonic = ({mnemonic}) => {
	const navigate = useNavigate();
	const [savedMnemonic, setSavedMnemonic] = useState();
	const [copied, setCopied] = useState(false);

    setSavedMnemonic(mnemonic);

	const handleCopy = () => {
		setCopied(true);
		console.log("copy mnemonic");
	};

	const handleContent = () => {
		navigate("/login");
	};

	return (
		<Box sx={{ p: 3 }}>
			<Stack spacing={2} direction="column" justifyContent="center">
				<Typography variant="h6">Mnemonic</Typography>
				<Typography variant="body2">니모닉 구문이 생성 되었습니다!</Typography>
				<Typography variant="body2">절대 다른 사람과 공유하지 마세요.</Typography>
				<Typography variant="subtitle1" color="primary">
					Mnemonic is
				</Typography>
				<Box sx={{ p: 2 }}>
					<Typography>{savedMnemonic}</Typography>
				</Box>

				<Stack spacing={2} direction="row" justifyContent="flex-end">
					<CopyToClipboard text={savedMnemonic} onCopy={handleCopy}>
						<Button variant="outlined" color="success" align="left" onCopy={handleCopy} size="small" sx={{ width: "30px", m: "1" }}>
							복사
						</Button>
					</CopyToClipboard>
				</Stack>
				<Stack spacing={2} direction="column" justifyContent="center">
					<Button variant="contained" onClick={handleContent} sx={{ m: "1" }}>
						시작하기
					</Button>
				</Stack>
			</Stack>
		</Box>
	);
};

export default ShowMnemonic;