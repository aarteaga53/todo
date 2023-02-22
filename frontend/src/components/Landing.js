import React from 'react'
import '../styles/Landing.css'

const Landing = () => {
  // left: Math.floor(Math.random() * (window.innerWidth - 275)), 
  // top: Math.floor(Math.random() * (window.innerHeight - 555))
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
      body: 'Move and place your tasks anywhere around your screen.'
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
        <div className='app-name'>Issue Tracker</div>
        {/* <button className='auth' type='button'>Sign In</button> */}
      </div>
      <div className='body'>
        {postIts.map((postIt, index) => (
          <div className={`post-it ${postIt.color} post-animate`} style={{marginTop: index * (window.innerWidth > 1800 ? 125 : 50) + 50}} key={index}>
            {/* <div className={`corner ${postIt.color}-dark`}></div> */}
            <input className='post-title post-select' defaultValue={postIt.title} />
            <textarea className='post-body post-select' rows={15} defaultValue={postIt.body} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Landing