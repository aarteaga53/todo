import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Checkbox, FormControlLabel, FormGroup, IconButton, InputAdornment, TextField } from '@mui/material'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Visibility from '@mui/icons-material/Visibility'
import Email from '@mui/icons-material/Email'
import Person from '@mui/icons-material/Person'
import '../styles/Auth.css'
import Footer from './Footer'


const Auth = ({setToken, setUser}) => {
    let [isSignup, setIsSignup] = useState(false)
    let [showPassword, setShowPassword] = useState(false)
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

    /**
     * changes between signin and signup inputs
     */
    let toggleAuth = () => {
      setIsSignup(!isSignup)
    }

    let toggleShowPassword = () => {
      setShowPassword(!showPassword)
    }

    return (
      <>
        <div className='auth-body'>
          <div className='auth-box'>
            <form className='auth-form' onSubmit={isSignup ? signup : signin}>
              <div className='auth-title'>{isSignup ? 'Sign Up' : 'Sign In'}</div>
                <div className='auth-inputs'>
                    {isSignup ? (
                    <>
                        <TextField variant='standard' id='first' name='first' label='First Name' type='text' margin='normal' required 
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='end'>
                                <IconButton size='small' disabled>
                                  <Person />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                        <TextField variant='standard' id='last' name='last' label='Last Name' type='text' margin='normal' required 
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='end'>
                                <IconButton size='small' disabled>
                                  <Person />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                    </>
                    ) : null}
                    <TextField variant='standard' id='email' name='email' label='Email' type='email' margin='normal' required 
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton size='small' disabled>
                            <Email />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  <TextField variant='standard' id='password' name='password' label='Password' type={showPassword ? 'text' : 'password'} margin='normal' required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton size='small' onClick={toggleShowPassword}>
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div className='auth-options'>
                  <FormGroup>
                  {isSignup ? (
                    <FormControlLabel control={<Checkbox size='small' required />} label="I agree to the terms & conditions." />
                  ) : (
                    <FormControlLabel control={<Checkbox size='small' />} label="Remember me" />
                  )}
                  </FormGroup>
                  {isSignup ? null : (<div className='forgot'>Forgot Password?</div>)}
                </div>
                <Button variant='contained' type='submit' fullWidth>{isSignup ? 'Sign Up' : 'Sign In'}</Button>
                {isSignup ? (
                  <div className='register'>
                    <div>Already have an account?</div>
                    <div className='register-option' onClick={toggleAuth}>Sign In</div>
                  </div>
                ) : (
                  <div className='register'>
                    <div>Don't have an account?</div>
                    <div className='register-option' onClick={toggleAuth}>Register</div>
                  </div>
                )}
            </form>
          </div>
        </div>
        <Footer />
      </>
    )
}

export default Auth
