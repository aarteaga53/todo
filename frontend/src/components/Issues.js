import React, { useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import '../styles/Issues.css'
import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import Footer from './Footer'
import TaskBox from './TaskBox'
import CreateTask from './CreateTask'
import { DndContext, MouseSensor, useSensor, useSensors } from '@dnd-kit/core'
import { restrictToWindowEdges } from '@dnd-kit/modifiers'

const Issues = ({user}) => {
  let [todo, setTodo] = useState([])
  let [progress, setProgress] = useState([])
  let [done, setDone] = useState([])

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 1,
      },
    }),
  );

  useEffect(() => {
    /**
     * Gets all tasks of a given type from database
     */
    let getTasks = async () => {
      if(user) {
        let response = await fetch(`http://127.0.0.1:8000/tasks`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({ tasks: 'tasks' in user ? user.tasks : [] })
        })
        let data = await response.json()
        let temp0 = []
        let temp1 = []
        let temp2 = []
  
        data.forEach(task => {
          switch(task.type) {
            case 0:
              temp0.push(task)
              break
            case 1:
              temp1.push(task)
              break
            case 2:
              temp2.push(task)
              break
            default:
              break
          }
        })
        
        setTodo(temp0)
        setProgress(temp1)
        setDone(temp2)
      }
    }

    getTasks()
  }, [user])

  let removeTask = (index, type) => {
    let task = {}

    switch(type) {
      case 0:
        task = todo[index]
        setTodo(todo => [
          ...todo.slice(0, index),
          ...todo.slice(index + 1, todo.length)
        ])
        break
      case 1:
        task = progress[index]
        setProgress(progress => [
          ...progress.slice(0, index),
          ...progress.slice(index + 1, progress.length)
        ])
        break
      case 2:
        task = done[index]
        setDone(done => [
          ...done.slice(0, index),
          ...done.slice(index + 1, done.length)
        ])
        break
      default:
        break
    }

    return task
  }

  let insertTask = async (task, type) => {
    task.type = type

    await fetch(`http://127.0.0.1:8000/tasks/update`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    switch(type) {
      case 0:
        setTodo(todo => [...todo, task])
        break
      case 1:
        setProgress(progress => [...progress, task])
        break
      case 2:
        setDone(done => [...done, task])
        break
      default:
        break
    }
  }

  let handleDragEnd = (event) => {
    const {active, over} = event

    if(over !== null) {
      if(active.data.current.type !== over.id) {
        let task = removeTask(active.data.current.index, active.data.current.type)
        insertTask(task, over.id)
      }
    }
  }

  return (
    <>
      <div className='page-body'>
        <div className='layout'>
          <DndContext 
            sensors={sensors} 
            modifiers={[restrictToWindowEdges]}
            onDragEnd={handleDragEnd}
          >
            <TaskBox user={user} title='Todo' tasks={todo} setTasks={setTodo} id={0} />
            <TaskBox user={user} title='In Progress' tasks={progress} setTasks={setProgress} id={1} />
            <TaskBox user={user} title='Done' tasks={done} setTasks={setDone} id={2} />
          </DndContext>
        </div>
        <Footer />
        <Routes>
          <Route path='create' element={<CreateTask user={user} set0={setTodo} set1={setProgress} set2={setDone} />}></Route>
        </Routes>
      </div>
      <div className='add-icon'>
        <Link to='create'>
          <Fab color='primary' aria-label='add'>
            <AddIcon />
          </Fab>
        </Link>
      </div>
    </>
  )
}

export default Issues