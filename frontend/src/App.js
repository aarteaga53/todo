import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Auth from './components/Auth';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Issues from './components/Issues';

function App() {
  let [token, setToken] = useState(null)
  let [user, setUser] = useState(null)

  useEffect(() => {
    /**
     * keeps user logged in
     */
    let getToken = async () => {
      const data = window.localStorage.getItem('token')
  
      if(data !== null) {
        setToken(JSON.parse(data))
        await getUser(data)
      }
    }

    let getUser = async (temp) => {
      let response = await fetch(`http://127.0.0.1:8000/user`, {
          method: 'POST',
          headers: {
              'Content-type': 'application/json'
          },
          body: JSON.stringify({ token: temp })
      })
  
      let data = await response.json()
      setUser(data)
    }

    getToken()
  }, [token])

  return (
    <div>
      <Router>
        {token ? <Navbar /> : null}
        <Routes>
          <Route path='/' element={<Navigate to='/auth'></Navigate>}></Route>
          <Route path='auth' element={<Auth setToken={setToken} setUser={setUser} />}></Route>
          <Route path='home' element={<Home user={user} />}></Route>
          <Route path='profile'></Route>
          <Route path='tracker/*' element={<Issues user={user} />}></Route>
          <Route path='contact'></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
