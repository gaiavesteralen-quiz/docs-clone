import React from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { modalStyle, modalZIndex, accountModalPhoto } from "./styles/mui";
import { Avatar, Divider } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import { collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';

import { motion } from "framer-motion";
import { modalIn } from "./helpers/helper";

const collections = collection(db, 'users')

export default function AccountModal({
    open,
    setopen,
    email,
    username,
    photo
}) {

    const [value, loading, error] = useCollection(
        collections,
        {
          snapshotListenOptions: { includeMetadataChanges: true },
        }
    );

    const handleClose = () => setopen(false);

    return (<>
        <div>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" sx={modalZIndex}>
                <motion.div variants={modalIn} initial="hidden" animate="show" exit="exit" className="motionModal">
                    <Box sx={modalStyle} initial="hidden" animate="show">
                        <span className="flex modalHeader">
                            <h3>My account</h3>
                            <IconButton color="primary" aria-label="close modal" component="span" onClick={handleClose}>
                                <CloseIcon  />
                            </IconButton>
                        </span>
                        <div className="flex account">
                                <Avatar sx={accountModalPhoto} src={photo} alt='?????'/>
                            </div>
                            <Divider />
                        <div>
                            <div>
                                <div className="flex account">
                                    <p><strong>UserName:</strong> </p>
                                    <p>{username}</p>
                                </div>
                                <div className="flex account">
                                    <p><strong>E-Mail:</strong> </p>
                                    <p>{email}</p>
                                </div>
                            </div>
                        </div>
                    </Box>
                </motion.div>
            </Modal>
        </div>
        </>);
}