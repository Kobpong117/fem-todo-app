import { useState } from "react";
import { BsPlus } from "react-icons/bs";

const Form = ({ isDarkMode, toggleDarkMode, addTodo }) => {
  
    const [input, setInput] = useState('')
    const moon = '../images/icon-moon.svg'
    const sun = '../images/icon-sun.svg'

    const handleSubmit = (event) => {
      event.preventDefault()
      addTodo(input)
      setInput('')
    }

  return (
    <header>
        <div className="header">
            <h1 className="title">todo</h1>
            <img 
                src={isDarkMode ? sun : moon} 
                alt={isDarkMode ? 'sun-icon' : 'moon-icon'} 
                className='dark-icon'               
                onClick={toggleDarkMode}
            />
        </div>
        <form className="todo-form" onSubmit={handleSubmit}>
          <div className="input-field">
            <div 
              className="round-checkbox"
              style={{background: "transparent"}}
            >
            </div>          
            <input 
              type="text" 
              value={input}
              placeholder="Create a new todo..."
              className="input-todo"
              onChange={(e) => setInput(e.target.value)}
            />   
          </div>     
          <div>
            <button type="submit"><BsPlus className="plus-btn"/></button>
          </div>
        </form>
    </header>
  )
}
export default Form