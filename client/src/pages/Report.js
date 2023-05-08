import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Stack, TextField, Button, Avatar, Box, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import * as serverAPI from '../APIs/serverAPI';
import { styled } from '@mui/system';
import { returnType, returnDomain } from "../utils/utils";
import { postReport } from "../APIs/serverAPI";
import '../styles/styles.css';

const StyledBox = styled(Box)`
	position: absolute;
    overflow:scroll;
    padding-top: 20px;
	width: 360px;
	height: 470px;
	left: 0px;
	top: 30px;
	/* Back_Phantom */
	background: #131313;
    color: #FFFFFF;	
`;

// background-color: #5660E6;
// color: #ffffff;
// &:hover {
//     background-color: #5660E6CC;
// }
// ;
const StyledTextField = styled(TextField)`
	width: 330px;
	left: 15px;
	font-size: 30px;
    background: #2D2D2D;
    border-radius: 7.5px;
`;

const StyledTypography = styled(Typography)`
    padding-left: 20px;
    color: #C0C0C0;
    font-weight: 600;
    line-height: 22px;
    font-size: 18px;
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
    top: 590px;
    margin-bottom: 20px;

    color : #FFFFFF;
    font-size: 18px;
    font-weight: 600;

    background: #5660E6;
    /* shadow */
    box-shadow: 0px 1px 14px rgba(0, 0, 0, 0.1);
    border-radius: 18px;
`;

const Report = () => {
    const navigate = useNavigate();

	useEffect(() => {
	}, );


    const handleReport = async (event) => {
        
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const reporter = data.get("reporter");
        const content = data.get("content");
        const website = data.get("website");
        const reportedAddr = data.get("reportedAddr");
        const txHash = data.get("txHash");
        if (returnType(reporter) != "ADDRESS") {
            alert(`피해를 입은 계정 주소를 확인해주세요. 입력값 : ${reporter}`);
        } else if (returnType(website) != "URL" && returnType(reportedAddr) != "ADDRESS") {
            alert(`페이지 주소 또는 사기 계정 주소를 올바르게 입력해주세요.`);
        } else {
            await postReport(reporter, content, returnDomain(website), reportedAddr, txHash).then((res) => {
                if (res.status == 200) {
                    alert("신고가 등록 되었습니다!");
                    navigate("/");
                } else {
                    alert(res);
                }
            });
        }
	};


	return (
		<StyledBox component="form" noValidate onSubmit={handleReport} sx={{ mt: 3 }}>
            <Stack direction="column" justifyContent="flex-end" spacing={2}>
                <StyledTypography align="left" variant="h6">
                    {"피해를 입은 계정 주소 (필수)"}
                </StyledTypography>
                <StyledTextField name="reporter" type="text" id="reporter"
                    InputProps={{ sx: {"& input": { color: "#FFFFFF"}, "& label" : {color: "#FFFFFF"}}}} placeholder="0x..." >
                </StyledTextField>
                <StyledTypography align="left" variant="h6">
                    {"어떤 피해를 입으셨나요?"}
                </StyledTypography>
                <StyledTextField name="content" type="text" id="content"
                    InputProps={{ sx: {"& input": { color: "#FFFFFF"}, "& label" : {color: "#FFFFFF"}}}} placeholder="사기 유형, 수법 등을 공유해 주세요." >
                </StyledTextField>
                <StyledTypography align="left" variant="h6">
                    {"페이지 주소를 알려주세요."}
                </StyledTypography>
                <StyledTextField name="website" type="text" id="website"
                    InputProps={{ sx: {"& input": { color: "#FFFFFF"}, "& label" : {color: "#FFFFFF"}}}} placeholder="https://..." >
                </StyledTextField>
                <StyledTypography align="left" variant="h6">
                    {"사기 계정 주소 (또는 컨트랙트 주소)를 알려주세요."}
                </StyledTypography>
                <StyledTextField name="reportedAddr" type="text" id="reportedAddr"
                    InputProps={{ sx: {"& input": { color: "#FFFFFF"}, "& label" : {color: "#FFFFFF"}}}} placeholder="0x..." >
                </StyledTextField>
                <StyledTypography align="left" variant="h6">
                    {"트랜잭션 해시값을 알려주세요."}
                </StyledTypography>
                <StyledTextField name="txHash" type="text" id="txHash"
                    InputProps={{ sx: {"& input": { color: "#FFFFFF"}, "& label" : {color: "#FFFFFF"}}}} placeholder="0x..." >
                </StyledTextField>
            </Stack>
            <StyledButton1 type="submit" variant="contained" >
                {"제보 하기"}
            </StyledButton1>
		</StyledBox>

	);
};

export default Report;
