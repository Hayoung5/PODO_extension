import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FormControl, FormHelperText, InputLabel, MenuItem, Stack, TextField, Button, Avatar, Box, Typography, Tooltip } from "@mui/material";
import * as serverAPI from '../APIs/serverAPI';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { returnType, returnDomain } from "../utils/utils";
import { postReport } from "../APIs/serverAPI";
import { getAddData } from "../APIs/walletAPI";
import '../styles/styles.css';


const BackgroundBox = styled(Box)`
	position: absolute;
    overflow:scroll;
	width: 360px;
	height: 470px;
	left: 0px;
	top: 36px;
	background: #2D2626;
`;

const StyledTextField = styled(TextField)`
	width: 300px;
	left: 20px;
	font-size: 30px;
    background: #2D2D2D;
    border-radius: 7.5px;
`;

const StyledSelect = styled(Select)`
    width: 300px;
    left: 20px;s
    font-size: 30px;
    background: #2D2D2D;
    border-radius: 7.5px;
`;

const StyledTypography = styled(Typography)`
    padding-left: 25px;
    color: #C0C0C0;
    font-weight: 600;
    line-height: 22px;
    font-size: 17px;
    padding-top: 20px;
`;

const TitleTypography = styled(Typography)`
    padding-top: 25px;
    padding-left: 25px;
    color: #FFFFFF;
    font-weight: 600;
    line-height: 24px;
    font-size: 24px;
`;

const StyledButton1 = styled(Button)`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;

    position: absolute;
    width: 135px;
    height: 55px;
    left: 112px;
    margin-top: 40px;
    margin-bottom: 40px;

    color : #FFFFFF;
    font-size: 18px;
    font-weight: 600;

    box-shadow: 0px 1px 14px rgba(0, 0, 0, 0.1);
    border-radius: 18px;

    background: #C80505;
    &:hover {
        background: #C8050588;
`;

const StyledHelpOutlineIcon = styled(HelpOutlineIcon)`
    font-size: 17px;
    color : #A0A0A0;
    left: 300px;
`;




