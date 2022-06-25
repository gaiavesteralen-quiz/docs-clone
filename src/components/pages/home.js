import { Button, CircularProgress } from "@mui/material";
import { navBtn } from "../styles/mui";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, addDocs } from "../../firebase";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { motion } from "framer-motion";
import { containerHome, modalOut } from "../helpers/helper";
import { FirestoreCollection } from "../docs";
import CreateModal from "../modal";
import {MenuListComposition} from '../userMenu'

//home page component
export function Home(props) {
    //important state
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState('');
    const [publicDoc, setPublicDoc] = useState(false)
    const [privateDoc, setPrivateDoc] = useState(true)
    const [profilePic, setProfilePic] = useState('')
    const [email, setEmail] = useState('')
    const [userName, setUserName] = useState('');

    const [user, loading] = useAuthState(auth);

    const navigate = useNavigate();

    const handleOpen = () => setOpen(true)

    //sets profile picture, and takes the "non" users back to the login screen
    useEffect(() => {
        if (loading)return;   
        if (!user) return navigate("/");
        setProfilePic(user.photoURL)
        setEmail(user.email)
        setUserName(user.displayName)
    }, [user, loading, navigate])
    const submits = () => {
        try {
            addDocs(title, profilePic, publicDoc, privateDoc, email)
            setTitle('')
            toast.success('doc added!', {
                draggable: true,
                autoClose: 1000,
        })
        } catch (error) {
            console.error(error)
            toast.error(error.message);
        }
    }
    
    //homepage jsx
    return (<>
    <motion.div  variants={containerHome} initial="hidden" animate="show" className="header">
        <header className="header flex nav">
            <h1 className="navHeader">"docs"</h1>
            <div className="links flex">
                <Button sx={navBtn} onClick={handleOpen} className="createDocs">new Doc</Button>
                <Button sx={navBtn} onClick={() => {navigate("/logout")}}>Log Out</Button>
                {loading ? <CircularProgress/> : <MenuListComposition photo={profilePic} email={email} username={userName} />} 
            </div>
        </header>
    </motion.div>
    <motion.div variants={containerHome} initial="hidden" animate="show">
        <FirestoreCollection private={props.private} public={props.public} btn={props.btn} />
    </motion.div>
    
    <CreateModal open={open} setopen={setOpen} title={title} setTitle={setTitle} privateDoc={privateDoc} setPrivateDoc={setPrivateDoc} publicDoc={publicDoc} setPublicDoc={setPublicDoc} addData={submits} /> 
    <ToastContainer />
    </>)
}