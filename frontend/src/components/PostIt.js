// import { useDraggable } from '@dnd-kit/core'
import React, { useEffect, useState } from 'react'
import { CSS } from '@dnd-kit/utilities'
import '../styles/Landing.css'
import { useSortable } from '@dnd-kit/sortable'

const PostIt = ({postIt, id}) => {
  let [title, setTitle] = useState(postIt.title)
  let [body, setBody] = useState(postIt.body)

  useEffect(() => {
    setTitle(postIt.title)
    setBody(postIt.body)
  }, [postIt])

  const {attributes, listeners, setNodeRef, transform, transition, setActivatorNodeRef} = useSortable({
    id: id,
  })

  const style = {
    // transform: CSS.Translate.toString(transform),
    transform: CSS.Transform.toString(transform),
    transition
  }

  let handleChange = (e) => {
    switch(e.target.id) {
      case 'title':
        setTitle(e.target.value)
        break
      case 'body':
        setBody(e.target.value)
        break
      default:
        break
    }
  }

  return (
    <div ref={setNodeRef} style={style} >
      <div className={`post-it ${'color' in postIt ? postIt.color : 'p-green'} post-drag`}>
        <div className={`corner ${'color' in postIt ? postIt.color : 'p-green'}-dark`} ref={setActivatorNodeRef} {...listeners} {...attributes} ></div>
        <input className='post-title post-select' id='title' value={title} onChange={handleChange} />
        <textarea className='post-body post-select' id='body' rows={15} value={body} onChange={handleChange} />
      </div>
    </div>
  )
}

export default PostIt