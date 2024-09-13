'use client'

import React from 'react'
import { Box, List, ListItem, ListItemText, ListItemIcon, Divider, Button } from '@mui/material'
import PeopleIcon from '@mui/icons-material/People'
import AddBoxIcon from '@mui/icons-material/AddBox'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import ThreeDRotationIcon from '@mui/icons-material/ThreeDRotation'
import LogoutIcon from '@mui/icons-material/Logout'
import Link from 'next/link'
import Image from 'next/image'
import { logoutUser } from '../services/authServices'
import { useRouter } from "next/navigation";


const drawerWidth = 240

export default function AdminSidebar() {
  const router = useRouter();
  
  const handleLogout = () => {
    logoutUser();
    
    router.push("/login");
  };

  return (
    <Box
      sx={{
        height: '100vh', // Set height to 100% of viewport height
        backgroundColor: 'oklch(0.3354 0.090487 241.152)',
        color: 'white',
        width: drawerWidth,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      {/* Logo */}
      <Box sx={{ pt: 2 ,textAlign: 'center', margin: "0 auto "}} >
        <Image
          src="/static/images/logo2.png"
          alt="Logo"
          width={100}
          height={60}
        />
      </Box>

    
    </Box>
  )
}