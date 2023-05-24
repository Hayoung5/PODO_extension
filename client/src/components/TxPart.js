import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { styled } from '@mui/system';
import { Stack, TextField, Button, Avatar, Box } from "@mui/material";
import '../styles/styles.css';

const TextBox = styled(Box)`
    padding-left : 10px;
    padding-bottom : 10px;
    font-size: 18px;
    font-weight: 600;
    white-space: pre-line;
`;

const InfoBox = styled(Box)`
    width: 300px;
    background: #2D2D2D;
    border-radius: 7.5px;
    color : #C0C0C0;
    padding-top : 10px;
    padding-left : 20px;
    margin-bottom: 20px;
    font-size : 16px;
    font-weight : 700;
`;

const TxPart = ({result}) => {
    const {risk, reportCount,inputValue,txInfo, damageAmount, reportHistory, isContract, isVerified, isBlacked, isWhited, description} = result;

    const handleCloseWindow = () => {
        window.close(); // 현재 창을 닫는 코드
    };

    const evaluation = () => {
        if (risk == 0 || risk == 1){
            return (
                <span style={{color : "#009632"}}> 피해 없음</span>
            )
        } else if (risk == 2) {
            return (
                <span style={{color : "#FFE800"}}> 주의 필요</span>
            )
        } else if (risk == 3) {
            return (
                <span style={{color : "#FFE800"}}> 위험!</span>
            )
        }
    }

    const infoBox = () => {
        return (
            <InfoBox>
                {txInfo=="SETAPPROVEFORALL" ?
                    <div>
                        <div style={{paddingBottom: "10px"}}>
                            {"• setApproveForAll 함수를 호출해요."}
                        </div>
                        <div style={{paddingBottom: "10px"}}>
                            {"• 상대가 나의 NFT를 이체할 수 있어요."}
                        </div> 
                        <div style={{paddingBottom: "10px"}}>
                            {"• 신뢰할 수 있는 주소인지 확인하세요."}
                        </div> 
                    </div>


                : txInfo=="APPROVE" ?
                    <div>
                        <div style={{paddingBottom: "10px"}}>
                            {"• setApprove 함수를 호출해요."}
                        </div>
                        <div style={{paddingBottom: "10px"}}>
                            {"• 상대가 나의 자산을 이체할 수 있어요."}
                        </div> 
                        <div style={{paddingBottom: "10px"}}>
                            {"• 신뢰할 수 있는 주소인지 확인하세요."}
                        </div> 
                    </div>
                    : <div/>
                }
            </InfoBox>
        )
    }

    return (
        <div>
            {txInfo ?
                <Stack style={{paddingLeft: "20px"}}>
                    <TextBox>
                        <span style={{color : "#C0C0C0"}}>
                            보내는 트랜잭션 : 
                        </span>
                        {evaluation()}
                    </TextBox>
                    {infoBox()}
                </Stack>
                : <div/>
            }

        </div>
        );
};

export default TxPart;
