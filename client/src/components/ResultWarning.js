import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from '@mui/system';
import { Stack, TextField, Button, Avatar, Box, Tooltip } from "@mui/material";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import warningIcon from "../assets/warning.png";
import { shortenEthereumAddress } from "../utils/utils";
import HistoryModal from "./HistoryModal";
import { BackgroundBox, StyledHelpOutlineIcon, ReportButton  } from '../styles/style';
import '../styles/styles.css';

const TextBox = styled(Box)`
    position: absolute;
    left: 50%;
    top: 150px;
    transform: translate(-50%, -50%);
    color: #FFFFFF;
    font-size: 30px;
    display: flex;
    font-weight: 600;
    flex-direction: column;
    align-items: center;
    text-align: center; 
`;

const TextBox1 = styled(Box)`
    position: absolute;
    left: 50%;
    top: 210px;
    transform: translate(-50%, -50%);
    color: #C0C0C0;
    font-weight: 700;
    font-size: 24px;
    display: flex;
    align-items: center;
    text-align: center; 
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
                            ? <>
                                {"• 검증 받지 않은 컨트랙트 입니다."}
                                <Tooltip title={`이더스캔에 verify되지 않은 컨트랙트 에요!\n
                                    신뢰성 및 안전성이 부족할 수 있습니다.`} arrow>
                                    <StyledHelpOutlineIcon style={{ verticalAlign: 'middle', paddingLeft:"10px"}}/>
                                </Tooltip>
                            </>
                            : isContract === true && isVerified === true
                            ? <>
                                {"• 검증 받은 컨트랙트 주소 입니다."}
                                <Tooltip title="이더스캔에 verify된 컨트랙트 에요." arrow>
                                    <StyledHelpOutlineIcon style={{ verticalAlign: 'middle', paddingLeft:"10px"}}/>
                                </Tooltip>
                            </>
                            : isContract === false 
                            ? <>
                                {"• EOA 주소 입니다."}
                                <Tooltip title="컨트랙트 주소가 아닌 일반적인 주소 계정이에요." arrow>
                                    <StyledHelpOutlineIcon style={{ verticalAlign: 'middle' }}/>
                                </Tooltip>
                            </>
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
                    }
                </div>
            </InfoBox>
        )
    }

    return (
        <div>
        <BackgroundBox>
            <HistoryModal open={open} setOpen={setOpen} reportHistory={reportHistory} />
            <TextBox>
                <br />
                <a style={{color : "#FFE800", paddingRight: "5px"}}>주의!</a>
            </TextBox>
            <TextBox1>
                {!isURL ? shortenEthereumAddress(inputValue) : inputValue}
                <Tooltip title={
                        <React.Fragment>
                            거래 전 주의가 필요해요!
                            <br/>
                            피해가 처음 신고되어 조사 중이거나, 컨트랙트의 내용을 검증받지 않았어요. 
                        </React.Fragment>
                    }>
                    <StyledHelpOutlineIcon style={{ verticalAlign: 'middle', marginLeft: '8px' }}/>
                </Tooltip>
            </TextBox1>

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
            <ReportButton top={380} />
        </BackgroundBox>
        </div>
    );
};

export default ResultWarning;
