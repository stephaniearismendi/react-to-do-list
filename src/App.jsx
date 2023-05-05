import React, { Fragment, useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { TodoList } from "./components/TodoList";
import "./App.css";

const KEY = "todoApp.todos";

export function App() {
  const [todos, setTodos] = useState([]);

  const todoTaskRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(KEY));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(todos));
  }, [todos]);

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  };

  const handleToDoAdd = () => {
    const task = todoTaskRef.current.value;
    if (task === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), task, completed: false }];
    });
    todoTaskRef.current.value = null;
  };

  const handleClearAll = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };

  return (
    <Fragment>
      <div className="container">
        <div className="todo-app">
          <h1>Lista de tareas</h1>
          <TodoList todos={todos} toggleTodo={toggleTodo} />
          <div className="add-todo">
            <input ref={todoTaskRef} type="text" placeholder="Nueva tarea" />
            <button className="addButton" onClick={handleToDoAdd}>➕</button>
            <button className="clearButton" onClick={handleClearAll}>🗑️</button>
          </div>
          <div className="remaining-todos">
          ⚠️ Te quedan {todos.filter((todo) => !todo.completed).length} tareas
            por terminar
          </div>
        </div>
      </div>
    </Fragment>
  );
}
