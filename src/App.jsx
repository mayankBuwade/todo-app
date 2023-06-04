import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import DoneList from "./assets/components/DoneList";
import SearchBar from "./assets/components/SearchBar";
import TodoList from "./assets/components/TodoList";

const data = [
  {
    id: 1,
    task: "Complete project proposal",
    isDone: true,
  },
  {
    id: 2,
    task: "Implement login functionality",
    isDone: false,
  },
  {
    id: 3,
    task: "Write unit tests",
    isDone: false,
  },
  {
    id: 4,
    task: "Design user interface",
    isDone: true,
  },
  {
    id: 5,
    task: "Refactor codebase",
    isDone: false,
  },
];

function App() {
  const [list, setList] = useState(data);

  const onAddTodo = (task) => {
    let id = uuidv4();
    let isDone = false;
    setList([...list, { id, isDone, task }]);
  };

  const deleteTodo = (id) => {
    setList(list.filter((ele) => ele.id != id));
  };

  const changeTodoStatus = (id) => {
    setList(
      list.map((todo) => {
        if (todo.id == id) todo.isDone = !todo.isDone;
        return todo;
      })
    );
  };

  return (
    <div className="main-div">
      <SearchBar onAddTodo={onAddTodo} />
      <div className="todo-div">
        <TodoList
          list={list}
          deleteTodo={deleteTodo}
          changeTodoStatus={changeTodoStatus}
        />
        <DoneList
          list={list}
          deleteTodo={deleteTodo}
          changeTodoStatus={changeTodoStatus}
        />
      </div>
    </div>
  );
}

export default App;
