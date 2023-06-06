import { useState, useEffect, useRef } from "react";

const TodoList = ({ list, deleteTodo, changeTodoStatus, onUpdateTodoText }) => {
  const [text, setText] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const inputRefs = useRef([]);

  const handleKeyDown = (event, id) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      onUpdateTodoText(text, id);
      setIsEditing(null);
    }
  };

  const handleDoubleClick = (index, task) => {
    setIsEditing(index);
    setText(task);
  };

  useEffect(() => {
    if (isEditing !== null) {
      const inputRef = inputRefs.current[isEditing];
      if (inputRef) {
        inputRef.focus();
      }
    }
  }, [isEditing]);

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const handleOutsideClick = (event) => {
    const isClickedOutside = inputRefs.current.every(
      (ref) => ref && !ref.contains(event.target)
    );

    if (isClickedOutside && text && isEditing !== null) {
      onUpdateTodoText(text, list[isEditing].id);
      setIsEditing(null);
    }
    if (event.type === "mousedown") inputRefs.current = [];
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleOutsideClick);
    window.addEventListener("touchstart", handleOutsideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [isEditing, text]);

  return (
    <div className="list todo-list">
      <h2>Todo List:-</h2>
      <ul>
        {list?.map(
          (data, index) =>
            !data.isDone && (
              <li key={data.id}>
                {isEditing !== index ? (
                  <span
                    onDoubleClick={() => handleDoubleClick(index, data.task)}
                    className="list-data"
                  >
                    {data.task}
                  </span>
                ) : (
                  <input
                    className="update-data-input"
                    value={text}
                    onChange={handleInputChange}
                    onKeyDown={(e) => handleKeyDown(e, data.id)}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                  />
                )}
                <span className="update-data-span">
                  <span
                    className="material-symbols-outlined"
                    onClick={() => deleteTodo(data.id)}
                  >
                    delete
                  </span>
                  <span
                    className="material-symbols-outlined"
                    onClick={() => changeTodoStatus(data.id)}
                  >
                    done
                  </span>
                </span>
              </li>
            )
        )}
      </ul>
    </div>
  );
};

export default TodoList;
