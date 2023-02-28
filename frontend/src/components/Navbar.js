import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'
import ReorderIcon from '@mui/icons-material/Reorder';
import { Button } from '@mui/material';
import '../styles/DarkMode.css'



function Navbar() {

  const [openLinks, setOpenLinks] = useState(false)


  const toggleNavbar = () =>{
      setOpenLinks(!openLinks)
  };

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const toggleTheme = () => {
    if(theme === 'light'){
      setTheme('dark');
    }else{
      setTheme('light');
    }
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme;
  }, [theme]);

  return (
    <div className={'navbar ${theme'}>
      <div className='leftSide' id={openLinks ? 'open' : 'close'}>
        <button onClick={toggleTheme} >Toggle Theme</button>
        
        <div className='hiddenLinks'>
          <Link to='home'>Home</Link>
          <Link to='canvas'>Canvas</Link>
          <Link to='issues'>Issues</Link>
          <Link to='profile'>Profile</Link>
          <Link to=''>Logout</Link>

        </div>
      </div>
      <div className='rightSide'>
        <Link to='home'>Home</Link>
        <Link to='canvas'>Canvas</Link>
        <Link to='issues'>Issues</Link>
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
