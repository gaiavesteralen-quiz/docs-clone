import React, {useState} from 'react';
import {ToggleButtonGroup, ToggleButton} from '@mui/material'

export const NavBtn = (props) => {

    const [alignment, setAlignment] = useState(props.btn);

    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    return (<>
        <div className='flex docNav'>
                <ToggleButtonGroup value={alignment} exclusive onChange={handleAlignment} aria-label="text alignment" sx={{zIndex: "1"}}>
                    <ToggleButton value="left" aria-label="left aligned" onClick={props.showpub} sx={{color: "#1976d2", borderRadius: "10px", zIndex: "500"}}>
                        Public
                    </ToggleButton>
                    <ToggleButton value="center" aria-label="centered" onClick={props.showpriv} sx={{color: "#1976d2", borderRadius: "10px", zIndex: "500"}}>
                        My Docs
                    </ToggleButton>
                </ToggleButtonGroup>
        </div>
    </>)
}