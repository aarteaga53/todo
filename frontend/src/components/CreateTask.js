import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'

const CreateTask = ({user, set0, set1, set2}) => {
  let navigate = useNavigate()

  let createTask = async (event) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget);
    const newTask = {
        title: form.get('title'),
        body: form.get('body'),
        type: form.get('type'),
        color: 'p-green',
        date: new Date()
    }

    let response = await fetch(`http://127.0.0.1:8000/tasks/insert`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ user: user, task: newTask })
    })

    let data = await response.json()

    if('insertedId' in data) {
      newTask._id = data.insertedId
      
      if('tasks' in user) {
        user.tasks.push(data.insertedId)
      } else {
        user.tasks = [data.insertedId]
      }

      switch(newTask.type) {
        case '0':
          set0(type0 => [...type0, newTask])
          break
        case '1':
          set1(type1 => [...type1, newTask])
          break
        case '2':
          set2(type2 => [...type2, newTask])
          break
        default:
          break
      }

      navigate(-1)
    }
  }

  return (
    <div className='create-page'>
      <form className='create-box' onSubmit={createTask}>
        <div className='auth-title'>Create Task</div>
        <TextField id='title' name='title' label='Title' variant='outlined' margin='normal' required />
        <TextField id='body' name='body' label='Body' variant='outlined' margin='normal' minRows={3} multiline required />
        <FormControl margin='normal'>
          <FormLabel id='type' required>Type</FormLabel>
          <RadioGroup
            aria-labelledby='type'
            defaultValue='0'
            name='type'
            >
            <FormControlLabel value='0' control={<Radio />} label='Todo' />
            <FormControlLabel value='1' control={<Radio />} label='In Progress' />
            <FormControlLabel value='2' control={<Radio />} label='Done' />
          </RadioGroup>
        </FormControl>
        <div className='create-buttons'>
          <Button variant='outlined' onClick={() => navigate(-1)}>Back</Button>
          <Button variant='outlined' type='submit'>Add</Button>
        </div>
      </form>
    </div>
  )
}

export default CreateTask