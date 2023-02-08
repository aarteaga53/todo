import React from 'react'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

const Tasks = ({title, tasks, setTasks}) => {
  let deleteTask = async (index) => {
    let response = await fetch(`http://127.0.0.1:8000/tasks/delete/${tasks[index]._id}`, { method: 'DELETE' })
    let data = await response.json()

    if(data.msg === 'success') {
      setTasks(tasks => [
        ...tasks.slice(0, index),
        ...tasks.slice(index + 1, tasks.length)
      ])
    }
  }

  /**
   * Gets a date in milliseconds and converts it to the month and day,
   * adds year to the end if it is not the same as the current year
   * 
   * @param {*} date 
   * @returns the date in mm/dd or mm/dd/yyyy format
   */
  let formatDate = (date) => {
    let newDate = `${date.getMonth() + 1}/${date.getDate()}`

    if(new Date().getFullYear() !== date.getFullYear()) {
        newDate += `/${date.getFullYear()}`
    }

    return newDate
  }

  return (
    <div className='tri'>
      <div className='type-title'>{title}</div>
      {tasks.map((task, index) => (
        <div className='task' key={index}>
          <div className='task-header'>
            <div className='task-title'>{task.title}</div>
            <div className='task-date'>{formatDate(new Date(task.date))}</div>
            <IconButton className='icon' onClick={() => deleteTask(index)}>{<DeleteIcon />}</IconButton>
          </div>
          <div className='task-body'>{task.body}</div>
        </div>
      ))}
    </div>
  )
}

export default Tasks