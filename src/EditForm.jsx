import { useState } from "react";
import { BsPlus } from "react-icons/bs";

const EditForm = ({ editedTodo, updateTodo}) => {
  
    const [updatedTodoTitle, setUpdatedTodoTitle] = useState(editedTodo.title)

    const handleSubmit = (event) => {
      event.preventDefault()
      updateTodo({...editedTodo, title: updatedTodoTitle})
    }


  return (
    <div className="edit-form">
      <form className="todo-form edit" onSubmit={handleSubmit}>
        <div className="input-field">
          <div 
            className="round-checkbox"
            style={{background: "transparent"}}
          >
          </div>          
          <input 
            type="text" 
            id="editTodo"
            value={updatedTodoTitle}
            placeholder="Update Todo"
            className="input-todo"
            onChange={(e) => setUpdatedTodoTitle(e.target.value)}
          />   
        </div>     
        <div>
          <button type="submit"><BsPlus className="plus-btn"/></button>
        </div>
      </form>
    </div>
  )
}
export default EditForm

