import React, { useEffect, useState } from 'react'
import {useDroppable} from '@dnd-kit/core'
import Task from './Task'

const TaskBox = ({user, title, tasks, setTasks, id}) => {
  let [backgroundColor, setBackgroundColor] = useState('#efcfd4')
  const {isOver, setNodeRef} = useDroppable({
    id: id,
  })

  const style = {
    backgroundColor: isOver ? '#a199ed' : backgroundColor
  }

  useEffect(() => {
    if(document.body.className === 'dark-theme') {
      setBackgroundColor('#4e59d0')
    }
  }, [])

  return (
    <div className='tri'>
      <div className='type-title'>{title}</div>
      <div className='task-box' ref={setNodeRef} style={style}>
        {tasks.map((task, index) => (
          <Task user={user} index={index} setTasks={setTasks} task={task} key={index} />
        ))}
      </div>
    </div>
  )
}

export default TaskBox