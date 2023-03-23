import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Auth from './components/Auth';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Canvas from './components/Canvas';
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

    let getTheme = () => {
      const data = window.localStorage.getItem('theme')

      if(data.includes('theme')) {
        document.body.className = data
      } else {
        const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)")
  
        if (darkThemeMq.matches) {
          document.body.className = 'dark-theme'
        } else {
          document.body.className = 'light-theme'
        }
      }
    }

    getToken()
    getTheme()
  }, [token])

  return (
    <div>
      <Router>
        {token ? <Navbar /> : <Landing />}
        <Routes>
          <Route path='/' element={<Navigate to='/auth'></Navigate>}></Route>
          <Route path='auth' element={<Auth setToken={setToken} setUser={setUser} />}></Route>
          <Route path='canvas/*' element={<Canvas user={user} />}></Route>
          <Route path='tasks/*' element={<Issues user={user} />}></Route>
          <Route path='contact'></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
