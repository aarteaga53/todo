import React, { useEffect, useState } from 'react'
import '../styles/Issues.css'
import Footer from './Footer'
import PostIt from './PostIt'
import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { restrictToWindowEdges } from '@dnd-kit/modifiers'
import DoneIcon from '@mui/icons-material/Done'
import ClearIcon from '@mui/icons-material/Clear'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import Icon from '@mui/material/Icon'

const Canvas = ({user}) => {
  const colors = ['p-green', 'p-blue', 'p-orange', 'p-purple', 'p-pink', 'p-yellow']
  let [tasks, setTasks] = useState([])
  let [newTitle, setNewTitle] = useState('')
  let [newBody, setNewBody] = useState('')
  let [isDragging, setIsDragging] = useState(false)
  let [isEditing, setIsEditing] = useState(false)
  let [colorIndex, setColorIndex] = useState(0)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  useEffect(() => {
    /**
     * Gets all tasks of a given type from database
     */
    let getTasks = async () => {
      if(user && 'tasks' in user) {
        let response = await fetch(`http://127.0.0.1:8000/tasks`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({ tasks: 'tasks' in user ? user.tasks : [] })
        })
        let data = await response.json()
        
        setTasks(data.sort((a, b) => { return a.type - b.type } ))
      }
    }

    getTasks()
  }, [user])

  let handleDragStart = (event) => {
    setIsDragging(true)
  }

  let handleDragEnd = (event) => {
    const {active, over} = event
    
    if(active.id !== over.id) {
      setTasks((tasks) => {
        const oldIndex = tasks.indexOf(active.id)
        const newIndex = tasks.indexOf(over.id)

        return arrayMove(tasks, oldIndex, newIndex)
      })
    }

    setIsDragging(false)
  }

  let changeColor = (direction) => {
    if(direction === 1 && colorIndex < colors.length - 1) {
      setColorIndex(colorIndex + 1)
    } else if(direction === 0 && colorIndex > 0) {
        setColorIndex(colorIndex - 1)
    }
  }

  let done = async () => {
    if(newTitle !== '' && newBody !== '') {
      const newTask = {
        title: newTitle,
        body: newBody,
        type: 0,
        color: colors[colorIndex],
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
  
        setTasks(tasks => [...tasks, newTask])
      }
  
      clear()
    }
  }

  let clear = () => {
    setNewTitle('')
    setNewBody('')
    setIsEditing(false)
  }

  let handleChange = (e) => {
    switch(e.target.id) {
      case 'newTitle':
        setNewTitle(e.target.value)
        break
      case 'newBody':
        setNewBody(e.target.value)
        break
      default:
        break
    }

    if(document.getElementById('newTitle').value === '' && document.getElementById('newBody').value === '') {
      setIsEditing(false)
    } else {
      setIsEditing(true)
    }
  }

  return (
    <>
      <div className='page-body'>
        <div className='layout'>
          <DndContext 
            sensors={sensors} 
            collisionDetection={closestCenter}
            modifiers={[restrictToWindowEdges]}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className='canvas'>
              <SortableContext
                items={tasks}
                // strategy={rectSwappingStrategy}
              >
                {tasks.map((task, index) => (
                  <PostIt user={user} postIt={task} setTasks={setTasks} id={task} index={index} colors={colors} key={index} />
                ))}
              </SortableContext>
            </div>
          </DndContext>
          {isDragging ? null :
          (<div className={`post-it ${colors[colorIndex]} create-post`}>
            <div className={`corner ${colors[colorIndex]}-dark`} ></div>
            {isEditing ? 
            (<div>
              <div className='arrow-icons'>
                <Icon className='post-icon' onClick={() => changeColor(0)}><KeyboardArrowLeftIcon /></Icon>
                <Icon className='post-icon' onClick={() => changeColor(1)}><KeyboardArrowRightIcon /></Icon>
              </div>
              <div className='edit-icons'>
                <Icon className='post-icon' onClick={clear}><ClearIcon /></Icon>
                <Icon className='post-icon' onClick={done}><DoneIcon /></Icon>
              </div>
            </div>) : null}
            <input className='post-title post-select' id='newTitle' autoComplete='off' value={newTitle} onChange={handleChange} onClick={() => setIsEditing(true)} />
            <textarea className='post-body post-select' id='newBody' autoComplete='off' rows={15} value={newBody} onChange={handleChange} onClick={() => setIsEditing(true)} />
          </div>)}
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Canvas