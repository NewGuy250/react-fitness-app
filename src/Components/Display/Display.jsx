import React, { useState } from "react";
import "./Display.css";

function Display({ splits, removeSplit }) {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [exerciseDetails, setExerciseDetails] = useState({
    exercise: "",
    sets: "",
    reps: "",
    weight: "",
  });
  const [exerciseList, setExerciseList] = useState({});
  const [editingExercise, setEditingExercise] = useState(null);

  const toggleDropdown = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExerciseDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleAddExercise = (e, index) => {
    e.preventDefault();

    if (
      !exerciseDetails.exercise ||
      !exerciseDetails.sets ||
      !exerciseDetails.reps ||
      !exerciseDetails.weight
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const newExercise = { ...exerciseDetails };

    setExerciseList((prevList) => {
      const updatedList = { ...prevList };
      if (!updatedList[index]) {
        updatedList[index] = [];
      }
      updatedList[index] = [...updatedList[index], newExercise];
      return updatedList;
    });

    setExerciseDetails({ exercise: "", sets: "", reps: "", weight: "" });
  };

  const handleEditExercise = (index, i) => {
    const selectedExercise = exerciseList[index][i];
    setEditingExercise({ index, i, ...selectedExercise });
  };

  const handleSaveEdit = () => {
    setExerciseList((prevList) => {
      const updatedList = { ...prevList };
      updatedList[editingExercise.index][editingExercise.i] = {
        exercise: editingExercise.exercise,
        sets: editingExercise.sets,
        reps: editingExercise.reps,
        weight: editingExercise.weight,
      };
      return updatedList;
    });
    setEditingExercise(null);
  };

  const handleDeleteExercise = (index, i) => {
    setExerciseList((prevList) => {
      const updatedList = { ...prevList };
      updatedList[index].splice(i, 1);
      return updatedList;
    });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingExercise((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <div className="display">
      <ul>
        {splits.map((split, index) => (
          <React.Fragment key={index}>
            {/*Split Item*/}
            <li>
              <div className="split-item" onClick={() => toggleDropdown(index)}>
                {split}
                {/*Trash Button*/}
                <button
                  className="remove-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeSplit(index);
                  }}
                  aria-label="Remove Split"
                >
                  &#x1F5D1;
                </button>
              </div>
            </li>
            {/*Exercise Dropdown*/}
            {expandedIndex === index && (
              <li>
                <div className="exercise-dropdown">
                  <h3>Add Exercise to {split}</h3>

                  {/* Input fields with labels on the same row */}
                  <div className="input-row">
                    <label>Exercise: </label>
                    <input
                      type="text"
                      name="exercise"
                      value={exerciseDetails.exercise}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="input-row">
                    <label>Sets: </label>
                    <input
                      type="number"
                      name="sets"
                      value={exerciseDetails.sets}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="input-row">
                    <label>Reps: </label>
                    <input
                      type="number"
                      name="reps"
                      value={exerciseDetails.reps}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="input-row">
                    <label>Weight: </label>
                    <input
                      type="number"
                      name="weight"
                      value={exerciseDetails.weight}
                      onChange={handleInputChange}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={(e) => handleAddExercise(e, index)}
                  >
                    Add Exercise
                  </button>
                  {/*Exercise List*/}
                  {exerciseList[index] && exerciseList[index].length > 0 && (
                    <div className="exercise-list">
                      <h4>Exercises:</h4>
                      <ul>
                        {exerciseList[index].map((exercise, i) => (
                          <li key={i}>
                            {/*Edit Exercise*/}
                            {editingExercise &&
                            editingExercise.index === index &&
                            editingExercise.i === i ? (
                              <>
                                <div className="input-row">
                                  <label>Exercise:</label>
                                  <input
                                    type="text"
                                    name="exercise"
                                    value={editingExercise.exercise}
                                    onChange={handleEditInputChange}
                                  />
                                </div>
                                <div className="input-row">
                                  <label>Sets:</label>
                                  <input
                                    type="number"
                                    name="sets"
                                    value={editingExercise.sets}
                                    onChange={handleEditInputChange}
                                  />
                                </div>
                                <div className="input-row">
                                  <label>Reps:</label>
                                  <input
                                    type="number"
                                    name="reps"
                                    value={editingExercise.reps}
                                    onChange={handleEditInputChange}
                                  />
                                </div>
                                <div className="input-row">
                                  <label>Weight:</label>
                                  <input
                                    type="number"
                                    name="weight"
                                    value={editingExercise.weight}
                                    onChange={handleEditInputChange}
                                  />
                                </div>
                                <button onClick={handleSaveEdit}>Save</button>
                                <button
                                  onClick={() => setEditingExercise(null)}
                                >
                                  Cancel
                                </button>
                              </>
                            ) : (
                              <>
                                <strong>{exercise.exercise}</strong>:{" "}
                                {exercise.sets}x{exercise.reps},{" "}
                                {exercise.weight} lbs
                                {/*Edit Delete Buttons*/}
                                <button
                                  onClick={() => handleEditExercise(index, i)}
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteExercise(index, i)}
                                >
                                  Delete
                                </button>
                              </>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </li>
            )}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
}

export default Display;
