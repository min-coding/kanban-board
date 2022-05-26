import './App.css';
import TaskPanel from './components/TaskPanel';
import { nanoid } from 'nanoid'
import React from 'react';
// import trashDefault from '../src/assets/trash-icon-default.png'
import Group from './components/Group';

function App() {
  const [categories, setCategories] = React.useState(['To-Do', 'Doing', 'Reviewing', 'Done'])
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
  const [dragData, setDragData] = React.useState({})

function handleChange(category,e) {
    const { name, value } = e.target
    const uniqueID = nanoid()
    setInput(prev => {
      return (
        {
          ...prev,
          id: uniqueID,
          category: category,
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
        </h1>
        <p>{currentDate} </p>
      </header>
      <div className='board'>
        {categories.map(category => {
          return (
            <>    
              <Group 
                key={category}
                category={category}
                tasks={tasks}
                handleChange={handleChange}
                handleDragStart={handleDragStart}
                handleDragOver={handleDragOver}
                handleDrop={handleDrop}
                input={input}
                // changeCategory={changeCategory}
                addTask={addTask}
                editTask={editTask}
                deleteTask={deleteTask}
                />
    </>
          )
        })}
      </div>
      
      

    </div>
  );
}

export default App;
