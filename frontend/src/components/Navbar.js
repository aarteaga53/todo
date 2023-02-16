import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'
import ReorderIcon from '@mui/icons-material/Reorder';
import { Button } from '@mui/material';

function Navbar() {

  const [openLinks, setOpenLinks] = useState(false)

  const toggleNavbar = () =>{
      setOpenLinks(!openLinks)
  };

  return (
    <div className='navbar'>
      <div className='leftSide' id={openLinks ? 'open' : 'close'}>
        <div className='hiddenLinks'>
          <Link to='home'>Home</Link>
          <Link to='profile'>Profile</Link>
          <Link to=''>Logout</Link>
        </div>
      </div>
      <div className='rightSide'>
        <Link to='home'>Home</Link>
        <Link to='profile'>Profile</Link>
        <Link to=''>Logout</Link>
        <Button onClick={toggleNavbar}>
            <ReorderIcon/>
        </Button>
      </div>
    </div>
  )
}

export default Navbar
