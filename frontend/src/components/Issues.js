import React, { useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import '../styles/Issues.css'
import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import Footer from './Footer'
import Tasks from './Tasks'
import CreateTask from './CreateTask'
import { DndContext, MouseSensor, useSensor, useSensors } from '@dnd-kit/core'
import {
  restrictToWindowEdges,
} from '@dnd-kit/modifiers'

const Issues = () => {
  let [todo, setTodo] = useState([])
  let [progress, setProgress] = useState([])
  let [done, setDone] = useState([])

  useEffect(() => {
    /**
     * Gets all tasks of a given type from database
     */
    let getTasks = async (type) => {
      let response = await fetch(`http://127.0.0.1:8000/tasks/${type}`)
      let data = await response.json()
      
      switch(type) {
        case 0:
          setTodo(data)
          break
        case 1:
          setProgress(data)
          break
        case 2:
          setDone(data)
          break
        default:
          break
      }
    }

    getTasks(0)
    getTasks(1)
    getTasks(2)
  }, [])

  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 1,
    },
  })

  return (
    <>
      <div className='page-body'>
        <div className='layout'>
          <DndContext sensors={useSensors(mouseSensor)} modifiers={[restrictToWindowEdges]}>
            <Tasks title='Todo' tasks={todo} setTasks={setTodo} id={0} />
            <Tasks title='In Progress' tasks={progress} setTasks={setProgress} id={1} />
            <Tasks title='Done' tasks={done} setTasks={setDone} id={2} />
          </DndContext>
        </div>
        <Footer />
        <Routes>
          <Route path='create' element={<CreateTask type0={todo} type1={progress} type2={done} set0={setTodo} set1={setProgress} set2={setDone} />}></Route>
        </Routes>
      </div>
      <div className='add-icon'>
        <Link to='create'>
          <Fab color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </Link>
      </div>
    </>
  )
}

export default Issues