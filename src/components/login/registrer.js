import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import {auth, registerWithEmailAndPassword, signInWithGoogle} from "../../firebase";
import '../styles/login.css'
import Button from '@mui/material/Button';
import {btn, txtfld} from '../styles/mui'
import { TextField, Box } from "@mui/material";

import { motion } from "framer-motion";
import { container } from "../helpers/helper";

export function Registrer() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate()

    const register = () => {
        if (!name) alert("Please enter name");
        registerWithEmailAndPassword(name, email, password);
    };

    useEffect(() => {
        if (loading) return ;
        if (user) navigate("/home");
    }, [user, loading, navigate])
    
    return(<>
        <div className="login grid">
            <div>
                <div className="loginHeader flex">
                    <Button onClick={() => {navigate("/")}}>go back</Button>
                    <h1>"docs" 2.0</h1>
                </div>
                <div className="loginContainer grid">
                    <motion.div className="loginInput grid" variants={container} initial="hidden" animate="show">
                        <Box component="form" sx={{'& > :not(style)': { m: 1, width: '25ch' },}} noValidate autoComplete="off" onSubmit={register}>
                        <TextField sx={txtfld}  variant="outlined" type="text" label="userName" value={name} className="todoInput" onChange={(e) => setName(e.target.value)} />
                        <TextField sx={txtfld}  variant="outlined" type="text" label="E-mail" value={email} className="todoInput" onChange={(e) => setEmail(e.target.value)} />
                        <TextField sx={txtfld} required={true} id="outlined-basic" label="Password" variant="outlined" type="password" value={password} className="todoInput" onChange={(e) => setPassword(e.target.value)} />
                        <Button sx={btn} onClick={register}>register</Button>
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