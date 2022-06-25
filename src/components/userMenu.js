import React, { useRef, useState } from "react";
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { Avatar, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AccountModal from "./accountModal";
// user menu from mui
export function MenuListComposition(props) {

    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false)
    const anchorRef = useRef(null)

    const navigate = useNavigate();

    const navigateInfo = e => {
        handleClose(e)
        navigate('/info')
    }

    const handleOpenModal = e => {
        handleClose(e)
        setOpenModal(true)
    }

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
      };
    
      const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
          return;
        }
    
        setOpen(false);
      };
    
      function handleListKeyDown(event) {
        if (event.key === 'Tab') {
          event.preventDefault();
          setOpen(false);
        } else if (event.key === 'Escape') {
          setOpen(false);
        }
      }

      const prevOpen = React.useRef(open);
    React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
    }, [open]);

    return (<>
        <div>
        <Avatar
          ref={anchorRef}
          id="composition-button"
          className='navPic'
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          src={props.photo}
          alt=""
        />
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="top-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'right top',
              }}
            >
              <Paper sx={{borderRadius: "10px", border: "1px solid #ccc"}}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={handleOpenModal}>My account</MenuItem>
                    <Divider />
                    <MenuItem onClick={navigateInfo}>About "docs"</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
      <AccountModal open={openModal} setopen={setOpenModal} email={props.email} username={props.username} photo={props.photo}  />
    </>)
}