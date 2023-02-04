import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { BrowserRouter as Router } from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {
  let [tasks, setTasks] = useState([])

  useEffect(() => {
    /**
     * Gets all tasks from database
     */
    let getTasks = async () => {
      let response = await fetch(`http://127.0.0.1:8000/tasks`)
      let data = await response.json()
  
      setTasks(data)
    }

    getTasks()
  }, [])

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
    <div className="App">
      <Router>
        <Navbar/>
        <h1>hello world</h1>
        {tasks.map((task, index) => (
          <div className='task' key={index}>
            <div className='task-header'>
              <div className='task-title'>{task.title}</div>
              <div className='task-date'>{formatDate(new Date(task.date))}</div>
            </div>
            <div className='task-body'>{task.body}</div>
          </div>
        ))}
        <Footer/>
      </Router>
      
    </div>
  );
}

export default App;
