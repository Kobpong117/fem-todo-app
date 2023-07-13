import { useState } from "react";
import { BsPlus } from "react-icons/bs";


const EditFormBs = ({ editedTodo, updateTodo }) => {

    const [updatedTodoTitle, setUpdatedTodoTitle] = useState(editedTodo.title)

    const handleSubmit = (event) => {
      event.preventDefault()
      updateTodo({...editedTodo, title: updatedTodoTitle})
    }

  return (
    <div className="modal" tabindex="-1">
        <div classNameName="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Edit Todo</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form className="todo-form" onSubmit={handleSubmit}>
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
                            <button type="submit" data-bs-dismiss="modal"><BsPlus className="plus-btn"/></button>
                        </div>
                    </form>
                </div>            
            </div>
        </div>
    </div>
  )
}
export default EditFormBs