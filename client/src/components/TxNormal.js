/*global chrome*/

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { styled } from '@mui/system';
import { Stack, TextField, Button, Avatar, Box } from "@mui/material";
import normalIcon from "../assets/normal.png";
import { shortenEthereumAddress } from "../utils/utils";
import SelectButton from "./SelectButton";
import '../styles/styles.css';

const BackgroundBox = styled(Box)`
	position: absolute;
	width: 360px;
	height: 470px;
	left: 0px;
	top: 60px;
	background: #202020;
`;

const TextBox1 = styled(Box)`
    position: absolute;
    left: 50%;
    top: 160px;
    transform: translate(-50%, -50%);
    color: #FFFFFF;
    font-weight: 700;
    font-size: 25px;
    display: flex;
    align-items: center;
    text-align: center; 
`;

const TextBox = styled(Box)`
    position: absolute;
    left: 50%;
    top: 210px;
    transform: translate(-50%, -50%);
    color: #00FF57;
    font-size: 25px;
    font-weight: 600;
    align-items: center;
    text-align: center;
    white-space: pre-line;
`;


const Button_Report = styled(Button)`
	position: absolute;
	width: 320px;
	height: 72px;
	left: 20px;
	top: 320px;

	background: #2D2D2D;
	border-radius: 7.5px;
	color: #FFFFFF;
    padding: 20px;
    font-weight: 600;
    font-size: 17.5px;
    line-height: 22px;
    font-size: 18px;
`;



const TxNormal = () => {
    useEffect(() => {
    }, []);

    const handleCloseWindow = () => {
        window.close(); // 현재 창을 닫는 코드
    };

    return (
        <div>
        <BackgroundBox>
            <SelectButton />
            <TextBox>
                거래에서 이상한점을 찾지 못했어요.
            </TextBox>
            <img
                src={normalIcon}
                alt="Normal"
                style={{
                position: "absolute",
                left: "50%",
                top: "85px",
                width: 85,
                transform: "translate(-50%, -50%)",
                }}
            />
            <Button_Report onClick={handleCloseWindow} >
                {"확인 했어요."}
            </Button_Report>
        </BackgroundBox>
        </div>
    );
};

export default TxNormal;
