import React, {useEffect, useRef, useState} from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { deleteBtn, modalStyle, modalZIndex } from "./styles/mui";
import { collection, doc, onSnapshot, deleteDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import { motion } from "framer-motion";
import { modalIn } from "./helpers/helper";

export default function DeleteDocModal({
    open,
    setOpen,
}) {

    const collectionRef = collection(db, 'docs')
    const handleClose = () => setOpen(false);
    const [documentTitle, setDocumentTitle] = useState('')

    let params = useParams()
    const isMounted = useRef()
    const navigate = useNavigate()

    useEffect(() => {
        if(isMounted.current){
            return
        }
        isMounted.current = true;
        
        getData()
    })

    const close = event => {
        event.preventDefault();
        handleClose()
    }

     const getData = () => {
        const document = doc(collectionRef, params.id) 
        onSnapshot(document, (docs) => {
            setDocumentTitle(docs.data().title)
        })
    }
    
    const deleteData = async () => {
        const document = doc(collectionRef, params.id)
        await deleteDoc(document)
        navigate("/home")
    }

    return (<>
        <div>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" sx={modalZIndex}>
                <motion.div variants={modalIn} initial="hidden" animate="show" exit="exit" className="motionModal">
                    <Box sx={modalStyle} className="grid">
                    <span className="closeBtn">
                            <IconButton color="primary" aria-label="close modal" component="span" onClick={handleClose}>
                                <CloseIcon  />
                            </IconButton>
                        </span>
                        <h4 className="deleteModalTitle">Permanently delete "{documentTitle}" ?</h4>
                        <div className="deleteModalButtons">
                            <Button sx={deleteBtn} onClick={deleteData}>Yes</Button>
                            <Button sx={deleteBtn} onClick={close}>No</Button>
                        </div>
                    </Box>
                </motion.div>
            </Modal>
        </div>
        </>);
}