import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { styled } from '@mui/system';
import { Stack, TextField, Button, Avatar, Box } from "@mui/material";
import '../styles/styles.css';
import normalIcon from "../assets/normal.png";
import warningIcon from "../assets/warning.png";

const TextBox = styled(Box)`
    position: absolute;
    left: 50%;
    top: 160px;
    transform: translate(-50%, -50%);
    font-size: 25px;
    font-weight: 600;
    align-items: center;
    text-align: center;
    white-space: pre-line;
`;

const EmojiPart = ({risk}) => {

    const normal = () => {
        return (
            <div>
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
                <TextBox style={{color : "#009632"}}>피해 없음</TextBox>
            </div>
        )
    }

    const warning = () => {
        return (
            <div>
                <img
                    src={warningIcon}
                    alt="Normal"
                    style={{
                    position: "absolute",
                    left: "50%",
                    top: "85px",
                    transform: "translate(-50%, -50%)",
                }}/>
                <TextBox style={{color : "#FFE800"}}>주의 필요</TextBox>
            </div>
        )
    }

    const scam = () => {
        return (
            <div>
                <div 
                    style={{
                        position: "absolute", 
                        left: "50%", 
                        top: "85px", 
                        fontSize: "70px", 
                        transform: "translate(-50%, -50%)"
                    }}>
                        🚨
                </div>
                <TextBox style={{color : "#ffffff"}}>
                    위험!
                </TextBox>
            </div>

        )
    }

    return (
        <div>
            {risk === 1 ? 
            normal()
            : risk === 2 ?
            warning()
            : risk === 3 ?
            scam()
            : <div/>
            }
        </div>
        );
};

export default EmojiPart;
