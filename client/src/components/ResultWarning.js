import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from '@mui/system';
import { Stack, TextField, Button, Avatar, Box } from "@mui/material";
import warningIcon from "../assets/warning.png";
import { shortenEthereumAddress } from "../utils/utils";
import HistoryModal from "./HistoryModal";
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
    top: 200px;
    transform: translate(-50%, -50%);
    color: #FFFFFF;
    font-size: 25px;
    display: flex;
    font-weight: 600;
    flex-direction: column;
    align-items: center;
    text-align: center; 
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
    top: 252px;
    background: #2D2D2D;
    border-radius: 7.5px;
    color : #C0C0C0;
    padding-top : 20px;
    padding-left : 20px;
    font-size : 17.5px;
    font-weight : 700;
`;

const Modal_Button = styled(Box)`
    background-color: rgba(255, 0, 0, 0.0);
    color : #FFD732;
    text-decoration: underline;
    font-size : 17.5px;
    font-weight : 700;
    display: inline-block;
`;


const ResultWarning = ({inputValue, isURL, result}) => {
    const {risk, reportCount, damageAmount, reportHistory, isContract, isVerified, isBlacked} = result;

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);

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
                    : <div/>
                }

                <div style={{paddingBottom:"20px"}}>
                    {
                        reportCount === 0
                        ? "• 등록된 피해 사례가 없습니다."
                        : <div>
                            <span>{"• "}</span>
                            <Modal_Button onClick={handleOpen}>
                                {`피해 사례가 ${reportCount}회 접수`}
                            </Modal_Button>
                            <span>{" 되었습니다."}</span>
                        </div>
                    }
                </div>
            </InfoBox>
        )
    }

    return (
        <div>
        <BackgroundBox>
            <SelectButton />
            <HistoryModal open={open} setOpen={setOpen} reportHistory={reportHistory} />
            <TextBox1>
                {!isURL ? shortenEthereumAddress(inputValue) : inputValue}
            </TextBox1>
            <TextBox>
                <br />
                <a style={{color : "#FFE800", paddingRight: "5px"}}>주의 필요</a>
            </TextBox>
                <img
                src={warningIcon}
                alt="Normal"
                style={{
                position: "absolute",
                left: "50%",
                top: "85px",
                transform: "translate(-50%, -50%)",
                }}
            />
            {infoBox()}
            <Button_Report component={Link} to="/report">
                <span style={{color : "#DF4C0D", paddingRight: "5px"}}>{"피해 사례"}</span>
                {"등록 하기"}
            </Button_Report>
        </BackgroundBox>
        </div>
    );
};

export default ResultWarning;
