import { useEffect, useState } from 'react'
import './App.css'
import Form from './Form'
import TodoList from './TodoList'
import FilterMobile from './FilterMobile'
import { nanoid } from 'nanoid'
import EditForm from './EditForm'
import { DragDropContext, Draggable } from 'react-beautiful-dnd'
import { StrictModeDroppable as Droppable} from './helpers/StrictModeDroppable'

function App() {

  const [isDarkMode, setIsDarkMode] = useState(true)
  const [todos, setTodos] = useState([])
  const [showTodos, setShowTodos] = useState(todos)
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [editedTodo, setEditedTodo] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  const setLocalStorage = items => {
    localStorage.setItem('todoItems', JSON.stringify(items))
  }

  const getTodoItemsFromLocalStorage = () => {
    const todoItems = JSON.parse(localStorage.getItem('todoItems') || '[]')
    // console.log(todoItems)
    if (!todoItems) return
    setTodos(todoItems)
    setShowTodos(todoItems)
  }

  useEffect(() => {
    getTodoItemsFromLocalStorage()
  }, [])

  const todoLeft = todos.filter(todo => todo.completed === false).length

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const addTodo = (input) => {
    
    if (!input) return;

    const newTodo = {
      id: nanoid(),
      title: input,
      completed: false,
    }

    const newTodos = [...todos, newTodo]

    setTodos(newTodos)
    setShowTodos(newTodos)
    setLocalStorage(newTodos)
  }

  const removeTodo = (id) => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
    setShowTodos(newTodos)
    setLocalStorage(newTodos)
  }
  
  // Remove completed item - fired when click 'Clear Complete' button
  const removeCompleted = (filter) => {
    const newTodos = todos.filter(todo => todo.completed === false)
    setTodos(newTodos)
    setLocalStorage(newTodos)

    if (filter === 'completed') {
      setShowTodos('')
      return;
    }
    setShowTodos(newTodos)
  }

  const updateCompleted = (id) => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        const newTodo = {...todo, completed: !todo.completed}
        return newTodo
      }

      return todo
    })
   
    setTodos(newTodos)
    setShowTodos(newTodos)
    setLocalStorage(newTodos)
  }

  const updateTodo = (selectedTodo) => {
    const newTodos = todos.map(todo => {
      if (todo.id === selectedTodo.id ) {
        const newTodo = {...todo, title: selectedTodo.title}
        return newTodo
      }
      return todo
    })
   
    setTodos(newTodos)
    setShowTodos(newTodos)
    setLocalStorage(newTodos)
    closeEditMode()
  }

  const closeEditMode = () => {
    setIsEditing(false)
  }

  const enterEditMode = (todo) => {
    setEditedTodo(todo)
    setIsEditing(true)  
  }

  const showAllTodos = (filter) => {
    setShowTodos(todos)
    setSelectedFilter(filter)
  }

  const showActiveTodos = (filter) => {
    const activeTodos = todos.filter(todo => todo.completed === false)
    setShowTodos(activeTodos)
    setSelectedFilter(filter)
  }

  const showCompletedTodos = (filter) => {
    const completedTodos = todos.filter(todo => todo.completed === true)
    setShowTodos(completedTodos)
    setSelectedFilter(filter)
  }

  const handleOnDragEnd = (result) => {
    if (!result.destination) return

    const tasks = [...todos]

    const [reorderedItem] = tasks.splice(result.source.index, 1)

    tasks.splice(result.destination.index, 0, reorderedItem)

    // console.log(tasks)

    setTodos(tasks)
    setShowTodos(tasks)
    setLocalStorage(tasks)
  }

  const theme = isDarkMode ? 'dark' : 'light'
  const editing = isEditing ? 'edit-mode' : ''

  return (
    <main>
      <section className={`container ${theme} ${editing}`}>
        <Form 
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          addTodo={addTodo}
        />
        <section className='show-todo'>
          { isEditing && <EditForm
                            editedTodo={editedTodo}
                            updateTodo={updateTodo}
                          />                     
          }
          
          <TodoList 
            showTodos={showTodos} 
            removeTodo={removeTodo} 
            updateCompleted={updateCompleted}
            enterEditMode={enterEditMode}
            DragDropContext={DragDropContext}
            Droppable={Droppable}
            Draggable={Draggable}
            handleOnDragEnd={handleOnDragEnd}
          />
       
          <FilterMobile 
            todoLeft={todoLeft} 
            removeCompleted={removeCompleted}
            showAllTodos={showAllTodos}
            showActiveTodos={showActiveTodos}
            showCompletedTodos={showCompletedTodos}
            selectedFilter={selectedFilter}
          />
        </section>
      </section>
    </main>
  )
}

export default App
