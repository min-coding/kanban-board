import './App.css';
import TaskPanel from './components/TaskPanel';
import { nanoid } from 'nanoid'
import React from 'react';
import trashDefault from '../src/assets/trash-icon-default.png'

function App() {
  // Categories of tasks
  const [categories, setCategories] = React.useState(['To-Do', 'Doing', 'Process', 'Done'])

  const [tasks, setTasks] = React.useState(() => {
    const savedValue = JSON.parse(localStorage.getItem('tasks'))

    if (savedValue) {
      return savedValue
    }
    else {
      return ([])
    }
  })

  React.useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks), [tasks])
  })

  const [input, setInput] = React.useState({})
  const [isOpen, setIsOpen] = React.useState(false)
  const [dragData, setDragData] = React.useState({})

  function toggleModal() {
    setIsOpen(prev => !prev)
  }

function handleChange(event) {
    const { name, value } = event.target
    const uniqueID = nanoid()
    setInput(prev => {
      return (
        {
          ...prev,
          id: uniqueID,
          category: 'To-Do',
          [name]: value,
        }
      )
    })
  }

  function addTask() {
    setTasks(prev => [...prev, input])
    setInput({
      title: '',
      content: ''
    })
  }

  function editTask(id, event) {
      const { name, value } = event.target
      const updateTask =  tasks.map(task => {
          return task.id === id ?
            {
              ...task,
              [name]:value
            } : task
        })

    setTasks(updateTask)
  }

  function deleteTask(id) {
    setTasks(
      tasks.filter(task=> task.id !== id)
    )
  }

// To start drag event
function handleDragStart(id, category) {
  setDragData({
    id: id,
    category: category
  })
}
function handleDragOver(event) {
  event.preventDefault();
}
  
function changeCategory(id, newCategory) {
  setTasks(prevTasks => prevTasks.map(task => {
    return task.id === id ?
      {...task,category : newCategory}:task
  }))
}
  
function handleDrop(category) {
  const selectedTask = dragData.id
  changeCategory(selectedTask, category)
}
  
const currentDate = new Date().toDateString()

  return (
    <div className="App">
      <header className='app-header'>
        <h1>
          Your Kanban board
          hello hey test commit 
        </h1>
        <p>{currentDate} </p>
      </header>

      <div className='board'>
        {categories.map(category => {
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
    </div>
    </>
          )
        })}
      </div>
      <div className='btn-container'>

      <button className="addBtn" onClick={toggleModal}> + </button>
      </div>
      {/* Modal div */}
      {isOpen &&
        <div className='overlay'>
        <div className='modal'>
            <input
              name='title'
              className="modal-title"
              type="text"
              placeholder="Title"
              onChange={handleChange}
              value={input.title||''}
              >
            </input>
            <input
              name='content'
              className="modal-content"
              type="text"
              placeholder="Take a note"
              onChange={handleChange}
              value={input.content||''}
              >
            </input>
              <button type='submit' onClick={addTask}> Submit </button>
              <button onClick={() => {setIsOpen(false) }}> Close </button>
          </div>
      </div>
      }

    </div>
  );
}

export default App;
