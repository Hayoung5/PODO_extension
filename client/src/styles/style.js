import React from 'react';
import { Link } from 'react-router-dom';
import { Stack, Typography, Button, Avatar, Box } from '@mui/material';
import { styled } from '@mui/system';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


export const BackgroundBox = styled(Box)`
	position: absolute;
	width: 360px;
    height: 470px;
	left: 0px;
	top: 60px;
	background: #282626;
	overflow-y: scroll;
    /* Hide the scrollbar */

    &::-webkit-scrollbar {
        width: 0
    }
`;
