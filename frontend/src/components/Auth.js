import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, TextField } from '@mui/material'
import '../styles/Auth.css'
import Footer from './Footer'


const Auth = ({setToken, setUser}) => {
    let [first, setFirst] = useState('')
    let [last, setLast] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [isSignup, setIsSignup] = useState(false)
    let navigate = useNavigate()

    useEffect(() => {
        let removeToken = () => {
            window.localStorage.removeItem('token')
            setToken(null)
            setUser({})
        }

        removeToken()
    }, [setToken, setUser])

    /**
     * allows the user to login
     */
    let login = async () => {
        if(email !== '' && password !== '') {
            const user = {email: email, password: password}
            
            let response = await fetch(`http://127.0.0.1:8000/verify`, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(user)
            })

            let data = await response.json()
    
            if(data.msg !== 'error') {
                navigateHome(data)
            }
        }
    }
    
    /**
     * allows the user to register
     */
    let signup = async () => {
        if(email !== '' && password !== '' && first !== '' && last !== '') {
            const newUser = {first: first, last: last, email: email, password: password}

            let response = await fetch(`http://127.0.0.1:8000/register`, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(newUser)
            })

            let data = await response.json()

            if('insertedId' in data) {
                setIsSignup(false)
            }
        }
    }

    let navigateHome = (data) => {
        window.localStorage.setItem('token', JSON.stringify(data))
        setToken(data)
        navigate('/home')
    }

    let skip = async () => {
        setEmail('user@email.com')
        setPassword('password123')
        login()
    }

    /**
     * changes between login and signup inputs
     */
    let toggleAuth = () => {
        setIsSignup(!isSignup)
    }

    let handleChange = (e) => {
        switch(e.target.id) {
            case'first':
                setFirst(e.target.value)
                break
            case'last':
                setLast(e.target.value)
                break
            case'email':
                setEmail(e.target.value)
                break
            case'password':
                setPassword(e.target.value)
                break
            default:
                break
        }
    }

    return (
        <div className='auth-body'>
            <div className='auth-box'>
                <div className='auth-title'>{isSignup ? 'Signup' : 'Login'}</div>
                <div className='auth-inputs'>
                    {isSignup ? <>
                        <TextField id='first' label='First Name' type='text' margin='normal' onChange={handleChange} />
                        <TextField id='last' label='Last Name' type='text' margin='normal' onChange={handleChange} />
                    </> : null}
                    <TextField id='email' label='Email' type='text' margin='normal' onChange={handleChange} />
                    <TextField id='password' label='Password' type='password' margin='normal' onChange={handleChange} />
                </div>
                <div className='auth-buttons'>
                    <Button variant='outlined' onClick={toggleAuth}>{isSignup ? 'Login' : 'Signup'}</Button>
                    <Button variant='outlined' onClick={isSignup ? signup : login}>{isSignup ? 'Signup' : 'Login'}</Button>
                    <Button variant='outlined' onClick={skip}>Skip</Button>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Auth
