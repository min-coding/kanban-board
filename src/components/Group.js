import React from "react";
import '../App.css'
import TaskPanel from '../components/TaskPanel'

export default function Group({category,tasks,handleDragStart,handleDragOver,handleDrop,handleChange}) {

  return (
    <>    
      <div className=
        {`category-group 
          ${category === 'To-Do' ?'red-bg' :
            category === 'Doing' ? 'yellow-bg' :
            category ==='Process'?  'olive-bg' : 'green-bg'
          }`}
        
        key={category}
        onDragOver= {handleDragOver}
        onDrop={() => handleDrop(category)}>
        
        <div className="category-title">
          {category}
        </div>
        
        <div className="category-list">
          {tasks
            .filter(task => task.category === category)
            .map(task => {
            return (              
              <div className='task-note' key={task.id} id={task.id} draggable
                   onDragStart={()=>handleDragStart(task.id,category)}>
                <textarea className="task-title" name='title' onChange={handleChange} value=''>
                  {task.title}
                </textarea>
                <textarea className="task-content" name='content'>{task.content}</textarea>
            </div>
            )
      })}
        </div>
    </div>
    </>
  )
}



  