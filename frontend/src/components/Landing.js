import React from 'react'
import '../styles/Landing.css'

const Landing = () => {
  const postIts = [
    {color: 'gray', title: 'Tasks', body: 'Write out your tasks, activites, or appointments to keep track of.', width: Math.floor(Math.random() * (window.innerWidth - 275)), height: Math.floor(Math.random() * (window.innerHeight - 325))},
    {color: 'yellow', title: 'Organize', body: 'Keep your tasks organized and easy to find.', width: Math.floor(Math.random() * (window.innerWidth - 275)), height: Math.floor(Math.random() * (window.innerHeight - 325))},
    {color: 'p-green', title: 'Title', body: 'Body', width: Math.floor(Math.random() * (window.innerWidth - 275)), height: Math.floor(Math.random() * (window.innerHeight - 325))},
    {color: 'p-blue', title: 'Title', body: 'Body', width: Math.floor(Math.random() * (window.innerWidth - 275)), height: Math.floor(Math.random() * (window.innerHeight - 325))},
    {color: 'p-orange', title: 'Title', body: 'Body', width: Math.floor(Math.random() * (window.innerWidth - 275)), height: Math.floor(Math.random() * (window.innerHeight - 325))},
    {color: 'p-purple', title: 'Title', body: 'Body', width: Math.floor(Math.random() * (window.innerWidth - 275)), height: Math.floor(Math.random() * (window.innerHeight - 325))},
    {color: 'p-pink', title: 'Title', body: 'Body', width: Math.floor(Math.random() * (window.innerWidth - 275)), height: Math.floor(Math.random() * (window.innerHeight - 325))},
    {color: 'p-yellow', title: 'Title', body: 'Body', width: Math.floor(Math.random() * (window.innerWidth - 275)), height: Math.floor(Math.random() * (window.innerHeight - 325))}
  ]

  return (
    <div>
      <div className='panel'>
        <div className='app-name'>Todo</div>
        {/* <button className='auth' type='button'>Sign In</button> */}
      </div>
      <div className='body'>
        {postIts.map((postIt, index) => (
          <div className={`post-it ${postIt.color}`} style={{marginLeft: postIt.width, marginTop: postIt.height}} key={index}>
            <div className='post-title'>{postIt.title}</div>
            <div className='post-body'>{postIt.body}</div>
          </div>
        ))}
        {/* <div className='post-it gray'></div>
        <div className='post-it yellow'></div>
        <div className='post-it p-green'></div>
        <div className='post-it p-blue'></div>
        <div className='post-it p-orange'></div>
        <div className='post-it p-purple'></div>
        <div className='post-it p-pink'></div>
        <div className='post-it p-yellow'></div> */}
      </div>
    </div>
  )
}

export default Landing