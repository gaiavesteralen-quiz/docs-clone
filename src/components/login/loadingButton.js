import React from "react";
import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { btn } from "../styles/mui";

export const Buttons = (props) => {
    return (<>
        {props.buttonLoading ? (<>
            <LoadingButton loading variant="outlined"></LoadingButton>
            </>) : <Button className={props.class} id={props.id} sx={btn} onClick={props.action} type="submit">Sign In</Button>}
    </>)
}