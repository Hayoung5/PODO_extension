
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/system';
import { BackgroundBox, MyPageButton, ReportButton } from '../styles/style';

const LoadingBackgroundBox = styled(BackgroundBox)`
    color: #FFFFFF;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 500;
`;

const Loading = ({guideText}) => {

	return (
        <div>
            <LoadingBackgroundBox>
                <div>{guideText}</div>
                <div style={{paddingTop : "20px"}}>
                    <CircularProgress />
                </div>
            </LoadingBackgroundBox>
        </div>
	);
};

export default Loading;