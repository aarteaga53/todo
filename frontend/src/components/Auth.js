import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, InputLabel, TextField } from '@mui/material'
import '../styles/Auth.css'


const Auth = () => {
    let [first, setFirst] = useState('')
    let [last, setLast] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [isSignup, setIsSignup] = useState(false)
    let navigate = useNavigate()

    let login = async () => {
        const user = {email: email, password: password}
        console.log(user)
        navigate('/home')
        // if(email !== '' && password !== '') {
        //     const newUser = {email: email, password: password}

        //     let response = await fetch(`http://127.0.0.1:8000/verify`, {
        //         method: "POST",
        //         headers: {
        //             'Content-type': 'application/json'
        //         },
        //         body: JSON.stringify(newUser)
        //     })

        //     let data = await response.json()
    
        //     if(data.msg === 'User valid.') {
        //         navigate('/home')
        //     }
        // }
    }
    
    let signup = async () => {
        const newUser = {first: first, last: last, email: email, password: password}
        console.log(newUser)
        setIsSignup(false)
        // if(email !== '' && password !== '' && first !== '' && last !== '') {
        //     const newUser = {first: first, last: last, email: email, password: password}

        //     let response = await fetch(`http://127.0.0.1:8000/register`, {
        //         method: "POST",
        //         headers: {
        //             'Content-type': 'application/json'
        //         },
        //         body: JSON.stringify(newUser)
        //     })

        //     let data = await response.json()

        //     if(data.msg === 'User created.') {
        //         setIsSignup(false)
        //     }
        // }
    }

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
                {isSignup ? <div>
                    <InputLabel>First Name</InputLabel>
                    <TextField id='first' type='text' onChange={handleChange} required />
                    <InputLabel>Last Name</InputLabel>
                    <TextField id='last' type='text' onChange={handleChange} required />
                </div> : null}
                    <InputLabel>Email</InputLabel>
                    <TextField id='email' type='text' onChange={handleChange} required />
                    <InputLabel>Password</InputLabel>
                    <TextField id='password' type='password' onChange={handleChange} required />
                <div className='auth-buttons'>
                    {isSignup ? <div>
                        <Button onClick={toggleAuth}>Login</Button>
                        <Button onClick={signup}>Signup</Button>
                    </div> : <div>
                        <Button onClick={toggleAuth}>Signup</Button>
                        <Button onClick={login}>Login</Button>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default Auth
