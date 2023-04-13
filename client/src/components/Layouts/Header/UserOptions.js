import React from 'react'
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import PersonIcon from '@mui/icons-material/Person';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../slices/userSlice';
import "./Header.css"
import { Backdrop } from '@mui/material';

const UserOptions = ({userData}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const actions = [
        { icon: <PersonIcon />, name: 'Profile' ,func: account},
        { icon: <ListAltIcon />, name: 'Orders',func: orders },
        { icon: <ShoppingCartIcon />, name: 'Cart',func: cart },
        { icon: <LogoutIcon />,  name: "Logout", func: logoutUser},
      ];


      
  if (userData.role === "admin") {
    actions.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/admin/dashboard");
  }

  function orders() {
    navigate("/orders");
  }
  function account() {
    navigate("/account");
  }
  function cart() {
    navigate("/cart");
  }
  function logoutUser() {
    dispatch(logout());
  }


  return (
    <>
    {open?<Backdrop open={open} style={{zIndex:10}}/>:null}
    <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        sx={{ position: 'fixed', top: 10, right: 50 }}
        style={{ zIndex: "11"}}
        direction="down"
        className='speedDial'
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        icon={<img className="speedDialIcon" src={userData.avatar.url}></img>}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            onClick={action.func}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </>
  )
}

export default UserOptions