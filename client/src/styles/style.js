import { Stack, Typography, Button, Avatar, Box } from "@mui/material";
import { styled } from '@mui/system';

export const TestButton = styled(Button)`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 5px 15px;
    width: 132.5px;
    height: 53px;
    border-radius: 15px;
    background-color: #5660E6;
    color: #ffffff;
    &:hover {
        background-color: #5660E6CC;
    }
`;

