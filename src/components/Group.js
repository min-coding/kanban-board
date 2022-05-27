import React from "react";
import trashDefault from '../assets/trash-icon-default.png'
import staffIcon from '../assets/staff-icon.png'

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
        <button key={category} className="addBtn" onClick={toggleModal}> + </button>
        <div className="category-list">
          {tasks
            .filter(task => task.category === category)
            .map(task => {
            return (              
              <div className='task-note' key={task.id} id={task.id} draggable
                onDragStart={() => handleDragStart(task.id, category)}>
                  
                <div className="staff-container">
                  <img className="staff-icon" src={staffIcon} alt='staff-icon'></img>
                  <input className="task-staff" key={task.id} value={task.staff} name='staff'
                    onChange={(event) => editTask(task.id, event)} 
                  />
                  </div>
                
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
              <div id={category} className='note-form task-note'>

                <input
                name='staff'
                className="modal-staff"
                type="text"
                placeholder="Who's in charge?"
                onChange={(e)=>handleChange(category,e)}
                value={input.staff||''}
                >
                </input>
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
              placeholder="Task"
                  onChange={(e) => handleChange(category, e)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        addTask()
                    }
                  }}
              value={input.content||''}
              >
                </input>
              
              </div>
              <div className="button-container">
              <button className="submitBtn" type='submit' onClick={addTask}> Submit </button>
              <button onClick={() => { setIsOpen(false) }}> Close </button>
              </div>
                  </div>
                  </div>
                  
                  } 
    </div>
    </>
  )
}



  