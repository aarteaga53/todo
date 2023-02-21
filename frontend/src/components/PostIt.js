import { useDraggable } from '@dnd-kit/core'
import React from 'react'
import { CSS } from '@dnd-kit/utilities'
import '../styles/Landing.css'

const PostIt = ({postIt, id}) => {
  const {attributes, listeners, setNodeRef, transform, transition} = useDraggable({
    id: id,
    // data: {
    //   index: index,
    //   type: task.type
    // }
  })

  const style = {
    transform: CSS.Translate.toString(transform),
    transition
  }

  return (
    <div ref={setNodeRef} style={style} >
      <div className={`post-it ${'color' in postIt ? postIt.color : 'p-green'} post-drag`}>
        <div className={`corner ${'color' in postIt ? postIt.color : 'p-green'}-dark`} {...listeners} {...attributes} ></div>
        <input className='post-title post-select' defaultValue={postIt.title} />
        <textarea className='post-body post-select' rows={15} defaultValue={postIt.body} />
      </div>
    </div>
  )
}

export default PostIt