import React, { useEffect, useState } from 'react'
import '../styles/Issues.css'
import Footer from './Footer'
import Tasks from './Tasks'

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

  return (
    <div className='page-body'>
      <div className='layout'>
        <Tasks title='Todo' tasks={todo} />
        <Tasks title='In Progress' tasks={progress} />
        <Tasks title='Done' tasks={done} />
      </div>
      <Footer />
    </div>

  )
}

export default Issues