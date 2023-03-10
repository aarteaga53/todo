import React from 'react'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

const Task = ({user, index, setTasks, task}) => {
  const {isDragging, attributes, listeners, setNodeRef, transform} = useDraggable({
    id: task.date,
    data: {
      index: index,
      type: task.type
    }
  })

  const style = {
    transform: CSS.Translate.toString(transform),
    boxShadow: isDragging ? '0px 3px 10px 0px rgba(0,0,0,0.8)' : null
  }

  let deleteTask = async () => {
    let response = await fetch(`http://127.0.0.1:8000/tasks/delete/${task._id}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ user: user })
    })
    let data = await response.json()

    if(data.msg === 'success') {
      user.tasks.splice(user.tasks.indexOf(task._id), 1)
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
    <div className='task-drag' ref={setNodeRef} style={style} >
      <div className='task' {...listeners} {...attributes}>
        <div className='task-header'>
          <div className='task-title'>{task.title}</div>
          <div className='task-date'>{formatDate(new Date(task.date))}</div>
          <IconButton className='delete-icon-btn' onClick={deleteTask}>{<DeleteIcon className='delete-icon' />}</IconButton>
        </div>
        <div className='task-body'>{task.body}</div>
      </div>
    </div>
  )
}

export default Task