import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { styled } from '@mui/system';
import { Stack, TextField, Button, Avatar, Box, Tooltip } from "@mui/material";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import normalIcon from "../assets/normal.png";
import { shortenEthereumAddress } from "../utils/utils";
import { BackgroundBox, StyledHelpOutlineIcon, ReportButton  } from '../styles/style';
import '../styles/styles.css';

const TextBox = styled(Box)`
    position: absolute;
    left: 50%;
    top: 160px;
    transform: translate(-50%, -50%);
    color: #009632;
    font-size: 30px;
    display: flex;
    font-weight: 600;
    align-items: center;
    text-align: center;
    white-space: pre-line;
`;

const TextBox2 = styled(Box)`
    width: 100%;
    margin-top: 180px;
    color: #C0C0C0;
    font-weight: 700;
    font-size: 18px;
    display: flex;
    align-items: center;
    text-align: center; 
    justify-content: center;
`;

const TextBox1 = styled(Box)`
    width: 80%;
    padding-left: 10%;
    padding-right: 10%;
    margin-top: 0px;
    color: #C0C0C0;
    font-weight: 700;
    font-size: 23px;
    display: flex;
    align-items: center;
    text-align: center; 
    justify-content: center;
`;



const InfoBox = styled(Box)`
    position: absolute;
    width: 300px;
	left: 20px;
    top: 250px;
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
            </TextBox>
            <TextBox2>
                {isURL && isWhited ? 
                <span>
                    {`\n ✅ ${description}`}
                </span> : <div/>
                }
            </TextBox2>
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
            <ReportButton top={360} />
        </BackgroundBox>
        </div>
    );
};

export default ResultNormal;