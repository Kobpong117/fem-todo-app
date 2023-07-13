import { AiFillEdit } from "react-icons/ai";

const SingleTodo = ({todo, removeTodo, updateCompleted, enterEditMode}) => {
  
  const {id, title, completed} = todo

  const check = '../images/icon-check.svg'
  const cross = '../images/icon-cross.svg'

  const completed_todo = completed ? 'completed-todo' : ''

  return (
    <>
      <div className="input-field">
        <div 
          className="round-checkbox"
          onClick={() => updateCompleted(id)}
          style={{background: completed 
            ? "linear-gradient(90deg,hsl(192, 100%, 67%),hsl(280, 87%, 65%))" 
            : "transparent"}}
        >
          {completed && <img src={check} className="check"/>}
        </div>          
        <p 
          className={`todo-title ${completed_todo}`}
          
        >{title}</p>  
      </div>     
      <div className="update-todo">       
        <AiFillEdit 
          className="edit-icon" 
          onClick={() => enterEditMode(todo)}
        />       
        <button type="submit" className="delete-todo" onClick={() => removeTodo(id)}>
          <img src={cross} alt="delete-item" className="cross-icon"/>
        </button>
      </div>
    </>
  )
}
export default SingleTodo