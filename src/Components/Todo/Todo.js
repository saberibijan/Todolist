import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { IoMdClose } from "react-icons/io";
import TodoList from '../TodoList/TodoList';

import "./Todo.css"


function Todo() {

    const [isShowAddInput, setIsShowAddInput] = useState(false);
    const [todoTitle, setTodoTitle] = useState("");
    const [todo, setTodo] = useState([
      {id: uuidv4(), title: 'To do', children: [], next: 'Doing' , prev: 'Done'},
      {id: uuidv4(), title: 'Doing', children: [], next:'Done', prev: 'To do'},
      {id: uuidv4(), title: 'Done', children: [], next: 'To do', prev: 'Doing'}
    ])
  
  
    const addTodo = (event) => {
      event.preventDefault()
      if (todoTitle) {
        let newTodoObject = {
          id: uuidv4(),
          title: todoTitle,
          children: [],
        };
        setTodo([...todo, newTodoObject]);
        setTodoTitle("");
      } else {
        setIsShowAddInput(false)
      }
    };
  
    const removeTodo = (id) => {
      let newTodo = todo.filter(item => item.id !== id);
      setTodo(newTodo);
    }
  
    return (
      <div className="app">
        {
          todo.map(item => (
            <TodoList todoList={todo} setTodo={setTodo} key={item.id} todo={item} onRemove={removeTodo} />
          ))
        }
  
        <div>
          <div className={`todo_container ${!isShowAddInput ? "add_todo_name" : null}`}>
            {!isShowAddInput && (
              <div
                className="add_todo"
                onClick={() => setIsShowAddInput((prevState) => !prevState)}
              >
                <button className="add_btn">+</button>
                <span>Add another list</span>
              </div>
            )}
  
            {isShowAddInput && (
              <form onSubmit={addTodo}>
                <div className="add_todo_input">
                    <textarea
                      className="todo_input"
                      type="text"
                      placeholder="Enter list name..."
                      value={todoTitle}
                      onChange={(event) => setTodoTitle(event.target.value)}
                    />
                  <div>
                    <button className="add_todo_btn" type="submit">
                      Add list
                    </button>
                    <button
                      className="add_close_btn"
                      onClick={() => {
                        setIsShowAddInput((prevState) => !prevState)
                        setTodoTitle('')
                      }}
                    >
                      <IoMdClose />
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
  
  
      </div>
    );
  }

export default Todo