import React, { useEffect, useState } from "react";
import { Typography, Box, AppBar, Toolbar, Button, IconButton, TextField, Stack, Divider, Modal, Chip } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom";
import SearchAccount from "../components/SearchAccount";

const Content = () => {
	const [account, setAccount] = useState(""); // 조회할 주소
	const [contract, setContract] = useState(""); // 조회할 컨트랙트
	const [site, setSite] = useState(""); // 조회할 사이트
	const [open1, setOpen1] = useState(false);

	const handle1 = (e) => { setAccount(e.target.value); };
	const handle2 = (e) => { setContract(e.target.value); };
	const handle3 = (e) => { setSite(e.target.value); };
	
	useEffect(() => {
	}, []);


	return (
		<div>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static">
					<Toolbar variant="dense">
						<Typography variant="caption" align="left" sx={{ flexGrow: 1 }}>
							조회하기
						</Typography>
					</Toolbar>
				</AppBar>
			</Box>
			<Box sx={{ p: 3 }}>
				<Stack direction="column" justifyContent="space-between" alignItems="left" spacing={3}>
					<Stack direction="row" justifyContent="space-between" alignItems="left" spacing={2}>
						<div style={{width: "80%"}}>
							<Typography align="left" style={{width: "35%", fontSize: "15px"}} >
								{"조회할 계좌"}
							</Typography>
							<TextField id="account" label="0x..." variant="outlined" size="small" onChange={(e) => handle1(e)} />
						</div>
						<Button variant="contained" onClick={()=>{setOpen1(true);}}>
							<SearchIcon />
						</Button>
						<SearchAccount account={account} open={open1} setOpen={setOpen1} />
					</Stack>
					<Stack direction="row" justifyContent="space-between" alignItems="left" spacing={2}>
						<div style={{width: "80%"}}>
							<Typography align="left" style={{width: "35%", fontSize: "15px"}} >
								조회할 컨트랙트
							</Typography>
							<TextField id="contract" label="0x..." variant="outlined" size="small" onChange={(e) => handle2(e)} />
						</div>
						<Button variant="contained" component={Link} to="/transfer">
							<SearchIcon />
						</Button>
					</Stack>
					<Stack direction="row" justifyContent="space-between" alignItems="left" spacing={2}>
						<div style={{width: "80%"}}>
							<Typography align="left" style={{width: "35%", fontSize: "15px"}} >
								조회할 사이트
							</Typography>
							<TextField id="site" label="https://..." variant="outlined" size="small" onChange={(e) => handle3(e)} />
						</div>
						<Button variant="contained" component={Link} to="/transfer">
							<SearchIcon />
						</Button>
					</Stack>
				</Stack>
			</Box>
			<Divider />
		</div>
	);
};

export default Content;