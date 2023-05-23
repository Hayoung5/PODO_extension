import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { styled } from '@mui/system';
import { Stack, TextField, Button, Avatar, Box, Tooltip } from "@mui/material";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import normalIcon from "../assets/normal.png";
import { shortenEthereumAddress } from "../utils/utils";
import '../styles/styles.css';

const BackgroundBox = styled(Box)`
	position: absolute;
	width: 360px;
	height: 470px;
	left: 0px;
	top: 60px;
	background: #2D2626;
`;

const TextBox = styled(Box)`
    position: absolute;
    left: 50%;
    top: 160px;
    transform: translate(-50%, -50%);
    color: #46BD7B;
    font-size: 30px;
    display: flex;
    font-weight: 600;
    align-items: center;
    text-align: center;
    white-space: pre-line;
`;

const TextBox1 = styled(Box)`
    position: absolute;
    left: 50%;
    top: 200px;
    transform: translate(-50%, -50%);
    color: #C0C0C0;
    font-weight: 700;
    font-size: 24px;
    display: flex;
    align-items: center;
    text-align: center; 
`;

const StyledHelpOutlineIcon = styled(HelpOutlineIcon)`
    font-size: 16px;
    margin-left: 10px;
`;

const Button_Report = styled(Button)`
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
    top: 235px;
    background: #2D2D2D;
    border-radius: 7.5px;
    color : #C0C0C0;
    padding-top : 20px;
    padding-left : 20px;
    font-size : 17.5px;
    font-weight : 700;
`;


const ResultNormal = ({inputValue, isURL, result}) => {
    const {risk, reportCount, damageAmount, reportHistory, isContract, isVerified, isBlacked, isWhited, description} = result;
    console.log(isContract, isVerified, isBlacked, isWhited, description);

    const infoBox = () => {
        return (
            <InfoBox>
                {!isURL ?
                    <div style={{paddingBottom:"10px"}}>
                        {
                            isContract === true && isVerified === false
                            ? "• 검증 받지 않은 컨트랙트 입니다." 
                            : isContract === true && isVerified === true
                            ? "• 검증 받은 컨트랙트 주소 입니다." 
                            : isContract === false 
                            ? "• EOA 계정 주소 입니다."
                            : ""
                        }
                    </div> 
                    : isURL && isWhited ?
                    <div style={{paddingBottom:"10px"}}>
                        {"• 안전한 사이트 입니다"}
                    </div>
                    : <div/>
                }
                <div style={{paddingBottom:"20px"}}>
                    {"• 등록된 피해 사례가 없습니다."}
                </div>
            </InfoBox>
        )
    }

    return (
        <div>
        <BackgroundBox>
            <TextBox>
                <span>
                    피해 없음
                </span>
                
                {isURL && isWhited ? 
                <span style={{fontSize : "20px"}}>
                    {`\n ✅ ${description}`}
                </span> : <div/>
                }
            </TextBox>
            <TextBox1>
                {!isURL ? shortenEthereumAddress(inputValue) : inputValue}
                <Tooltip title={
                        <React.Fragment>
                            등록된 피해 사례가 없어요.
                            <br/>
                            화이트리스트에 없는 경우 항상 주의하세요!
                        </React.Fragment>
                    }>
                    <StyledHelpOutlineIcon style={{ verticalAlign: 'middle', marginLeft: '8px' }}/>
                </Tooltip>

            </TextBox1>
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
            {infoBox()}
            <Button_Report component={Link} to="/report">
                <span style={{color : "#DF4C0D", paddingRight: "5px"}}>{"피해 사례"}</span>
                {"신고하기"}
            </Button_Report>
        </BackgroundBox>
        </div>
    );
};

export default ResultNormal;