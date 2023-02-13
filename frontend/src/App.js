import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Auth from './components/Auth';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Issues from './components/Issues';

function App() {
  let [token, setToken] = useState(null)

  useEffect(() => {
    /**
     * keeps user logged in
     */
    let getToken = () => {
      const data = window.localStorage.getItem('token')
  
      if(data !== null) {
        setToken(JSON.parse(data))
      }
    }

    getToken()
  }, [])

  return (
    <div>
      <Router>
        {token ? <Navbar /> : null}
        <Routes>
          <Route path='/' element={<Navigate to='/auth'></Navigate>}></Route>
          <Route path='auth' element={<Auth setToken={setToken} />}></Route>
          <Route path='home' element={<Home />}></Route>
          <Route path='profile'></Route>
          <Route path='tracker/*' element={<Issues />}></Route>
          <Route path='contact'></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
