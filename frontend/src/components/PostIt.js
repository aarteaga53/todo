// import { useDraggable } from '@dnd-kit/core'
import React, { useEffect, useState } from 'react'
import { CSS } from '@dnd-kit/utilities'
import '../styles/Landing.css'
import { useSortable } from '@dnd-kit/sortable'
import ClearIcon from '@mui/icons-material/Clear'
import DeleteIcon from '@mui/icons-material/Delete'
import DoneIcon from '@mui/icons-material/Done'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import Icon from '@mui/material/Icon'

const PostIt = ({user, postIt, setTasks, id, index, colors}) => {
  let [title, setTitle] = useState(postIt.title)
  let [body, setBody] = useState(postIt.body)
  let [isEditing, setIsEditing] = useState(false)
  let [colorIndex, setColorIndex] = useState(colors.indexOf(postIt.color))

  useEffect(() => {
    setTitle(postIt.title)
    setBody(postIt.body)
    setIsEditing(false)
    setColorIndex(colors.indexOf(postIt.color))
  }, [postIt, colors])

  const {attributes, listeners, setNodeRef, transform, transition, setActivatorNodeRef} = useSortable({
    id: id,
  })

  const style = {
    // transform: CSS.Translate.toString(transform),
    transform: CSS.Transform.toString(transform),
    transition
  }

  let handleChange = (e) => {
    switch(e.target.id) {
      case 'title':
        setTitle(e.target.value)
        break
      case 'body':
        setBody(e.target.value)
        break
      default:
        break
    }
  }

  let changeColor = (direction) => {
    if(direction === 1) {
      if(colorIndex < colors.length - 1) {
        setColorIndex(colorIndex + 1)
      }
    } else {
      if(colorIndex > 0) {
        setColorIndex(colorIndex - 1)
      }
    }
  }

  let deletePost = async () => {
    let response = await fetch(`http://127.0.0.1:8000/tasks/delete/${postIt._id}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ user: user })
    })
    let data = await response.json()

    if(data.msg === 'success') {
      user.tasks.splice(user.tasks.indexOf(postIt._id), 1)
      setTasks(tasks => [
        ...tasks.slice(0, index),
        ...tasks.slice(index + 1, tasks.length)
      ])
    }
  }

  let done = async () => {
    const newTask = {
      _id: postIt._id,
      title: title,
      body: body,
      type: postIt.type,
      color: colors[colorIndex],
      date: new Date(postIt.date)
    }

    let response = await fetch(`http://127.0.0.1:8000/tasks/update`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ task: newTask })
    })

    let data = await response.json()

    if(data.msg === 'success') {
      postIt.title = title
      postIt.body = body
      postIt.color = colors[colorIndex]
      setIsEditing(false)
    }
  }

  let clear = () => {
    setTitle(postIt.title)
    setBody(postIt.body)
    setColorIndex(colors.indexOf(postIt.color))
    setIsEditing(false)
  }

  return (
    <div ref={setNodeRef} style={style} >
      <div className={`post-it ${colors[colorIndex]} post-drag`}>
        <div className={`corner ${colors[colorIndex]}-dark`} ref={setActivatorNodeRef} {...listeners} {...attributes} ></div>
        {isEditing ? 
        (<div>
          <div className='arrow-icons'>
            <Icon className='post-icon' onClick={() => changeColor(0)}><KeyboardArrowLeftIcon /></Icon>
            <Icon className='post-icon' onClick={() => changeColor(1)}><KeyboardArrowRightIcon /></Icon>
          </div>
          <div className='edit-icons'>
            <Icon className='post-icon' onClick={deletePost}><DeleteIcon /></Icon>
            <Icon className='post-icon' onClick={clear}><ClearIcon /></Icon>
            <Icon className='post-icon' onClick={done}><DoneIcon /></Icon>
          </div>
        </div>) : null}
        <input className='post-title post-select' id='title' value={title} onChange={handleChange} onClick={() => setIsEditing(true)} />
        <textarea className='post-body post-select' id='body' rows={15} value={body} onChange={handleChange} onClick={() => setIsEditing(true)} />
      </div>
    </div>
  )
}

export default PostIt