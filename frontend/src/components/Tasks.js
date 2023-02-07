import React from 'react'

const Tasks = ({title, tasks}) => {
  /**
   * Gets a date in milliseconds and converts it to the month and day,
   * adds year to the end if it is not the same as the current year
   * 
   * @param {*} date 
   * @returns the date in mm/dd or mm/dd/yyyy format
   */
  let formatDate = (date) => {
    let newDate = `${date.getMonth() + 1}/${date.getDate()}`

    if(new Date().getFullYear() !== date.getFullYear()) {
        newDate += `/${date.getFullYear()}`
    }

    return newDate
  }

  return (
    <div className='tri'>
      <h2>{title}</h2>
      {tasks.map((task, index) => (
        <div className='task' key={index}>
          <div className='task-header'>
            <div className='task-title'>{task.title}</div>
            <div className='task-date'>{formatDate(new Date(task.date))}</div>
          </div>
          <div className='task-body'>{task.body}</div>
        </div>
      ))}
    </div>
  )
}

export default Tasks