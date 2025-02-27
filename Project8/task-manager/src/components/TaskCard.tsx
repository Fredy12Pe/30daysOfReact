import React, { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { Task } from "../types";
import { useBoardStore } from "../store/boardStore";

interface TaskCardProps {
  task: Task;
  index: number;
}

const TaskCard = React.memo<TaskCardProps>(({ task, index }) => {
  const deleteTask = useBoardStore((state) => state.deleteTask);
  const updateTask = useBoardStore((state) => state.updateTask);
  const [isEditing, setIsEditing] = useState(false);

  const statusColors = {
    todo: "bg-gray-100",
    inProgress: "bg-blue-100",
    done: "bg-green-100",
  };

  const statusLabels = {
    todo: "To Do",
    inProgress: "In Progress",
    done: "Done",
  };

  const handleStatusChange = async (newStatus: string) => {
    await updateTask(task.id, { status: newStatus });
    setIsEditing(false);
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white p-4 mb-2 rounded shadow-sm hover:shadow-md transition-shadow ${
            snapshot.isDragging ? "shadow-lg" : ""
          }`}
        >
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-gray-800">{task.title}</h3>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-500 hover:text-red-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <p className="text-gray-600 text-sm mt-2">{task.description}</p>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-xs text-gray-500">
              Updated: {new Date(task.updatedAt).toLocaleString()}
            </div>
            <div className="relative">
              {isEditing ? (
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  onBlur={() => setIsEditing(false)}
                  autoFocus
                  className="text-sm border rounded px-2 py-1"
                >
                  <option value="todo">To Do</option>
                  <option value="inProgress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className={`text-sm px-2 py-1 rounded ${
                    statusColors[task.status as keyof typeof statusColors]
                  }`}
                >
                  {statusLabels[task.status as keyof typeof statusLabels]}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
});

TaskCard.displayName = "TaskCard";

export default TaskCard;
