import React, { useState } from "react";
import "./AddDay.css";

function AddDay({ addSplit }) {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    if (inputValue.trim() !== "") {
      addSplit(inputValue);
      setInputValue("");
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };
  return (
    <div className="add-day">
      <label>Gym-Split: </label>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleEnter}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

export default AddDay;
