const TodoList = ({ list, deleteTodo, changeTodoStatus }) => {
  return (
    <div className="list todo-list">
      <h2>Todo List:-</h2>
      <ul>
        {list?.map(
          (data) =>
            !data.isDone && (
              <li key={data.id}>
                <span>{data.task}</span>
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
