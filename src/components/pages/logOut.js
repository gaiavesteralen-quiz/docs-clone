import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { auth, } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { Button } from "@mui/material";
import { navBtn } from "../styles/mui";

import { motion } from "framer-motion";
import { container } from "../helpers/helper";

export const LogOut = () => {

    const [user, loading] = useAuthState(auth);

    const navigate = useNavigate()

    useEffect(() => {
        if (loading)return;  
       if (!user) navigate("/") 
    }, [user, loading, navigate])

    return (<>
    <motion.div className="loginInput grid" variants={container} initial="hidden" animate="show">
        <div className="login grid">
            <div className="loginContainer grid">
                <div>
                    <p>You are now logging out...</p>
                    <div className="flex">
                        <Button sx={navBtn} onClick={() => {navigate("/home")}}>stay</Button>
                        <Button sx={navBtn} onClick={() => {signOut(auth)}}>leave</Button>
                    </div>
                </div>
            </div>
        </div>
    </motion.div>
    </>)
}