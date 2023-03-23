import React from 'react'
import '../styles/Landing.css'

const Landing = () => {
  const postIts = [
    {
      color: 'p-green', title: 'Create', 
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
      color: 'p-purple', title: 'Customize', 
      body: 'Sort out your tasks in order of importance.'
    },
    {
      color: 'p-pink', title: 'Access', 
      body: 'Sign in from anywhere to access your tasks or create new ones on the spot.'
    },
    {
      color: 'p-yellow', title: 'Todo', 
      body: 'Write out everything you need to do and store it all in one place, that is accessible anywhere.'
    }
  ]

  return (
    <div>
      <div className='panel'>
        <div className='app-name'>Task Tracker</div>
      </div>
      <div className='body'>
        {postIts.map((postIt, index) => (
          <div className={`post-it ${postIt.color} post-animate`} key={index}>
            <input className='post-title post-select' defaultValue={postIt.title} />
            <textarea className='post-body post-select' rows={15} defaultValue={postIt.body} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Landing