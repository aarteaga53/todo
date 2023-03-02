import React from 'react'
import '../styles/Home.css'
import Footer from './Footer'
import {Link} from 'react-router-dom'

const Home = ({user}) => {
    return (
      <>
        <div className='home'>
          <div className='leftSide'>
            {user ? (<h1>Welcome back {`${user.first} ${user.last}`}</h1>) : (<h1>Welcome back</h1>)}
            <p>Track issues faster than ever before!</p>
            <Link to="/Canvas"><button>
              Start Now 
            </button>
            </Link>
            
            
            {/* <div className='section-title'>Hello  World{`${user.first} ${user.last}`}</div> */}
          </div>
          <div className='rightSide'></div>
          <Footer />
        </div>
      </>
    )
  }
  
  export default Home
