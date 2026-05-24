import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // Fetch Tasks
  const fetchTasks = async () => {
    const response = await fetch(
      "https://martinako08.pythonanywhere.com/api/tasks/"
    );

    const data = await response.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add Task
  const addTask = async () => {
    if (!title) return;

    await fetch(
      "https://martinako08.pythonanywhere.com/api/tasks/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          is_completed: false,
        }),
      }
    );

    setTitle("");
    fetchTasks();
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Task Manager</h1>

        {/* Input Section */}
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter a task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button onClick={addTask}>Add</button>
        </div>

        {/* Task List */}
        <ul className="task-list">
          {tasks.length === 0 ? (
            <p>No tasks yet</p>
          ) : (
            tasks.map((task) => (
              <li className="task-item" key={task.id}>
                <span>{task.title}</span>

                <span
                  style={{
                    backgroundColor: task.is_completed
                      ? "#248046"
                      : "#FAA81A",
                    color: "white",
                    padding: "5px 10px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  {task.is_completed ? "Completed" : "Pending"}
                </span>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;