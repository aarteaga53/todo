import React from 'react'
import {useDroppable} from '@dnd-kit/core'
import TaskDrag from './TaskDrag'

const TaskDrop = ({id, tasks, setTasks}) => {
  const {isOver, setNodeRef} = useDroppable({
    id: id,
  })

  const style = {
    border: isOver ? '2px solid black' : '2px solid #e1e1e1',
  }

  return (
    <div className='task-box' ref={setNodeRef} style={style}>
      {tasks.map((task, index) => (
        <TaskDrag index={index} tasks={tasks} setTasks={setTasks} task={task} key={index} />
      ))}
    </div>
  )
}

export default TaskDrop