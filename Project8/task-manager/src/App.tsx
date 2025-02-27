import { useEffect } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import Column from "./components/Column";
import AddTaskForm from "./components/AddTaskForm";
import { useBoardStore } from "./store/boardStore";
import { DragResult } from "./types";

function App() {
  const { board, moveTask, initializeBoard } = useBoardStore();

  useEffect(() => {
    initializeBoard();
  }, [initializeBoard]);

  const onDragEnd = (result: DragResult) => {
    moveTask(result);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Task Manager</h1>
        <AddTaskForm />
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex space-x-6 overflow-x-auto pb-4">
            {board.columnOrder.map((columnId) => {
              const column = board.columns[columnId];
              const tasks = column.taskIds.map((taskId) => board.tasks[taskId]);
              return <Column key={column.id} column={column} tasks={tasks} />;
            })}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
