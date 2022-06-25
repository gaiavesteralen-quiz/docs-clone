import React, {useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {auth, logInWithEmailAndPassword, signInWithGoogle } from '../../firebase'
import { useAuthState } from "react-firebase-hooks/auth";
import Button from '@mui/material/Button';
import {btn, txtfld} from '../styles/mui'
import { TextField, Box } from "@mui/material";
import '../styles/login.css' 

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { motion } from "framer-motion";
import { containerHome } from "../helpers/helper";

export function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return ;
        if (user) navigate("/home");
    }, [user, loading, navigate])

    const login = e => {
        e.preventDefault()
        try {
            logInWithEmailAndPassword(email, password)
        } catch (error) {
            toast.error(error, {
                autoClose: 1500
            })
        }
    }

    return (<>
        <ToastContainer />
        <div className="login grid">
            <div>
                <div className="loginContainer grid">
                    <motion.div className="loginInput grid" variants={containerHome} initial="hidden" animate="show">
                        <h1>"docs" 2.0</h1>
                        <Box component="form" sx={{'& > :not(style)': { m: 1, width: '25ch' },}} autoComplete="off" onSubmit={login}>
                            <TextField required={true} sx={txtfld}  variant="outlined" type="text" label="E-mail" value={email} className="todoInput" onChange={(e) => setEmail(e.target.value)} />
                            <TextField required={true} sx={txtfld} id="outlined-basic" label="Password" value={password} variant="outlined" type="password" className="todoInput" onChange={(e) => setPassword(e.target.value)} />
                            <Button sx={btn} onClick={login} type="submit">Sign In</Button>
                        </Box>
                    </motion.div>
                    <motion.div variants={containerHome} initial="hidden" animate="show" className="registerLinks">
                        <p>don't have an account? <Link to="/registrer">Register</Link></p>
                        <p>forgot your password? <Link to="/reset">Reset</Link></p>
                        <Button id="googleBtn" sx={btn} onClick={signInWithGoogle}>or Sign In with Google</Button>
                    </motion.div>
                </div>
            </div>
        </div>
    </>)
}