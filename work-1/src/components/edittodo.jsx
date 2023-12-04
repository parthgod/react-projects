import { useState } from "react";
import Todo from "./Todo";

const EditTodo=()=>{
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  const handleInputChange=(e)=>{
    setTodo(e.target.value);
  }

  const handleEditInputChange=(e)=>{
    setCurrentTodo({ ...currentTodo, text: e.target.value });
    console.log(currentTodo);
  }

  const handleFormSubmit=(e)=>{
    e.preventDefault();

    if (todo !== "") {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          text: todo.trim(),
          isDone: false,
        }
      ]);
    }
    setTodo("");
  }

  const handleMarkTodo = (id) => {
    const newTodos = [...todos];
    newTodos[id].isDone = true;
    setTodos(newTodos);
  };

  const handleEditFormSubmit=(e)=>{
    e.preventDefault();

    handleUpdateTodo(currentTodo.id, currentTodo);
  }

  const handleDeleteClick=(id)=>{
    const removeItem = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(removeItem);
  }

  const handleUpdateTodo=(id, updatedTodo)=>{
    const updatedItem = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });
    setIsEditing(false);
    setTodos(updatedItem);
  }

  const handleEditClick=(todo)=>{
    setIsEditing(true);
    setCurrentTodo({ ...todo });
  }

  return (
    <div className="container">
      <h1 className="title">Todo List</h1>
      {isEditing &&
        <form onSubmit={handleEditFormSubmit} className="form-container">
          <label htmlFor="editTodo">Edit todo: </label>
          <input
            name="editTodo"
            type="text"
            placeholder="Edit todo"
            value={currentTodo.text}
            onChange={handleEditInputChange}
            className="form-input"
          />
          <button type="submit" className="btn">Update</button>
          <button onClick={() => setIsEditing(false)} className="btn">Cancel</button>
        </form>}
      {!isEditing &&
        <form onSubmit={handleFormSubmit} className="form-container">
          <label htmlFor="todo">Add todo: </label>
          <input
            type="text"
            placeholder="Create a new todo"
            value={todo}
            onChange={handleInputChange}
            className="form-input"
          />
          <button type="submit" className="btn">Add</button>
        </form>}
      

      <div className="todo-list">
        {todos.map((todo) => (
          <Todo 
          todo={todo}
          handleMarkTodo={handleMarkTodo} 
          handleDeleteClick={handleDeleteClick}
          handleEditClick={handleEditClick}/>
        ))}
      </div>
    </div>
  );
}

export default EditTodo;