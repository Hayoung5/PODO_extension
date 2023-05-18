
import React, { useEffect, useState } from "react";
import ResultNormal from "../components/ResultNormal";
import ResultWarning from "../components/ResultWarning";
import ResultScam from "../components/ResultScam";
import { searchAccount, searchDomain } from "../APIs/serverAPI";
import { returnDomain } from "../utils/utils";
import Loading from "./Loading";


const SearchResult = ({inputValue, isURL}) => {
    const [risk, setRisk] = useState("");
    const [reportCount, setReportCount] = useState("");
    const [damageAmount, setDamageAmount] = useState("");
    const [reportHistory, setReportHistory] = useState([]);
    const [isContract , setIsContract] = useState("");
    const [isVerified , setIsVerified] = useState("");
    const [isBlacked, setIsBlacked] = useState("");
    const [isWhited, setIsWhited] = useState("");
    const [description, setDescription] = useState();


    const getResult = async() => {
        // serverAPI 작성
        // url, address에 따라 get 요청
        // 결과에 따른 page 보여주기
        if (inputValue && !isURL) {
            try {
                const res = await searchAccount(inputValue);
                if (res.status == 200) {
                    const result = res.data;
                    setRisk(result.risk);
                    setReportCount(result.reportCount);
                    setDamageAmount(result.damageAmount);
                    setReportHistory(result.reportHistory);
                    setIsContract(result.isContract);
                    setIsVerified(result.isVerified);
                } else {
                    alert(res);
                }
            } catch (error) {
                alert(error);
            }
        } else if (inputValue && isURL) {
            try {
                const res = await searchDomain(returnDomain(inputValue));
                if (res.status == 200) {
                    const result = res.data;
                    setRisk(result.risk);
                    setReportCount(result.reportCount);
                    setReportHistory(result.reportHistory);
                    setIsBlacked(result.blackListed);
                    setIsWhited(result.whiteListed);
                    setDescription(result.description);
                } else {
                    alert(res);
                }
            } catch (error) {
                alert(error);
            }
        }
    }

    useEffect(() => {
        getResult();
	}, [risk]);

    const result = {
        risk : risk,
        reportCount : reportCount,
        damageAmount : damageAmount,
        reportHistory : reportHistory,
        isContract : isContract,
        isVerified : isVerified,
        isBlacked : isBlacked,
        isWhited : isWhited,
        description : description,
    }

    // test용 함수
    const returnPage = (val) => {
        if (val === 0 || val == 1) {
            return (<ResultNormal 
                inputValue={inputValue}
                isURL={isURL}
                result={result}
                />)
        } else if (val === 2) {
            return (<ResultWarning 
                inputValue={inputValue}
                isURL={isURL}
                result={result}
                />)
        } else if (val === 3) {
            return (<ResultScam 
                inputValue={inputValue}
                isURL={isURL}
                result={result}
                />)
        }
    }

	return (
        <div>
            {risk === "" ?
            <Loading guideText={"신고내역을 검색 중입니다."}/>
            : returnPage(risk)}
        </div>
	);
};

export default SearchResult;