const Report = () => {
    const navigate = useNavigate();
    const [connectedAdd, setConnectedAdd] = useState(false);
    const [selectedValue, setSelectedValue] = useState("");

    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value);
    };

	useEffect(async() => {
        const fetchData = async () => {
            try {
                const res = await getAddData();
                if (res.length) {
                    console.log(res);
                    const add = res[0];
                    setConnectedAdd(add);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
        
	}, []);


    const handleReport = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
        // const category = data.get("category");
		const reporter = data.get("reporter").replace(/\s/g, '');
        const selectValue = data.get("selectValue");
        const directValue = data.get("directValue");
        let content;
        if (selectValue !== "direct") {
            content = selectValue;
        } else {
            content = directValue;
        }
        const website = data.get("website").replace(/\s/g, '');
        const reportedAddr = data.get("reportedAddr").replace(/\s/g, '');
        const txHash = data.get("txHash").replace(/\s/g, '');
        console.log(returnType(reportedAddr));
        if (returnType(reporter) != "ADDRESS") {
            alert(`피해를 입은 계정 주소를 확인해주세요. 입력값 : ${reporter}`);
        } else if (returnType(website) != "URL" && returnType(reportedAddr) != "ADDRESS") {
            alert(`피해를 준 계정 주소 또는 웹사이트 주소를 올바르게 입력해주세요.`);
        } else {
            try {
                const res = await postReport(reporter, content, returnDomain(website), reportedAddr, txHash);
                if (res.status == 200) {
                    alert("신고가 등록 되었습니다!");
                    navigate("/");
                } else {
                    alert(res);
                }
            } catch (error) {
                alert(error);
            }
        }
	};


	return (
		<BackgroundBox component="form" noValidate onSubmit={handleReport} sx={{ mt: 3 }}>          
            <Stack direction="column" justifyContent="flex-end" spacing={1}>
            
                <TitleTypography align="left" variant="h4">
                    {"어떤 피해를 입으셨나요?"}
                    {/* <span style={{ color: '#C80505', fontSize: '25px' }}>피해</span>
                    {"를 입으셨나요?"} */}
                </TitleTypography>

                {/* 피해 종류 */}
                <StyledTypography align="left" variant="h6">
                    {"피해 종류"}
                    <span style={{ color: '#C80505' }}> *</span>
                </StyledTypography>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <StyledSelect
                        id="content"
                        name="selectValue"
                        displayEmpty
                        value={selectedValue}
                        onChange={handleSelectChange}
                        inputProps={{ 'aria-label': 'Without label' }}
                        sx={{ "& .MuiOutlinedInput-input": { color: "#797979" }, "& .MuiFormLabel-root": { color: "#797979" } }}
                    >
                        <MenuItem value="" style={{color: "#797979"}}>
                            어떤 종류의 피해인가요?
                        </MenuItem>
                        <MenuItem value={"가짜 NFT 민팅"}>가짜 NFT 민팅</MenuItem>
                        <MenuItem value={"가짜 암호화폐 거래소"}>가짜 암호화폐 거래소</MenuItem>
                        <MenuItem value={"투자를 가장한 입금 사기"}>투자를 가장한 입금 사기</MenuItem>
                        <MenuItem value="direct">기타 (직접 입력)</MenuItem>
                    </StyledSelect>
                    {selectedValue === 'direct' && 
                        <StyledTextField name = "directValue"
                        InputProps={{ sx: {"& input": { color: "#E0E0E0"}, "& label" : {color: "#E0E0E0"}}}} placeholder="간략한 내용을 적어주세요." 
                        />
                    }
                </FormControl>

                {/* 피해를 입은 계정 */}
                <Box sx={{ display: 'flex', alignItems: 'flex-end', position: 'relative' }}>
                    <StyledTypography align="left" variant="h6">
                        {"피해를 입은 계정 주소"}
                        <span style={{ color: '#C80505' }}> *</span>
                    </StyledTypography>
                    <Tooltip title="PODO와 연결된 지갑의 주소가 자동으로 입력됩니다.">
                        <StyledHelpOutlineIcon sx={{ position: 'absolute', left: '300px'}} />
                    </Tooltip>
                </Box>
                <StyledTextField name="reporter" type="text" id="reporter"
                    InputProps={{ sx: {"& input": { color: "#E0E0E0"}, "& label" : {color: "#E0E0E0"}}}} defaultValue={connectedAdd ? connectedAdd : ""} >
                </StyledTextField>

                {/* 상대방의 계정 */}
                <Box sx={{ display: 'flex', alignItems: 'flex-end', position: 'relative' }}>
                    <StyledTypography align="left" variant="h6">
                        {"상대방의 계정 주소"}
                        <span style={{ color: '#C80505' }}> *</span>
                    </StyledTypography>
                    <Tooltip title="상대방이 사용한 계정의 주소를 알려주세요. 주소는 0x로 시작하는 40자리의 영문/숫자로 구성되어 있습니다. EOA와 CA 모두 입력하실 수 있습니다.">
                        <StyledHelpOutlineIcon sx={{position: 'absolute', left: '300px'}} />
                    </Tooltip>
                </Box>
                <StyledTextField name="reportedAddr" type="text" id="reportedAddr"
                    InputProps={{ sx: {"& input": { color: "#E0E0E0"}, "& label" : {color: "#E0E0E0"}}}} placeholder="0x로 시작하는 40자리 주소" >
                </StyledTextField>

                {/* 상대방의 홈페이지 */}
                <Box sx={{ display: 'flex', alignItems: 'flex-end', position: 'relative' }}>
                    <StyledTypography align="left" variant="h6">
                        {"상대방의 홈페이지 주소"}
                        <span style={{ color: '#C80505' }}> *</span>
                    </StyledTypography>
                    <Tooltip title="상대방이 사용한 홈페이지 주소를 알려주세요. https:// 형태로 시작하며 크롬 등의 웹브라우저 상단에 나오는 주소입니다.">
                        <StyledHelpOutlineIcon sx={{position: 'absolute', left: '300px'}} />
                    </Tooltip>
                </Box>
                <StyledTextField name="website" type="text" id="website"
                    InputProps={{ sx: {"& input": { color: "#E0E0E0"}, "& label" : {color: "#E0E0E0"}}}} placeholder="https://로 시작하는 도메인 주소" >
                </StyledTextField>

                {/* Tx Hash */}
                <Box sx={{ display: 'flex', alignItems: 'flex-end', position: 'relative' }}>
                    <StyledTypography align="left" variant="h6">
                        {"Tx Hash (선택)"}
                    </StyledTypography>
                    <Tooltip title="거래의 해시값을 알려주시면 빠르게 도와드릴 수 있어요. 피해내용 확인, 피해금액 산정에 도움이 됩니다. 해시값은 지갑 혹은 블록 탐색기에서 확인할 수 있습니다.">
                        <StyledHelpOutlineIcon sx={{position: 'absolute', left: '300px'}} />
                    </Tooltip>
                </Box>
                <StyledTextField name="txHash" type="text" id="txHash"
                    InputProps={{ sx: {"& input": { color: "#E0E0E0"}, "& label" : {color: "#E0E0E0"}}}} placeholder="0x로 시작하는 64자리 해시값" >
                </StyledTextField>
            </Stack>
            <StyledButton1 type="submit" variant="contained" >
                {"신고하기"}
            </StyledButton1>
		</BackgroundBox>

	);
};

export default Report;