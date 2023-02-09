import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'

const CreateTask = ({type0, type1, type2, set0, set1, set2}) => {
  let [title, setTitle] = useState('')
  let [body, setBody] = useState('')
  let [type, setType] = useState('0')
  let navigate = useNavigate()

  let createTask = async () => {
    if(title !== '' && body !== '') {
      const newTask = {title: title, body: body, type: type, date: new Date()}

      let response = await fetch(`http://127.0.0.1:8000/tasks/insert`, {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(newTask)
      })

      let data = await response.json()

      if('insertedId' in data) {
        newTask._id = data.insertedId

        switch(type) {
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
  }

  let handleChange = (e) => {
    switch(e.target.id) {
      case'title':
        setTitle(e.target.value)
        break
      case'body':
        setBody(e.target.value)
        break
      default:
        setType(e.target.value)
        break
    }
}

  return (
    <div className='create-page'>
      <div className='create-box'>
        <TextField id="title" label="Title" variant="outlined" margin="normal" onChange={handleChange} />
        <TextField id="body" label="Body" variant="outlined" margin="normal" multiline onChange={handleChange} />
        <FormControl>
          <FormLabel id='type'>Type</FormLabel>
          <RadioGroup
            aria-labelledby='type'
            defaultValue='0'
            name='type'
            onChange={handleChange}
          >
            <FormControlLabel value='0' control={<Radio />} label='Todo' />
            <FormControlLabel value='1' control={<Radio />} label='In Progress' />
            <FormControlLabel value='2' control={<Radio />} label='Done' />
          </RadioGroup>
        </FormControl>
        <div className='create-buttons'>
          <Button variant='outlined' onClick={() => navigate(-1)}>Back</Button>
          <Button variant='outlined' onClick={createTask}>Create</Button>
        </div>
      </div>
    </div>
  )
}

export default CreateTask