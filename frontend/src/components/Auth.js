import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, TextField } from '@mui/material'
import '../styles/Auth.css'
import Footer from './Footer'


const Auth = ({setToken, setUser}) => {
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
     * allows the user to signin
     */
    let signin = async (event) => {
        event.preventDefault()
        const form = new FormData(event.currentTarget);
        const user = {email: form.get('email'), password: form.get('password')}
        
        let response = await fetch(`http://127.0.0.1:8000/verify`, {
            method: 'POST',
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
    
    /**
     * allows the user to register
     */
    let signup = async (event) => {
        event.preventDefault()
        const form = new FormData(event.currentTarget);
        const newUser = {
            first: form.get('first'), 
            last: form.get('last'), 
            email: form.get('email'), 
            password: form.get('password')
        }

        let response = await fetch(`http://127.0.0.1:8000/register`, {
            method: 'POST',
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

    let navigateHome = (data) => {
        window.localStorage.setItem('token', JSON.stringify(data))
        setToken(data)
        navigate('/home')
    }

    let skip = () => {
        document.getElementById('email').value = 'user@email.com'
        document.getElementById('password').value = 'password123'
    }

    /**
     * changes between signin and signup inputs
     */
    let toggleAuth = () => {
        setIsSignup(!isSignup)
    }

    return (
        <>
        <div className='auth-body'>
            <form className='auth-box' onSubmit={isSignup ? signup : signin}>
                <div className='auth-title'>{isSignup ? 'Sign Up' : 'Sign In'}</div>
                <div className='auth-inputs'>
                    {isSignup ? (<>
                        <TextField id='first' name='first' label='First Name' type='text' margin='normal' required />
                        <TextField id='last' name='last' label='Last Name' type='text' margin='normal' required />
                    </>) : null}
                    <TextField id='email' name='email' label='Email' type='email' margin='normal' required />
                    <TextField id='password' name='password' label='Password' type='password' margin='normal' required />
                </div>
                <div className='auth-buttons'>
                    <Button variant='outlined' type='button' onClick={toggleAuth}>{isSignup ? 'Sign In' : 'Sign Up'}</Button>
                    <Button variant='outlined' type='submit' >{isSignup ? 'Sign Up' : 'Sign In'}</Button>
                    {!isSignup ? (<Button variant='outlined' type='submit' onClick={skip}>Skip</Button>) : null}
                </div>
            </form>
        </div>
        <Footer />
        </>
    )
}

export default Auth
