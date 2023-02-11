import React from 'react'
import {useDroppable} from '@dnd-kit/core'
import TaskDrag from './TaskDrag'

const Tasks = ({title, tasks, setTasks, id}) => {
  const {isOver, setNodeRef} = useDroppable({
    id: id,
  })

  const style = {
    border: isOver ? '2px solid black' : '2px solid #e1e1e1',
  }

  return (
    <div className='tri'>
      <div className='type-title'>{title}</div>
      <div className='task-box' ref={setNodeRef} style={style}>
        {tasks.map((task, index) => (
          <TaskDrag index={index} setTasks={setTasks} task={task} key={index} />
        ))}
      </div>
    </div>
  )
}

export default Tasks