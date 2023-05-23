import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { styled } from '@mui/system';
import { Stack, TextField, Button, Avatar, Box } from "@mui/material";
import HistoryModal from "./HistoryModal";
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
    margin-bottom : 20px;
    font-size : 16px;
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


const DomainPart = ({inputValue, result}) => {
    const {risk, reportCount, damageAmount, reportHistory, isContract, isVerified, isBlacked, isWhited, description} = result;

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);

    const evaluation = () => {
        if (risk == 0 || risk == 1){
            return (
                <span style={{color : "#00FF57"}}> 피해 없음</span>
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
        if (risk == 0 || risk == 1){
            return (
                <div>
                    {
                        isWhited ?
                        <div style={{paddingBottom:"5px"}}>
                            {`• 안전한 사이트 입니다. (${description} ✅)`}
                        </div>
                        : <div/>
                    }
                    <div style={{paddingBottom:"10px"}}>
                        {"• 등록된 피해 사례가 없습니다."}
                    </div>
                </div>
            )
        } else if (risk == 2) {
            return (
                <div>
                    {damageAmount ? 
                        <div style={{paddingBottom:"10px"}}>{`• 파악된 피해 금액 : ${parseFloat(damageAmount).toFixed(4)} 이더`}</div>
                        : <div/>
                    }
                    <span>{"• "}</span>
                    <Modal_Button onClick={handleOpen}>
                        {`피해 사례가 ${reportCount}회 접수`}
                    </Modal_Button>
                    <span>{" 되었습니다."}</span>
                </div>
            )
        } else if (risk == 3) {
            <div>
                {isBlacked ?
                    <div style={{paddingBottom:"10px"}}>
                        {"• "}
                        <span style={{color:"#C80505"}}>{"블랙 리스트로 등록된 사이트"}</span>
                        {" 입니다."}
                    </div>
                    : <div/>
                }
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
        }

    }

    return (
        <div>
            <HistoryModal open={open} setOpen={setOpen} reportHistory={reportHistory} />
            <Stack style={{paddingLeft: "20px"}}>
                <TextBox>
                    <span style={{color : "#C0C0C0"}}>
                        연결한 사이트 : 
                    </span>
                    {evaluation()}
                </TextBox>
                <InfoBox>
                    <div style={{paddingBottom:"5px"}}>
                        {`• 검색 주소 : ${inputValue}`}
                    </div>
                    {infoBox()}
                </InfoBox>
            </Stack>
        </div>
    );
};

export default DomainPart;
