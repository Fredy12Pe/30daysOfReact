import React, { ReactNode } from "react";
import {
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import { Column as ColumnType, Task } from "../types";

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
}

const Column = React.memo<ColumnProps>(({ column, tasks }) => {
  const DroppableComponent = Droppable as any;

  return (
    <div className="bg-gray-100 p-4 rounded-lg min-w-[300px]">
      <h2 className="text-lg font-semibold mb-4">{column.title}</h2>
      <DroppableComponent droppableId={column.id}>
        {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`min-h-[500px] transition-colors ${
              snapshot.isDraggingOver ? "bg-gray-200" : ""
            }`}
          >
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder as ReactNode}
          </div>
        )}
      </DroppableComponent>
    </div>
  );
});

export default Column;
