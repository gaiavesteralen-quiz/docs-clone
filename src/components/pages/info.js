import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { container } from "../helpers/helper";
import { Button } from "@mui/material";
import { navBtn } from "../styles/mui";


export const Info = () => {

    const navigate = useNavigate()

    return(<>
    <motion.div className="loginInput grid" variants={container} initial="hidden" animate="show">
        <div className="login grid">
            <div className="loginContainer grid">
                <div>
                    <h4>coming soon..</h4>
                    <Button sx={navBtn} onClick={() => {navigate('/home')}}>go back</Button>
                </div>
            </div>
        </div>
    </motion.div>
    </>)
}