
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/system';

const BackgroundBox = styled(Box)`
	position: absolute;
	width: 360px;
	height: 470px;
	left: 0px;
	top: 60px;
	background: #202020;
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
            <BackgroundBox>
                <div>{guideText}</div>
                <div style={{paddingTop : "20px"}}>
                    <CircularProgress />
                </div>
            </BackgroundBox>
        </div>
	);
};

export default Loading;