import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Stack, TextField, Button, Avatar, Box, Typography, Tooltip } from "@mui/material";
import * as serverAPI from '../APIs/serverAPI';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { returnType, returnDomain } from "../utils/utils";
import { postReport } from "../APIs/serverAPI";
import '../styles/styles.css';


const BackgroundBox = styled(Box)`
	position: absolute;
    overflow:scroll;
	width: 360px;
	height: 470px;
	left: 0px;
	top: 36px;
	/* Back_Phantom */
	background: #202020;
`;

const StyledTextField = styled(TextField)`
	width: 300px;
	left: 20px;
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
    top: 770px;
    margin-bottom: 20px;

    color : #FFFFFF;
    font-size: 18px;
    font-weight: 600;

    background: #5660E6;
    /* shadow */
    box-shadow: 0px 1px 14px rgba(0, 0, 0, 0.1);
    border-radius: 18px;
`;

const StyledHelpOutlineIcon = styled(HelpOutlineIcon)`
    font-size: 17px;
    color : #A0A0A0;
    left: 300px;
`;

const Report = () => {
    const navigate = useNavigate();

	useEffect(() => {
	}, );


    const handleReport = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
        // const category = data.get("category");
		const reporter = data.get("reporter").replace(/\s/g, '');
        const content = data.get("content");
        const website = data.get("website").replace(/\s/g, '');
        const reportedAddr = data.get("reportedAddr").replace(/\s/g, '');
        const txHash = data.get("txHash").replace(/\s/g, '');
        console.log(returnType(reportedAddr));
        if (returnType(reporter) != "ADDRESS") {
            alert(`피해를 입은 계정 주소를 확인해주세요. 입력값 : ${reporter}`);
        } else if (returnType(website) != "URL" && returnType(reportedAddr) != "ADDRESS") {
            alert(`페이지 주소 또는 사기 계정 주소를 올바르게 입력해주세요.`);
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
            
                <TitleTypography align="left" variant="h5">
                    {"어떤 피해를 입으셨나요?"}
                    { /* <span style={{ color: '#C80505', fontSize: '25px' }}>피해</span>
                    {"를 입으셨나요?"} */ }
                </TitleTypography>

                {/* <StyledTypography align="left" variant="h6">
                    {"피해 종류"}
                    <span style={{ color: '#C80505' }}> *</span>
                </StyledTypography> */}
                {/* <StyledTextField name="category" type="text" id="category"
                    InputProps={{ sx: {"& input": { color: "#E0E0E0"}, "& label" : {color: "#E0E0E0"}}}} placeholder="종류 선택하기 (예정)" >
                </StyledTextField> */}

                <StyledTypography align="left" variant="h6">
                    {"피해를 입은 지갑 주소"}
                    <span style={{ color: '#C80505' }}> *</span>
                </StyledTypography>
                <Tooltip title="피해를 입은 계정의 주소를 알려주세요. 주소는 0x로 시작하는 40자리의 영문/숫자로 구성되어 있습니다.">
                    <StyledHelpOutlineIcon sx={{position: 'absolute', top: "190px"}} />
                </Tooltip>
                <StyledTextField name="reporter" type="text" id="reporter"
                    InputProps={{ sx: {"& input": { color: "#E0E0E0"}, "& label" : {color: "#E0E0E0"}}}} placeholder="0x..." >
                </StyledTextField>

                <StyledTypography align="left" variant="h6">
                    {"상대방의 계정(지갑) 주소"}
                    <span style={{ color: '#C80505' }}> *</span>
                </StyledTypography>
                <Tooltip title="상대방이 사용한 계정의 주소를 알려주세요. 주소는 0x로 시작하는 40자리의 영문/숫자로 구성되어 있습니다. EOA와 CA 모두 입력하실 수 있습니다.">
                    <StyledHelpOutlineIcon sx={{position: 'absolute', top: "305px"}} />
                </Tooltip>
                <StyledTextField name="reportedAddr" type="text" id="reportedAddr"
                    InputProps={{ sx: {"& input": { color: "#E0E0E0"}, "& label" : {color: "#E0E0E0"}}}} placeholder="0x..." >
                </StyledTextField>

                <StyledTypography align="left" variant="h6">
                    {"상대방의 홈페이지 주소"}
                    <span style={{ color: '#C80505' }}> *</span>
                </StyledTypography>
                <Tooltip title="상대방이 사용한 홈페이지 주소를 알려주세요. 크롬 등의 웹브라우저 상단에 나오는 주소입니다.">
                    <StyledHelpOutlineIcon sx={{position: 'absolute', top: "420px"}} />
                </Tooltip>
                <StyledTextField name="website" type="text" id="website"
                    InputProps={{ sx: {"& input": { color: "#E0E0E0"}, "& label" : {color: "#E0E0E0"}}}} placeholder="https://..." >
                </StyledTextField>

                <StyledTypography align="left" variant="h6">
                    {"Tx Hash (선택)"}
                </StyledTypography>
                <Tooltip title="상대방이 사용한 홈페이지 주소를 알려주세요. 크롬 등의 웹브라우저 상단에 나오는 주소입니다.">
                    <StyledHelpOutlineIcon sx={{position: 'absolute', top: "530px"}} />
                </Tooltip>
                <StyledTextField name="txHash" type="text" id="txHash"
                    InputProps={{ sx: {"& input": { color: "#E0E0E0"}, "& label" : {color: "#E0E0E0"}}}} placeholder="0x..." >
                </StyledTextField>

                <StyledTypography align="left" variant="h6">
                    {"피해 내용 (선택)"}
                </StyledTypography>
                <Tooltip title="자세히 적어주실 수록 도움이 됩니다.">
                    <StyledHelpOutlineIcon sx={{position: 'absolute', top: "645px"}} />
                </Tooltip>
                <StyledTextField name="content" type="text" id="content"
                    InputProps={{ sx: {"& input": { color: "#E0E0E0"}, "& label" : {color: "#E0E0E0"}}}} placeholder="사기 유형, 수법 등을 공유해 주세요." >
                </StyledTextField>

            </Stack>
            <StyledButton1 type="submit" variant="contained" >
                {"제보 하기"}
            </StyledButton1>
		</BackgroundBox>

	);
};

export default Report;