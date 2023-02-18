import React from 'react'
import '../styles/Landing.css'

const Landing = () => {
  // left: Math.floor(Math.random() * (window.innerWidth - 275)), 
  // top: Math.floor(Math.random() * (window.innerHeight - 555))
  const postIts = [
    {
      color: 'p-green', title: 'Tasks', 
      body: 'Write out your tasks, activities, or appointments to keep track of.'
    },
    {
      color: 'p-blue', title: 'Organize', 
      body: 'Keep your tasks organized and easy to find.'
    },
    {
      color: 'p-orange', title: 'Color', 
      body: 'Color code your tasks however you like.'
    },
    {
      color: 'p-purple', title: 'Title', 
      body: 'Body'
    },
    {
      color: 'p-pink', title: 'Title', 
      body: 'Body'
    },
    {
      color: 'p-yellow', title: 'Title', 
      body: 'Body'
    }
  ]

  return (
    <div>
      <div className='panel'>
        <div className='app-name'>Todo</div>
        {/* <button className='auth' type='button'>Sign In</button> */}
      </div>
      <div className='body'>
        {postIts.map((postIt, index) => (
          <div className={`post-it ${postIt.color}`} style={{marginTop: index * 100 + 50}} key={index}>
            <div className={`corner ${postIt.color}-dark`}></div>
            <input className='post-title post-select' defaultValue={postIt.title} />
            <textarea className='post-body post-select' rows={20} defaultValue={postIt.body} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Landing