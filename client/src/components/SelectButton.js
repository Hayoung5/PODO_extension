/*global chrome*/

import React, { useEffect, useState } from "react";
import { Typography, Box, AppBar, Toolbar, Button, IconButton, Avatar, Stack, Divider, Modal, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";


const SelectButton = () => {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    useEffect(() => {
		chrome.storage.local.get("msg", (res) => {
			console.log(res.msg);
            if(res.msg){
				setVisible(true);
			};
		});
	}, []);

    return (
        <div>
        {
            visible ? 
            <div style={{display:"flex", justifyContent: "center"}}>
                <Button onClick={()=>{navigate(`/tx`)}} >
                    트랜잭션
                </Button>
                <Button onClick={()=>{navigate(`/address`)}} >
                    거래주소
                </Button>
                <Button onClick={()=>{navigate(`/domain`)}} >
                    웹사이트
                </Button>
            </div>
            : <div/>
        }
        </div>
    );
};

export default SelectButton;