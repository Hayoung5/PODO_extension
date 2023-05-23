/*global chrome*/

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Stack, TextField, Button, Avatar, Box } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import * as serverAPI from '../APIs/serverAPI';
import { styled } from '@mui/system';
import { convertUnixTime, shortenEthereumAddress, shortenEthereumAddress2 } from "../utils/utils";
import { getLogs, deleteReport } from "../APIs/serverAPI";
import { getHash } from "../utils/utils";

const InfoBox = styled(Box)`
    position: absolute;
    width: 300px;
    height: 60px;
	left: 20px;
    top: 30px;
    background: #2D2D2D;
    border-radius: 7.5px;
    color : #C0C0C0;
    padding-top : 20px;
    padding-left : 20px;
    font-size : 16px;
    font-weight : 700;
`;

const BackgroundBox = styled(Box)`
	position: absolute;
	width: 360px;
	height: 470px;
	left: 0px;
	top: 60px;
	/* Back_Phantom */
	background: #282626;
`;



const ModalBox = styled(Box)`
    position: absolute;
    width: 320px;
    max-height: 200px;
    top: 170px;
	left: 20px;
    background: #2D2D2D;
    border-radius: 7.5px;
    color : #C0C0C0;
    overflow-y: scroll;
    font-size : 15px;
    font-weight : 500;

    /* Hide the scrollbar */

    &::-webkit-scrollbar {
        width: 0
    }
`;

const CardBox = styled(Box)`
    background : #323232;
    margin-top: 20px;
    margin-bottom: 20px;
    color : #C0C0C0;
    padding-left : 20px;

`;

const Mypage = () => {
    const [connectedAdd, setConnectedAdd] = useState();
    const [reportHistory, setReportHistory] = useState([]);
    const [renderKey, setRenderKey] = useState('');
    const navigate = useNavigate();

    const handleDelete = async (el, event) => {
        event.preventDefault(); // Prevent the default behavior of the click event
        if (window.confirm("등록한 신고를 삭제 하시겠습니까?")) {
            const hash = getHash(el);
            const res = await deleteReport(hash);
            console.log(res);
            if (res.status == 200){
                alert("신고를 삭제 하였습니다.");
                setRenderKey(Date.now().toString());
            }
        }
    }
    
	useEffect(() => {
        const fetchData = async () => {

            const getStoredData = await new Promise((resolve) => {
                chrome.storage.local.get("connectedAdd", (result) => {
                    resolve(result.connectedAdd);
                });
            });
    
            if (getStoredData) {
                setConnectedAdd(getStoredData);
                const result = await getLogs(getStoredData);
                console.log(result);
                setReportHistory(result.reportHistory);
            } else {
                alert("먼저 메타마스크와 연결해주세요!");
                navigate(`/`);
            }
        }

        fetchData();
        
	}, [renderKey]);

	return (
        <div>
            <BackgroundBox>
                <Stack key={renderKey}>
                    <InfoBox>
                        <div style={{paddingBottom:"10px"}}>
                            {`연결된 계정 : ${shortenEthereumAddress2(connectedAdd)}`}
                        </div>
                        <div style={{paddingBottom:"5px"}}>
                            {`등록한 신고 : ${reportHistory.length}회`}
                        </div>
                        
                    </InfoBox>
                    <div style={{ color : "#C0C0C0", paddingTop : "140px", paddingLeft : "25px", fontSize : "16px", fontWeight : 700,}}>
                        {"신고 내역"}
                    </div>
                    <ModalBox>
                        {reportHistory ? 
                            reportHistory.map((el, i) => {
                                const content = el.content;
                                console.log(content);
                                return (
                                    <CardBox>
                                        <div>
                                            {` # ${i+1}`}
                                            <Button 
                                                onClick={(event) => handleDelete(el, event)} 
                                                style={{paddingLeft:"180px", color: "#fc6900"}}
                                            >
                                                {"신고 삭제"}
                                            </Button>
                                        </div>
                                        <div>
                                            {`• 신고한 계정 : ${shortenEthereumAddress(el.address)}`}
                                        </div>
                                        <div>
                                            {`• 내용 : ${el.content}`}
                                        </div>
                                        <div>
                                            {`• 접수 일자 : ${convertUnixTime(el.timestamp)}`}
                                        </div>
                                    </CardBox>
                                )
                            })
                            :<div/>
                        }
                    </ModalBox>
                </Stack>
            </BackgroundBox>
        </div>
	);
};

export default Mypage;