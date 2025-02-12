import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import EditModal from "../Modal/Modal";
import "./TodoList.css";

function TodoList({ todo, onRemove, setTodo, todoList }) {
  const [isShowAddInput, setIsShowAddInput] = useState(false);
  const [todoTitle, setTodoTitle] = useState("");
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [todoId, setTodoId] = useState(null);
  const [todoNewValue, setTodoNewValue] = useState("");

  const addTodo = (event) => {
    event.preventDefault();
    if (todoTitle) {
      let newTodoChild = {
        id: uuidv4(),
        title: todoTitle,
      };

      const newTodoList = todoList.map((todoListItem) => {
        if (todoListItem.id === todo.id) {
          return {
            ...todo,
            children: [...todo.children, newTodoChild],
          };
        }
        return todoListItem;
      });
      setTodo(newTodoList);
      setTodoTitle("");
    } else {
      setIsShowAddInput(false);
    }
  };

  const handleKeyUd = (event)=>{
    if(event.keyCode === 13){
      addTodo(event)
    }
  }

  const removeTodo = (todoId) => {
    let newTodos = todoList.map((todoListItem) => {
      return {
        ...todoListItem,
        children: todoListItem.children.filter((item) => item.id !== todoId),
      };
    });
    setTodo(newTodos);
  };

  const deleteModalCancelAction = () => {
    setIsShowDeleteModal(false);
  };

  const deleteModalSubmitAction = (id) => {
    onRemove(todoId);
    setIsShowDeleteModal(false);
  };

  const todoUpdate = () => {
    if (todoNewValue) {
      let newValue = todoList.map((todoListItem) => {
        const newChildren = todoListItem.children.map((item) => {
          if (item.id === todoId) {
            return {
              ...item,
              title: todoNewValue,
            };
          } else {
            return item;
          }
        });
        return {
          ...todoListItem,
          children: newChildren,
        };
      });
      setTodo(newValue);
    }

    setTodoNewValue("");
    setIsShowEditModal(false);
  };

  const moveTask = (taskId, direction) => {
    setTodo(prevTodo => {

      const statuses = prevTodo.map(status => status.title);
      const fromIndex = prevTodo.findIndex(status => 
        status.children.some(task => task.id === taskId)
      );
  
      if (fromIndex === -1) {
        return prevTodo; 
      }
  
      const fromStatus = prevTodo[fromIndex];
      let nextStatusIndex = statuses.indexOf(fromStatus.title) + direction; 
  
      if (nextStatusIndex < 0 || nextStatusIndex >= statuses.length) {
        return prevTodo; 
      }
  
      const nextStatusTitle = statuses[nextStatusIndex];
      const toIndex = prevTodo.findIndex(status => status.title === nextStatusTitle);
      const updatedTodo = JSON.parse(JSON.stringify(prevTodo)); 
  
      const taskIndex = updatedTodo[fromIndex].children.findIndex(task => task.id === taskId);
      const taskToMove = updatedTodo[fromIndex].children[taskIndex];
  
      if (!taskToMove) {
        return prevTodo; 
      }
  
      updatedTodo[fromIndex].children.splice(taskIndex, 1);
      updatedTodo[toIndex].children.push(taskToMove);
  
      return updatedTodo;
    });
  };
  

  return (
    <div>
      <div className="todo_container">
        <div className="title_container">
          <h2 className="todo_title">{todo.title}</h2>
          <button
            className="todo_item_btn"
            onClick={() => {
              setIsShowDeleteModal(true);
              setTodoId(todo.id);
            }}
          >
            <FaRegTrashAlt />
          </button>
        </div>

        <ul className="todo_list">
          {todo.children.map((item) => (
            <li key={item.id} className="todo_item">
              <span>{item.title}</span>
              <div>
                <button
                  className="todo_item_btn edit_btn"
                  onClick={() => {
                    moveTask(item.id, -1)
                  }}
                >
                  <FaArrowCircleLeft />
                </button>
                <button
                  className="todo_item_btn edit_btn"
                  onClick={() => {
                    moveTask(item.id, 1)
                  }}
                >
                  <FaArrowCircleRight />
                </button>
                <button
                  className="todo_item_btn edit_btn"
                  onClick={() => {
                    setIsShowEditModal(true);
                    setTodoId(item.id);
                  }}
                >
                  <MdModeEdit />
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
                onKeyUp={handleKeyUd}
              />
              <div>
                <button className="add_todo_btn" type="submit">
                  Add card
                </button>
                <button
                  className="add_close_btn"
                  onClick={() => {
                    setIsShowAddInput((prevState) => !prevState);
                    setTodoTitle("");
                  }}
                >
                  <IoMdClose />
                </button>
              </div>
            </div>
          </form>
        )}
      </div>

      {isShowDeleteModal && (
        <EditModal>
          <h1>Are you sure to delete?</h1>
          <div className="delete-modal-btns">
            <button
              className="delete-btn delete-modal-accept-btn"
              onClick={() => deleteModalSubmitAction()}
            >
              Yes
            </button>
            <button
              className="delete-btn delete-modal-reject-btn"
              onClick={() => deleteModalCancelAction()}
            >
              No
            </button>
          </div>
        </EditModal>
      )}

      {isShowEditModal && (
        <EditModal>
          <h1>Enter you Todo</h1>
          <input
            type="text"
            className="todo_input"
            placeholder="Enter a title or paste a link"
            value={todoNewValue}
            onChange={(event) => setTodoNewValue(event.target.value)}
          />
          <div className="delete-modal-btns">
            <button
              className="delete-btn delete-modal-accept-btn"
              onClick={() => todoUpdate()}
            >
              Yes
            </button>
            <button
              className="delete-btn delete-modal-reject-btn"
              onClick={() => setIsShowEditModal(false)}
            >
              No
            </button>
          </div>
        </EditModal>
      )}
    </div>
  );
}

export default TodoList;
