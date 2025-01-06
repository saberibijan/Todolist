import TodoList from "./Components/TodoList/TodoList";
import "./App.css";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

function App() {
//   const todoArr = [
//     {title: "to do", id: 1 , children: [{title: 'kickoff meeting'}, {title: 'learn react'}]},
//     {title: 'doing', id:2, }
// ]

const [isShowAddInput, setIsShowAddInput] = useState(false);
 const [todoTitle, setTodoTitle] = useState("");
const [todo, setTodo] = useState([
  {id:1, title:'To do'},
  {id: 2, title: 'Doing'},
  {id:3 ,title: 'Done'}
])


const addTodo = (event) => {
  event.preventDefault()
  if (todoTitle) {
    let newTodoObject = {
      id: todo.length + 1,
      title: todoTitle,
    };

    setTodo((prevState) => {
      return [...prevState, newTodoObject];
    });

    setTodoTitle("");
  }else{
      setIsShowAddInput(false)
  }
};

const removeTodo = (id)=>{
  let newTodo = todo.filter(item => item.id !== id);
  setTodo(newTodo);
}
  return (
    <div className="app">
      {
        todo.map(item => (
          <TodoList key={item.id} {...item} onRemove={removeTodo}/>
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
                    <button className="add_todo_btn" type="submit" >
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

export default App;
