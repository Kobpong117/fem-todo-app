import SingleTodo from "./SingleTodo"

const TodoList = ({showTodos, removeTodo, updateCompleted, enterEditMode, DragDropContext, Droppable, Draggable, handleOnDragEnd}) => {

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="todos">
        {(provided) => (
          <section {...provided.droppableProps} ref={provided.innerRef} id="my-todos">
            {showTodos && showTodos.map((todo, index) => {
              return (
                <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                  {(provided,snapshot) => {  
                    if (snapshot.isDragging) {
                      provided.draggableProps.style.left = provided.draggableProps.style.offsetLeft;
                      provided.draggableProps.style.top = provided.draggableProps.style.offsetTop;
                    }
                   
                   return (

                        <article
                          className="single-todo"
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          
                        >
                          <SingleTodo 
                            id={todo.id}
                            todo={todo} 
                            removeTodo={removeTodo} 
                            updateCompleted={updateCompleted}
                            enterEditMode={enterEditMode}
                          />
                        </article>
                   )
                  }}
                </Draggable>
              )
            })}
            {provided.placeholder}
          </section>
        )}
      </Droppable>
    </DragDropContext>
    
  )
}
export default TodoList