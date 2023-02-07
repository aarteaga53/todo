import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Issues from './Issues'
import Navbar from './Navbar'

const Main = () => {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='home' element={<Home />}></Route>
        <Route path='profile'></Route>
        <Route path='tracker' element={<Issues />}></Route>
        <Route path='contact'></Route>
      </Routes>
    </>
  )
}

export default Main