import React from "react";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { styled } from '@mui/system';
import Typography from '@mui/material/Typography';
import { convertUnixTime, shortenEthereumAddress } from "../utils/utils";

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

export default function HistoryModal({open, setOpen, reportHistory}) {
  const handleClose = () => setOpen(false);

  return (
    <div>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
            backdrop: {
                timeout: 500,
            },
            }}
        >
            <Fade in={open}>
            <ModalBox>
            {reportHistory.map((el, i) => {
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
            })}
            </ModalBox>
            </Fade>
        </Modal>
    </div>
  );
}
