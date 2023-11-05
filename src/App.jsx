import React, { useState } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() === '') return;

    const newItem = {
      task: newTask,
      date: dueDate,
      completed: false,
    };

    setItems([...items, newItem]);
    setNewTask('');
    setDueDate('');
  };

  const handleToggleComplete = (index) => {
    const updatedItems = [...items];
    updatedItems[index].completed = !updatedItems[index].completed;
    setItems(updatedItems);
  };

  const handleDeleteTask = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const checkDueDate = (date) => {
    const today = new Date();
    const dueDate = new Date(date);
    return dueDate < today;
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter task description"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button onClick={handleAddTask}>Add</button>
      </div>
      <ul className="todo-list">
        {items.map((item, index) => (
          <li
            key={index}
            style={{
              borderColor: checkDueDate(item.date) ? 'yellow' : 'inherit',
            }}
          >
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => handleToggleComplete(index)}
            />
            <span style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
              {item.task}
            </span>
            <span>Due Date: {item.date}</span>
            {checkDueDate(item.date) && (
              <div style={{ color: 'red' }}>Due day is passed</div>
            )}
            <button onClick={() => handleDeleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
;
export default App;


