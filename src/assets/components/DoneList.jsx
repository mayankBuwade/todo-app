const DoneList = ({ list, changeTodoStatus, deleteTodo }) => {
  return (
    <div className="list done-list">
      <h2>Done List:-</h2>
      <ul>
        {list?.map(
          (data) =>
            data.isDone && (
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
                    close
                  </span>
                </span>
              </li>
            )
        )}
      </ul>
    </div>
  );
};

export default DoneList;
