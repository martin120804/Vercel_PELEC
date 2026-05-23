import React, { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // Fetch Tasks
  const fetchTasks = async () => {
    const response = await fetch("https://martinako08.pythonanywhere.com/api/tasks/");
    const data = await response.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add Task
  const addTask = async () => {
    if (!title) return;

    await fetch("https://martinako08.pythonanywhere.com/api/tasks/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        is_completed: false,
      }),
    });

    setTitle("");
    fetchTasks();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#313338",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "450px",
          backgroundColor: "#2B2D31",
          borderRadius: "16px",
          padding: "30px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
        }}
      >
        {/* Title */}
        <h1
          style={{
            color: "#FFFFFF",
            textAlign: "center",
            marginBottom: "25px",
            fontSize: "32px",
          }}
        >
          Task Manager
        </h1>

        {/* Input Section */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "25px",
          }}
        >
          <input
            type="text"
            placeholder="Enter a task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#1E1F22",
              color: "white",
              fontSize: "15px",
              outline: "none",
            }}
          />

          <button
            onClick={addTask}
            style={{
              backgroundColor: "#5865F2",
              border: "none",
              padding: "12px 18px",
              borderRadius: "8px",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "0.2s",
            }}
          >
            Add
          </button>
        </div>

        {/* Task List */}
        <div>
          {tasks.length === 0 ? (
            <p
              style={{
                textAlign: "center",
                color: "#B5BAC1",
              }}
            >
              No tasks yet
            </p>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                style={{
                  backgroundColor: "#1E1F22",
                  padding: "15px",
                  borderRadius: "10px",
                  marginBottom: "12px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    color: "white",
                    fontSize: "16px",
                  }}
                >
                  {task.title}
                </span>

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
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
