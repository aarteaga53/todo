import React from 'react'
import GitHubIcon from '@mui/icons-material/GitHub';
import '../styles/Footer.css';


function Footer() {
  return (
    <div className='footer'>
      <div className='socialMedia'>
        <a href='https://github.com/aarteaga53/todo' target='_blank' rel='noopener noreferrer'>
          <GitHubIcon className='icon' />
        </a>
      </div>
      <p>&copy; {new Date().getFullYear()} Task Tracker</p>
    </div>
  )
}

export default Footer
