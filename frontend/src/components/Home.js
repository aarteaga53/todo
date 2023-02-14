import React from 'react'
import Footer from './Footer'

const Home = ({user}) => {
  return (
    <div className='page-body'>
      <h1>Hello {user.first + ' ' + user.last}</h1>
      <Footer />
    </div>
  )
}

export default Home