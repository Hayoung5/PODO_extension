import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { styled } from '@mui/system';
import { Stack, TextField, Button, Avatar, Box, Tooltip } from "@mui/material";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { shortenEthereumAddress } from "../utils/utils";
import HistoryModal from "./HistoryModal";
import { BackgroundBox, StyledHelpOutlineIcon, ReportButton  } from '../styles/style';
import '../styles/styles.css';

const TextBox = styled(Box)`
    position: absolute;
    left: 50%;
    top: 170px;
    transform: translate(-50%, -50%);
    color: #FFFFFF;
    font-size: 30px;
    display: flex;
    font-weight: 600;
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
    color : #C80505;
    text-decoration: underline;
    font-size : 17.5px;
    font-weight : 700;
    display: inline-block;
`;

const ResultScam = ({inputValue, isURL, result}) => {
    const {risk, reportCount, damageAmount, reportHistory, isContract, isVerified, isBlacked, isWhited} = result;

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    console.log(inputValue,isURL);

    const infoBox = () => {
        return (
            <InfoBox>
                {!isURL ?
                    <div style={{paddingBottom:"10px"}}>
                        {
                            isContract === true && isVerified === false
                            ? <>
                                {"• 검증 받지 않은 컨트랙트 입니다."}
                                <Tooltip title="Example" arrow>
                                    <StyledHelpOutlineIcon style={{ verticalAlign: 'middle', paddingLeft:"10px"}}/>
                                </Tooltip>
                            </>
                            : isContract === true && isVerified === true
                            ? <>
                                {"• 검증 받은 컨트랙트 주소 입니다."}
                                <Tooltip title="Example" arrow>
                                    <StyledHelpOutlineIcon style={{ verticalAlign: 'middle', paddingLeft:"10px"}}/>
                                </Tooltip>
                            </>
                            : isContract === false 
                            ? <>
                                {"• 검증 받은 컨트랙트 주소 입니다."}
                                <Tooltip title="Example" arrow>
                                    <StyledHelpOutlineIcon style={{ verticalAlign: 'middle' }}/>
                                </Tooltip>
                            </>
                            : ""
                        }
                    </div>

                    : isURL && isBlacked ?
                    <div style={{paddingBottom:"10px"}}>
                        {"• "}
                        <span style={{color:"#C80505"}}>{"블랙 리스트로 등록된 사이트"}</span>
                        {" 입니다."}
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
        <BackgroundBox style={{backgroun: "#"}}>
            <HistoryModal open={open} setOpen={setOpen} reportHistory={reportHistory} />
            <TextBox>
                위험!
            </TextBox>
            <TextBox1>
                {!isURL ? shortenEthereumAddress(inputValue) : inputValue}
                <Tooltip title={
                        <React.Fragment>
                            거래 시 피해를 입을 수 있어요!
                            <br/>
                            2회 이상 피해 신고를 받았거나, PODO의 블랙 리스트에 등록되어 있는 계정이에요. 
                        </React.Fragment>
                    }>
                    <StyledHelpOutlineIcon style={{ verticalAlign: 'middle', marginLeft: '8px' }}/>
                </Tooltip>
            </TextBox1>

            <div style={{position: "absolute", left: "50%", top: "85px", fontSize: "70px", transform: "translate(-50%, -50%)"}}>🚨</div>
            {infoBox()}
            <ReportButton top={380} />
        </BackgroundBox>
        </div>
        );
};

export default ResultScam;
