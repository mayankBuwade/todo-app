import { useState } from "react";

const SearchBar = ({ onAddTodo }) => {
  const [textData, setTextData] = useState("");

  const onButtonClick = () => {
    if (!textData) return;
    onAddTodo(textData);
    setTextData("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      if (!textData) return;
      onAddTodo(textData);
      setTextData("");
    }
  };

  return (
    <div className="search-bar">
      <span>
        <input
          onKeyDown={(e) => handleKeyDown(e)}
          value={textData}
          onChange={(e) => {
            setTextData(e.target.value);
          }}
        />
        <button onClick={onButtonClick}>Add Todo</button>
      </span>
    </div>
  );
};

export default SearchBar;
