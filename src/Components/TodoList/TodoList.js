import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";
import DeleteModal from "../DeleteModal/DeleteModal";
import "./TodoList.css";
import EditModal from "../EditModal/EditModal";

function TodoList(props) {
  const [isShowAddInput, setIsShowAddInput] = useState(false);
  const [todos, setTodos] = useState([]);
  const [todoTitle, setTodoTitle] = useState("");
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [todoId, setTodoId] = useState(null);
  const [todoNewValu, setTodoNewValue] = useState("");

  const addTodo = (event) => {
    event.preventDefault();
    if (todoTitle) {
      let newTodoObject = {
        id: todos.length + 1,
        title: todoTitle,
      };

      setTodos((prevState) => {
        return [...prevState, newTodoObject];
      });

      setTodoTitle("");
    } else {
      setIsShowAddInput(false);
    }
  };

  const removeTodo = (todoId) => {
    let newTodos = todos.filter((todo) => {
      return todo.id !== todoId;
    });

    setTodos(newTodos);
  };

  const deleteModalCancelAction = () => {
    setIsShowDeleteModal(false);
  };
  const deleteModalSubmitAction = (id) => {
    props.onRemove(todoId);
    setIsShowDeleteModal(false);
  };

  const todoUpdate = () => {
    if (todoNewValu) {
      let ntodo = todos.find((item) => item.id === todoId);
      ntodo.title = todoNewValu;
    }

    setTodoNewValue("");
    setIsShowEditModal(false);
  };

  return (
    <div>
      <div className="todo_container">
        <div className="title_container">
          <h2 className="todo_title">{props.title}</h2>
          <button
            className="todo_item_btn"
            onClick={() => {
              setIsShowDeleteModal(true);
              setTodoId(props.id);
            }}
          >
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
        <DeleteModal
          submitAction={deleteModalSubmitAction}
          cancelAction={deleteModalCancelAction}
        />
      )}

      {isShowEditModal && (
        <EditModal>
          <h1>Enter you Todo</h1>
          <input
            type="text"
            className="todo_input"
            placeholder="Enter a title or paste a link"
            value={todoNewValu}
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
