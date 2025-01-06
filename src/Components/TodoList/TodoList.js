import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";
import "./TodoList.css";

function TodoList(props) {
  const [isShowAddInput, setIsShowAddInput] = useState(false);
  const [todos, setTodos] = useState([]);
  const [todoTitle, setTodoTitle] = useState("");

  const addTodo = (event) => {
    event.preventDefault()
    if (todoTitle) {
      let newTodoObject = {
        id: todos.length + 1,
        title: todoTitle,
      };

      setTodos((prevState) => {
        return [...prevState, newTodoObject];
      });

      setTodoTitle("");
    }else{
        setIsShowAddInput(false)
    }
  };

  const removeTodo = (todoId) => {
    let newTodos = todos.filter((todo) => {
      return todo.id !== todoId;
    });

    setTodos(newTodos);
  };

  const removeClickHandler = (id)=>{
    props.onRemove(id)
  }

  return (
    <div>
      <div className="todo_container">
        <div className="title_container">
        <h2 className="todo_title">{props.title}</h2>
        <button className="todo_item_btn" onClick={() => removeClickHandler(props.id)}>
                <FaRegTrashAlt />
        </button>
        </div>

        <ul className="todo_list">
          {todos.map((item) => (
            <li key={item.id} className="todo_item">
              <span>{item.title}</span>
               <div>
               <button
               className="todo_item_btn edit_btn"
               >
                    <MdModeEdit/>
                </button>
              <button
                className="todo_item_btn"
                onClick={() => removeTodo(item.id)}
              >
                <FaRegTrashAlt />
              </button>
               </div>
            </li>
          ))}
        </ul>

        {!isShowAddInput && (
          <div
            className="add_todo"
            onClick={() => setIsShowAddInput((prevState) => !prevState)}
          >
            <button className="add_btn">+</button>
            <span>Add a card</span>
          </div>
        )}

        {isShowAddInput && (
          <form onSubmit={addTodo}>
            <div className="add_todo_input">
            <textarea
              className="todo_input"
              type="text"
              placeholder="Enter a title or paste a link"
              value={todoTitle}
              onChange={(event) => setTodoTitle(event.target.value)}
            />
            <div>
              <button className="add_todo_btn" type="submit" >
                Add card
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
  );
}

export default TodoList;
