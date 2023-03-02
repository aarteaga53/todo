import React from 'react'
import Footer from './Footer'
import '../styles/Profile.css'

const Profile = ({user}) => {
  return (
    <>
      <div className='page-body'>
        <div className='layout'>
          {user ? (<div className='section-title'>Hello again {`${user.first} ${user.last}`}</div>) : (<div className='section-title'>Hello again</div>)}
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Profile