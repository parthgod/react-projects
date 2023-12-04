import { useState } from 'react';
import React from "react";
import Todo from './Todo';
import FormTodo from './FormTodo';

const ToDoApp = () => {
    const [todos, setTodos] = useState([]);

    const addTodo = (text) => {
        const newTodos = [...todos, { text }];
        setTodos(newTodos);
    };

    const markTodo = (index) => {
        const newTodos = [...todos];
        newTodos[index].isDone = true;
        setTodos(newTodos);
    };

    const removeTodo = (index) => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };

    return (
        <div className="container">
            <h1 className="title">Todo List</h1>
            <FormTodo addTodo={addTodo} />
            <div>
                {todos.map((todo, index) => (
                        <div>
                            <Todo
                                key={index}
                                index={index}
                                todo={todo}
                                markTodo={markTodo}
                                removeTodo={removeTodo}
                            />
                        </div>
                ))}
            </div>
        </div>
    );
}

export default ToDoApp;