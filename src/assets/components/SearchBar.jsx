import { useState } from "react";

const SearchBar = ({ onAddTodo }) => {
  const [textData, setTextData] = useState("");
  const onButtonClick = () => {
    if (!textData) return;
    onAddTodo(textData);
    setTextData("");
  };
  return (
    <div className="search-bar">
      <span>
        <input onChange={(e) => setTextData(e.target.value)} value={textData} />
        <button onClick={onButtonClick}>Add Todo</button>
      </span>
    </div>
  );
};

export default SearchBar;
