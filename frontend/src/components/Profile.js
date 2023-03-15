import React from 'react'
import Footer from './Footer'
import '../styles/Profile.css'

const Profile = ({user}) => {
  return (
    <>
      <div className='page-body'>
        <div className='layout'>
          <div className='section-title'>{user ? `Hello again ${user.first} ${user.last}` : 'Hello again'}</div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Profile