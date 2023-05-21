import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { styled } from '@mui/system';
import { Stack, TextField, Button, Avatar, Box } from "@mui/material";
import { shortenEthereumAddress } from "../utils/utils";
import '../styles/styles.css';
import SelectButton from "./SelectButton";

const BackgroundBox = styled(Box)`
	position: absolute;
	width: 360px;
	height: 470px;
	left: 0px;
	top: 60px;
	background: #202020;
`;

const TextBox = styled(Box)`
    position: absolute;
    left: 50%;
    top: 160px;
    transform: translate(-50%, -50%);
    color: #C80505;
    font-size: 25px;
    display: flex;
    font-weight: 600;
    text-align: center;
    align-items: center;
`;
const Button_Report = styled(Button)`
	position: absolute;
	width: 320px;
	height: 72px;
	left: 20px;
	top: 300px;

	background: #2D2D2D;
	border-radius: 7.5px;
	color: #FFFFFF;
    padding: 20px;
    font-weight: 600;
    font-size: 17.5px;
    line-height: 22px;
    font-size: 18px;
`;


const Button_Report2 = styled(Button)`
	position: absolute;
	width: 320px;
	height: 72px;
	left: 20px;
	top: 380px;

	background: #2D2D2D;
	border-radius: 7.5px;
	color: #FFFFFF;
    padding: 20px;
    font-weight: 600;
    font-size: 17.5px;
    line-height: 22px;
    font-size: 18px;
`;

const InfoBox = styled(Box)`
    position: absolute;
    width: 300px;
	left: 20px;
    top: 222px;
    background: #2D2D2D;
    border-radius: 7.5px;
    color : #C0C0C0;
    padding-top : 20px;
    padding-left : 20px;
    font-size : 17.5px;
    font-weight : 700;
`;

const TxWarning = ({ftnName}) => {
    const handleCloseWindow = () => {
        window.close(); // 현재 창을 닫는 코드
    };

    const infoBox = () => {
        return (
            <InfoBox>
                {ftnName=="SETAPPROVEALL" ?
                    <div style={{paddingBottom:"10px"}}>
                        {"setApproveAll 내 지갑의 모든 자산이 빼앗길 수 있어요!"}
                    </div> 
                : ftnName=="APPROVE" ?
                    <div style={{paddingBottom:"10px"}}>
                        {"Approve 내 지갑의 일부 자산이 빼앗길 수 있어요!"}
                    </div>
                    : <div/>
                }
            </InfoBox>
        )
    }

    return (
        <div>
        <BackgroundBox>
            <SelectButton />
            <TextBox>
                사기 거래 의심!
                <br />
                주의가 필요해요.
            </TextBox>
            <div style={{position: "absolute", left: "50%", top: "85px", fontSize: "70px", transform: "translate(-50%, -50%)"}}>🚨</div>
            {infoBox()}
            <Button_Report component={Link} to="/report">
                <span style={{color : "#DF4C0D", paddingRight: "5px"}}>{"신고"}</span>
                {"등록 하기"}
            </Button_Report>
            <Button_Report2 onClick={handleCloseWindow} >
                {"확인 했어요."}
            </Button_Report2>
        </BackgroundBox>
        </div>
        );
};

export default TxWarning;
