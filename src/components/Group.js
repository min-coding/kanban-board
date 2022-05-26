import React from "react";
import '../App.css'
import trashDefault from '../assets/trash-icon-default.png'
import TaskPanel from '../components/TaskPanel'

export default function Group({ category, tasks, handleChange, handleDragStart, handleDragOver, handleDrop, toggleModal, addTask, editTask, deleteTask, input }) {
  function toggleModal() {
    setIsOpen(prev => !prev)
  }
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <>    
      <div className=
        {`category-group 
          ${category === 'To-Do' ?'red-bg' :
            category === 'Doing' ? 'yellow-bg' :
            category ==='Reviewing'?  'olive-bg' : 'green-bg'
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
                onDragStart={() => handleDragStart(task.id, category)}>
                
                <textarea className="task-title" key={task.id} value={task.title} name='title'
                  onChange={(event)=> editTask(task.id,event) }
                  >
                  {task.title}
                </textarea>

                <textarea className="task-content" key={task.id} value={task.content} name='content'
                onChange={(event) => editTask(task.id, event)} 
                >{task.content}</textarea>
                <img className='deleteBtn' onClick={() => deleteTask(task.id)} src={trashDefault}/>
            </div>
            )
            })}
            </div>
                {isOpen &&
        <div className='overlay'> 
                 <div className='modal'> 
            <div id={category} className='note-form'>    
            <input
              name='title'
              className="modal-title"
              type="text"
              placeholder="Title"
              onChange={(e)=>handleChange(category,e)}
              value={input.title||''}
              >
            </input>
            <input
              name='content'
              className="modal-content"
              type="text"
              placeholder="Take a note"
              onChange={(e)=>handleChange(category,e)}
              value={input.content||''}
              >
              </input>
              <button type='submit' onClick={addTask}> Submit </button>
              <button onClick={() => { setIsOpen(false) }}> Close </button>
        </div>
                  </div>
                  </div>
                  
                  } 

          <button key={category} className="addBtn" onClick={toggleModal}> + </button>
    </div>
    </>
  )
}



  