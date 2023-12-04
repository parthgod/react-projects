const Todo=({todo,handleMarkTodo,handleDeleteClick,handleEditClick,marked})=> {
    return (
        <div key={todo.id} className="todo">
            <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>{todo.text}</span>
            <div>
              {!todo.isDone && <button className="checkbtn r" onClick={() => handleMarkTodo(todo.id - 1)}>✓</button>}
              <button onClick={() => handleDeleteClick(todo.id)} className="checkbtn w">✕</button>
              {!todo.isDone && <button onClick={() => handleEditClick(todo)} className="checkbtn">Edit</button>}
            </div>
          </div>
    )
}

export default Todo;