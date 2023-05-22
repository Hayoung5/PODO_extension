/*global chrome*/

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Stack, TextField, Button, Avatar, Box } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import * as serverAPI from '../APIs/serverAPI';
import { styled } from '@mui/system';
import { convertUnixTime, shortenEthereumAddress } from "../utils/utils";
import { getLogs } from "../APIs/serverAPI";

const BackgroundBox = styled(Box)`
	position: absolute;
	width: 360px;
	height: 470px;
	left: 0px;
	top: 60px;
	/* Back_Phantom */
	background: #202020;
`;

const InfoBox = styled(Box)`
    position: absolute;
    width: 300px;
	left: 20px;
    top: 252px;
    background: #2D2D2D;
    border-radius: 7.5px;
    color : #C0C0C0;
    padding-left : 20px;
    font-size : 17.5px;
    font-weight : 700;
`;

const ModalBox = styled(Box)`
    position: absolute;
    width: 220px;
    height: 180px;
    top: 25%;
    left : 5%;
    background: #2D2D2D;
    border-radius: 7.5px;
    color : #C0C0C0;
    overflow: scroll;
    font-size : 15px;
    font-weight : 500;
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
    const navigate = useNavigate();
    
	useEffect(async() => {
        chrome.storage.local.get("connectedAdd", async(res) => {
            if(res.connectedAdd){
                console.log(res.connectedAdd);
                setConnectedAdd(res.connectedAdd);
                const result = await getLogs(res.connectedAdd);
                console.log(result);
                setReportHistory(result.reportHistory);
            } else {
                alert("먼저 메타마스크와 연결해주세요!");
                navigate(`/`);
            }
		});
        
	}, []);

	return (
        <div>
            <BackgroundBox>
                <InfoBox>
                    {`연결된 주소 : ${connectedAdd}`}
                </InfoBox>
                <ModalBox>
                    {reportHistory ? 
                        reportHistory.map((el, i) => {
                            const content = el.content;
                            console.log(content);
                            return (
                                <CardBox>
                                    <div>
                                        {` # ${i+1}`}
                                    </div>
                                    <div>
                                        {`• 내용 : ${el.content}`}
                                    </div>
                                    <div>
                                        {`• 신고자 : ${shortenEthereumAddress(el.reporter)}`}
                                    </div>
                                    <div>
                                        {`• 접수일자 : ${convertUnixTime(el.timestamp)}`}
                                    </div>
                                </CardBox>
                            )
                        })
                        :<div/>
                    }
                </ModalBox>
            </BackgroundBox>
        </div>
	);
};

export default Mypage;