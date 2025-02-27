import type { DropResult } from '@hello-pangea/dnd';
export type DragResult = DropResult;

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'inProgress' | 'done';
  createdAt: Date;
  updatedAt: Date;
}

export interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

export interface Board {
  tasks: { [key: string]: Task };
  columns: { [key: string]: Column };
  columnOrder: string[];
} 