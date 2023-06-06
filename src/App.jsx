import { useReducer, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import DoneList from "./assets/components/DoneList";
import SearchBar from "./assets/components/SearchBar";
import TodoList from "./assets/components/TodoList";

function reducer(list, action) {
  switch (action.type) {
    case "add_todo":
      return [
        ...list,
        { id: action.id, isDone: action.isDone, task: action.task },
      ];
    case "delete_todo":
      return list?.filter((ele) => ele.id != action.id);
    case "update-status":
      return list?.map((todo) => {
        if (todo.id === action.id) {
          return { ...todo, isDone: !todo.isDone };
        }
        return todo;
      });
    case "update_task":
      return list?.map((todo) => {
        if (todo.id === action.id) {
          return { ...todo, task: action.task };
        }
        return todo;
      });
    default:
      return list;
  }
}

function App() {
  const [list, dispatch] = useReducer(
    reducer,
    JSON.parse(localStorage.getItem("todos")) ?? []
  );

  useEffect(() => {
    const handleUnload = () => {
      let data = JSON.stringify(list);
      localStorage.setItem("todos", data);
    };

    window.addEventListener("unload", handleUnload);

    return () => {
      window.removeEventListener("unload", handleUnload);
    };
  }, [list]);

  const onAddTodo = (task) => {
    let id = uuidv4();
    let isDone = false;
    dispatch({ type: "add_todo", id, isDone, task });
  };

  const deleteTodo = (id) => {
    dispatch({ type: "delete_todo", id });
  };

  const changeTodoStatus = (id) => {
    dispatch({ type: "update-status", id });
  };

  const onUpdateTodoText = (task, id) => {
    dispatch({ type: "update_task", id, task });
  };

  return (
    <div className="main-div">
      <SearchBar onAddTodo={onAddTodo} />
      <div className="todo-div">
        <TodoList
          list={list}
          deleteTodo={deleteTodo}
          changeTodoStatus={changeTodoStatus}
          onUpdateTodoText={onUpdateTodoText}
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
