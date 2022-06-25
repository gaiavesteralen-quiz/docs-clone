import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, sendPasswordReset, signInWithGoogle } from "../../firebase";
import Button from '@mui/material/Button';
import {btn, txtfld} from '../styles/mui'
import { TextField, Box } from "@mui/material";

import { motion } from "framer-motion";
import { container } from "../helpers/helper";

import '../styles/login.css' 


export function Reset() {

    const [email, setEmail] = useState('')
    const [user, loading] = useAuthState(auth)

    const navigate = useNavigate()

    useEffect(() => {
        if (loading) return;
        if (user) navigate("/home")
    }, [user, loading, navigate])

    const sendReset = e => {
        e.preventDefault()
        return sendPasswordReset(email)
    }

    return (<>
        <div className="login grid">
            <div>
                <div className="loginHeader flex">
                    <Button onClick={() => {navigate("/")}}>go back</Button>
                    <h1>"docs" 2.0</h1>
                </div>
                <div className="loginContainer grid">
                    <motion.div className="loginInput grid" variants={container} initial="hidden" animate="show">
                        <Box component="form" sx={{'& > :not(style)': { m: 1, width: '25ch' },}} autoComplete="off" onSubmit={sendReset}>
                        <TextField required={true} sx={txtfld}  variant="outlined" type="text" label="E-mail" value={email} className="todoInput" onChange={(e) => setEmail(e.target.value)} />
                        <Button sx={btn} onClick={sendReset}>Send reset E-mail</Button>
                        </Box>
                    </motion.div>
                    <motion.div variants={container} initial="hidden" animate="show" className="registerLinks">
                        <Button id="googleBtn" sx={btn} onClick={signInWithGoogle}>or Sign In with Google</Button>
                    </motion.div>
                </div>
            </div>
        </div>
    </>)

}