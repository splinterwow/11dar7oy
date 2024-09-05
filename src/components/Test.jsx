import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Test() {
  const counter = useSelector((state) => state.counter.counter);
  const entries = useSelector((state) => state.counter.entries);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  function handleAdd(event) {
    event.preventDefault();
    if (name && age) {
      if (isEditing) {
        dispatch({
          type: "EDIT_ENTRY",
          payload: { name, age, index: editIndex },
        });
        setIsEditing(false);
        setEditIndex(null);
      } else {
        dispatch({ type: "ADD", payload: { name, age } });
      }
      setName("");
      setAge("");
    }
  }

  function handleRemove(index) {
    dispatch({ type: "REMOVE_ENTRY", payload: index });
  }

  function handleEdit(index) {
    const entry = entries[index];
    setName(entry.name);
    setAge(entry.age);
    setIsEditing(true);
    setEditIndex(index);
  }

  return (
    <div className="max-w-md mx-auto p-6 border border-gray-300 mt-40 rounded-lg shadow-md bg-gray-50">
      <form className="flex justify-between mb-4" onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border border-gray-300 rounded w-1/2 mr-2"
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="p-2 border border-gray-300 rounded w-1/2 mr-2"
        />
        <button
          type="submit"
          className={`p-2 ${
            isEditing ? "bg-blue-500" : "bg-green-500"
          } text-white rounded hover:bg-green-600`}
        >
          {isEditing ? "Update" : "Save"}
        </button>
      </form>
      <div className="space-y-4">
        {entries.map((entry, index) => (
          <div
            key={index}
            className="p-4 border border-gray-300 rounded-lg bg-white shadow"
          >
            <div className="flex justify-between">
              <span className="font-semibold">{entry.name}</span>
              <span className="text-gray-600">{entry.age} years old</span>
            </div>
            <button
              onClick={() => handleRemove(index)}
              className="mt-2 bg-red-500 text-white rounded p-1 hover:bg-red-600"
            >
              Remove
            </button>

            <button
              onClick={() => handleEdit(index)}
              className="mt-2 bg-amber-400 text-white rounded p-1 ml-4 hover:bg-amber-200"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Test;
