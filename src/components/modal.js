import React from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { btn, modalStyle, mdlInput, modalBtn, modalZIndex } from "./styles/mui";
import { FormControl, RadioGroup, TextField, Radio } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import { motion } from "framer-motion";
import { modalIn } from "./helpers/helper";

export default function CreateModal({
    open,
    setopen,
    title,
    setTitle,
    publicDoc,
    setPublicDoc,
    privateDoc,
    setPrivateDoc,
    addData
}) {

    const handleClose = () => setopen(false);

    const submit = event => {
        event.preventDefault();
        handleClose()
        addData()
    }

    const makePublic = async () => {
        if (privateDoc === false) return setPublicDoc(true)
    }

    const makePrivate = () => {
        if (publicDoc === false) return setPrivateDoc(true)
    }

    return (<>
        <div>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" sx={modalZIndex}>
                <motion.div variants={modalIn} initial="hidden" animate="show" exit="exit" className="motionModal">
                    <Box sx={modalStyle} initial="hidden" animate="show">
                        <span className="flex modalHeader newDocHeader">
                            <h4>New Doc🔥</h4>
                            <IconButton color="primary" aria-label="close modal" component="span" onClick={handleClose}>
                                <CloseIcon  />
                            </IconButton>
                        </span>
                        <form onSubmit={submit}>
                            <TextField sx={mdlInput} required={true} variant="outlined" className="modalInput" label="Document title" onChange={(event) => setTitle(event.target.value)} value={title}></TextField>
                                <FormControl component="fieldset" className="modalRadio" sx={{display: "block", width: "260px", margin: "0 auto"}}>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        // defaultValue={privateDoc}
                                        name="radio-buttons-group"
                                    >
                                    <FormControlLabel value={publicDoc} onClick={makePublic} control={<Radio  />} label="Public" />
                                    <FormControlLabel value={privateDoc} onClick={makePrivate} control={<Radio />} label="Private" />
                                    </RadioGroup>
                                </FormControl>
                            <Button sx={modalBtn} type="submit">Create</Button>
                        </form>
                    </Box>
                </motion.div>
            </Modal>
        </div>
        </>);
}