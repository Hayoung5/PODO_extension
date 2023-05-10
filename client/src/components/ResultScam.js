import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { styled } from '@mui/system';
import { Stack, TextField, Button, Avatar, Box } from "@mui/material";
import * as serverAPI from '../APIs/serverAPI';
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
    font-size: 15px;
    display: flex;
    align-items: center;
    text-align: center; 
`;

const TextBox = styled(Box)`
    position: absolute;
    left: 50%;
    top: 200px;
    transform: translate(-50%, -50%);
    color: #C80505;
    font-size: 25px;
    display: flex;
    font-weight: 600;
    align-items: center;
    text-align: center; 
`;

const Button_Home = styled(Button)`
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

    &:hover {
        background-color: #101010;
    }
`;


const ResultScam = ({inputValue}) => {
  return (
    <div>
    <BackgroundBox>
        <TextBox1>
            {inputValue}
        </TextBox1>
        <TextBox>
        <br />
            위험!
        </TextBox>
        <div style={{position: "absolute", left: "50%", top: "85px", fontSize: "70px", transform: "translate(-50%, -50%)"}}>🚨</div>
        <Button_Home component={Link} to="/*">
            {"홈으로 돌아가기"}
        </Button_Home>
    </BackgroundBox>
    </div>
    );
};

export default ResultScam;
