/*global chrome*/

import React, { useEffect, useState } from "react";
import ResultNormal from "../components/ResultNormal";
import ResultWarning from "../components/ResultWarning";
import ResultScam from "../components/ResultScam";
import { searchAccount, searchDomain } from "../APIs/serverAPI";
import { returnDomain } from "../utils/utils";
import Loading from "./Loading";
import TxNormal from "../components/TxNormal";
import TxWarning from "../components/TxWarning";
import { examineTx } from "../APIs/serverAPI";


const ExamineTx = () => {
    const [risk, setRisk] = useState("");

	useEffect(() => {
        chrome.storage.local.get("location", (res) => {
            if(res.location){
                console.log(res.location);
            };
		});

        chrome.storage.local.get("msg", async(res) => {
            if(res.msg){
                const result = await examineTx(res.msg);
                setRisk(result.risk);
                console.log(result.risk);
            };
		});
        
        
	}, []);

	return (
        <div>
            {
                risk === "" ?
                <Loading guideText={"거래를 분석 중입니다."}/>
                : risk === 1 ?
                <TxNormal />
                : risk === "APPROVE" || risk === "SETAPPROVEALL" ?
                <TxWarning ftnName={risk} />
                : <div/>
            }
        </div>
	);
};

export default ExamineTx;