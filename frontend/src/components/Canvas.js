import { useDroppable } from '@dnd-kit/core'
import React from 'react'
import PostIt from './PostIt'

const Canvas = ({user, tasks}) => {
  const {setNodeRef} = useDroppable({
    id: 'canvas',
  })

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
    <div className='canvas' ref={setNodeRef}>
      {/* {tasks.map((task, index) => (
        <PostIt postIt={task} id={index+1} key={index} />
      ))} */}
      {postIts.map((postIt, index) => (
        <PostIt postIt={postIt} id={index+2} key={index} />
      ))}
    </div>
  )
}

export default Canvas