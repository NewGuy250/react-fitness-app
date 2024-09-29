import React, { useState } from "react";
import Header from "./Components/Header/Header";
import AddDay from "./Components/AddDay/AddDay";
import Display from "./Components/Display/Display";

function App() {
  const [splits, setSplits] = useState([]);

  const addSplit = (newSplit) => {
    setSplits([...splits, newSplit]);
  };

  const removeSplit = (index) => {
    // Ask the user for confirmation
    const confirmed = window.confirm(
      "Are you sure you want to delete this split?"
    );

    if (confirmed) {
      const updatedSplits = splits.filter((_, i) => i !== index);
      setSplits(updatedSplits);
    }
  };

  return (
    <div>
      <Header />
      <AddDay addSplit={addSplit} />
      <Display splits={splits} removeSplit={removeSplit} />
    </div>
  );
}

export default App;
