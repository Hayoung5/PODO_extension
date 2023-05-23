/*global chrome*/

import React, { useEffect, useState } from "react";
import { searchDomain } from "../APIs/serverAPI";
import { Box, Stack, Button } from "@mui/material";
import { styled } from '@mui/system';
import { Link } from "react-router-dom";
import Loading from "./Loading";
import { examineTx } from "../APIs/serverAPI";
import EmojiPart from "../components/EmojiPart";
import DomainPart from "../components/DomainPart";
import AccountPart from "../components/AccountPart";
import TxPart from "../components/TxPart";

const BackgroundBox = styled(Box)`
	position: absolute;
	width: 360px;
	height: 470px;
	left: 0px;
	top: 60px;
	background: #503030;
    overflow-y: scroll;
    /* Hide the scrollbar */

    &::-webkit-scrollbar {
        width: 0
    }
`;

const Button_Report = styled(Button)`
	width: 240px;
	height: 30px;
    margin-left: 18%;
	/* Button_Phantom */

	background: #2D2D2D;
	border-radius: 8px;
	color: #C0C0C0;
    padding: 20px;
    font-weight: 600;
    font-size: 18px;
`;

const ExamineTx = () => {
    const [domain, setDomain] = useState("");
    const [totalRisk, setTotalRisk] = useState();
    const [domainRisk, setDomainRisk] = useState("");
    const [txRisk, setTxRisk] = useState("");

	useEffect(() => {

        const fetchData = async () => {
            // const result = [
            //     {
            //         reportCount : 0,
            //         risk: 1,
            //         reportHistory:[],
            //     },
            //     {
            //         damageAmount : 0,
            //         inputValue : "0x8ed624f6594c3f5764f2f415262352ca812851ba",
            //         isContract : false,
            //         reportCount: 0,
            //         reportHistory : [],
            //         risk : 3,
            //         txInfo : "APPROVE",
            //         txReportCount : 0,
            //     }
            // ];
            // setDomainRisk(result[0]);
            // setTxRisk(result[1]);
            // setDomain("https:remix.ide/");


            const result = [];
            const locationData = await new Promise((resolve) => {
                chrome.storage.local.get("location", (result) => {
                    resolve(result.location);
                });
            });
    
            const msgData = await new Promise((resolve) => {
                chrome.storage.local.get("msg", (result) => {
                    resolve(result.msg);
                });
            });
    
            if (locationData) {
                setDomain(locationData);
                const domainResult = await searchDomain(locationData);
                setDomainRisk(domainResult.data);
                result[0] = domainResult.data;
            }
    
            if (msgData) {
                const txResult = await examineTx(msgData);
                setTxRisk(txResult.risk);
                result[1] = txResult.risk
            }
            return (result);
        };

        fetchData().then((res) => {
            console.log(res);
            const domainrisk = res[0];
            const txrisk = res[1];

            if (domainrisk !== "" && txrisk !== "") {
                console.log(domainrisk.risk, txrisk.risk);
                if (domainrisk.risk < 2 && txrisk.risk < 2) {
                    setTotalRisk(1);
                    console.log("total is 1");
                } else if (domainrisk.risk == 2 || txrisk.risk == 2) {
                    setTotalRisk(2);
                    console.log("total is 2");
                } else if (domainrisk.risk == 3 || txrisk.risk == 3) {
                    setTotalRisk(3);
                    console.log("total is 3");
                }
                
            }
        });

        
	}, []);



	return (
        <div>
            {totalRisk ?
                <BackgroundBox>
                    <Stack style={{paddingTop:"200px", paddingBottom:"30px"}}>
                        <EmojiPart risk={totalRisk} />
                        <DomainPart inputValue={domain} result={domainRisk}/>
                        <AccountPart result={txRisk} />
                        <TxPart result={txRisk} />
                        <Button_Report component={Link} to="/report" variant="body2">
                            <span style={{color : "#DF4C0D", paddingRight: "5px"}}>{"피해 사례"}</span>
                            {"신고하기"}
                        </Button_Report>
                    </Stack>
                </BackgroundBox>
                : 
                <Loading guideText={"거래를 분석 중입니다."}/>
            }
        </div>
	);
};

export default ExamineTx;