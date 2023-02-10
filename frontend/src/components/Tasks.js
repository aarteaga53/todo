import React from 'react'
import TaskDrop from './TaskDrop'

const Tasks = ({title, tasks, setTasks, id}) => {
  return (
    <div className='tri'>
      <div className='type-title'>{title}</div>
      <TaskDrop id={id} tasks={tasks} setTasks={setTasks}/>
    </div>
  )
}

export default Tasks