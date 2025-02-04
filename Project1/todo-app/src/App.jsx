import { useState } from "react";
import styled from "@emotion/styled";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import AddTaskButton from "./components/AddTaskButton";

const TaskInput = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid var(--purple-light);
  border-radius: 12px;
  margin-bottom: 1rem;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: var(--purple-primary);
  }
`;

export default function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Complete project presentation", completed: true },
    { id: 2, text: "Schedule team meeting", completed: false },
  ]);
  const [showInput, setShowInput] = useState(false);

  const handleAddTask = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      const newTask = {
        id: Date.now(),
        text: e.target.value.trim(),
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setShowInput(false);
      e.target.value = "";
    }
  };

  const handleToggleTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="container">
      <Header />

      <TaskList tasks={tasks} onToggleTask={handleToggleTask} />

      {showInput && (
        <TaskInput
          autoFocus
          placeholder="Type your task and press Enter"
          onKeyPress={handleAddTask}
          onBlur={() => setShowInput(false)}
        />
      )}

      <AddTaskButton onClick={() => setShowInput(true)} />
    </div>
  );
}
