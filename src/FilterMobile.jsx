const Filter = ({todoLeft, removeCompleted, showAllTodos, showActiveTodos, showCompletedTodos, selectedFilter}) => {
  
  return (
    <article>
      <section className="completed">
        <div>{todoLeft} item{todoLeft > 1 ? 's':''} left</div>
        <button className="btn" onClick={() => removeCompleted(selectedFilter)}>clear completed</button>
      </section>
      <section className="filter">
        <button 
          className="btn" 
          onClick={() => showAllTodos('all')}
          style={{color: selectedFilter==='all' && 'hsl(220, 98%, 61%)'}}
        >all
        </button>
        <button 
          className="btn" 
          onClick={() => showActiveTodos('active')}
          style={{color: selectedFilter==='active' && 'hsl(220, 98%, 61%)'}}
        >active
        </button>
        <button 
          className="btn" 
          onClick={() => showCompletedTodos('completed')}
          style={{color: selectedFilter==='completed' && 'hsl(220, 98%, 61%)'}}
        >completed
        </button>
      </section>
    </article>
  )
}
export default Filter