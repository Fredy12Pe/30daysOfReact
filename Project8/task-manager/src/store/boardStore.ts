import { create } from 'zustand';
import { Board, Task, DragResult } from '../types';
import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../services/firebase';

interface BoardStore {
  board: Board;
  loading: boolean;
  error: string | null;
  initializeBoard: () => void;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateTask: (taskId: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  moveTask: (result: DragResult) => Promise<void>;
}

const initialBoard: Board = {
  tasks: {},
  columns: {
    todo: { id: 'todo', title: 'To Do', taskIds: [] },
    inProgress: { id: 'inProgress', title: 'In Progress', taskIds: [] },
    done: { id: 'done', title: 'Done', taskIds: [] },
  },
  columnOrder: ['todo', 'inProgress', 'done'],
};

export const useBoardStore = create<BoardStore>((set, get) => ({
  board: initialBoard,
  loading: false,
  error: null,

  initializeBoard: () => {
    set({ board: initialBoard });
  },

  addTask: async (task) => {
    try {
      const newTask: Task = {
        ...task,
        id: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const docRef = await addDoc(collection(db, 'tasks'), newTask);
      newTask.id = docRef.id;

      set((state) => ({
        board: {
          ...state.board,
          tasks: { ...state.board.tasks, [newTask.id]: newTask },
          columns: {
            ...state.board.columns,
            [task.status]: {
              ...state.board.columns[task.status],
              taskIds: [...state.board.columns[task.status].taskIds, newTask.id],
            },
          },
        },
      }));
    } catch (error) {
      set({ error: 'Failed to add task' });
    }
  },

  updateTask: async (taskId, updates) => {
    try {
      await updateDoc(doc(db, 'tasks', taskId), updates);
      set((state) => ({
        board: {
          ...state.board,
          tasks: {
            ...state.board.tasks,
            [taskId]: { ...state.board.tasks[taskId], ...updates },
          },
        },
      }));
    } catch (error) {
      set({ error: 'Failed to update task' });
    }
  },

  deleteTask: async (taskId) => {
    try {
      await deleteDoc(doc(db, 'tasks', taskId));
      set((state) => {
        const { [taskId]: deletedTask, ...remainingTasks } = state.board.tasks;
        const newColumns = { ...state.board.columns };
        
        Object.keys(newColumns).forEach((columnId) => {
          newColumns[columnId] = {
            ...newColumns[columnId],
            taskIds: newColumns[columnId].taskIds.filter((id) => id !== taskId),
          };
        });

        return {
          board: {
            ...state.board,
            tasks: remainingTasks,
            columns: newColumns,
          },
        };
      });
    } catch (error) {
      set({ error: 'Failed to delete task' });
    }
  },

  moveTask: async (result: DragResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    try {
      set((state) => {
        const startColumn = state.board.columns[source.droppableId];
        const finishColumn = state.board.columns[destination.droppableId];
        const newTaskIds = Array.from(startColumn.taskIds);
        
        newTaskIds.splice(source.index, 1);
        
        if (startColumn === finishColumn) {
          newTaskIds.splice(destination.index, 0, draggableId);
          return {
            board: {
              ...state.board,
              columns: {
                ...state.board.columns,
                [source.droppableId]: {
                  ...startColumn,
                  taskIds: newTaskIds,
                },
              },
            },
          };
        }

        const startTaskIds = Array.from(startColumn.taskIds);
        startTaskIds.splice(source.index, 1);
        
        const finishTaskIds = Array.from(finishColumn.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);

        return {
          board: {
            ...state.board,
            columns: {
              ...state.board.columns,
              [source.droppableId]: {
                ...startColumn,
                taskIds: startTaskIds,
              },
              [destination.droppableId]: {
                ...finishColumn,
                taskIds: finishTaskIds,
              },
            },
          },
        };
      });

      // Update task status in Firestore
      await updateDoc(doc(db, 'tasks', draggableId), {
        status: destination.droppableId,
        updatedAt: new Date(),
      });
    } catch (error) {
      set({ error: 'Failed to move task' });
    }
  },
})); 