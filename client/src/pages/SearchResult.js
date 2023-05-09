
import React, { useEffect, useState } from "react";
import ResultNormal from "../components/ResultNormal";
import ResultWarning from "../components/ResultWarning";
import ResultScam from "../components/ResultScam";

const SearchResult = ({inputValue, isURL}) => {

    const getResult = async() => {
        // serverAPI 작성
        // url, address에 따라 get 요청
        // 결과에 따른 page 보여주기
    }

    // test용 함수
    const getResult2 = (val) => {
        if (val === 1) {
            return (<ResultNormal inputValue={inputValue} />)
        } else if (val === 2) {
            return (<ResultWarning inputValue={inputValue} />)
        } else if (val === 3) {
            return (<ResultScam inputValue={inputValue} />)
        }
    }

	return (
        <div>
            {getResult2(3)}
        </div>
	);
};

export default SearchResult;