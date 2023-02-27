import React, { useEffect, useState } from 'react'
import '../styles/Issues.css'
import Footer from './Footer'
import PostIt from './PostIt'
import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { restrictToWindowEdges } from '@dnd-kit/modifiers'

const Canvas = ({user}) => {
  let [tasks, setTasks] = useState([])

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

  let handleDragEnd = (event) => {
    const {active, over} = event
    
    if(active.id !== over.id) {
      setTasks((tasks) => {
        const oldIndex = tasks.indexOf(active.id)
        const newIndex = tasks.indexOf(over.id)
        // const oldIndex = tasks.findIndex(task => task.date === active.id);
        // const newIndex = tasks.findIndex(task => task.date === over.id);

        return arrayMove(tasks, oldIndex, newIndex)
      })
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
            onDragEnd={handleDragEnd}
          >
            <div className='canvas'>
              <SortableContext
                items={tasks}
                // strategy={rectSwappingStrategy}
              >
                {tasks.map((task, index) => (
                  <PostIt postIt={task} id={task} key={index} />
                ))}
              </SortableContext>
            </div>
          </DndContext>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Canvas