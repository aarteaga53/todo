import React from 'react'
import {useDroppable} from '@dnd-kit/core'
import Task from './Task'

const TaskBox = ({user, title, tasks, setTasks, id}) => {
  const {isOver, setNodeRef} = useDroppable({
    id: id,
  })

  const style = {
    backgroundColor: isOver ? '#a199ed' : '#191970'
  }

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