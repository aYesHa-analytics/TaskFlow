'use client';

import { Task } from '../types';
import { Edit3, Trash2 } from 'lucide-react';
// 1. Properly import your Zustand store hook at the top
import { useTaskStore } from '../store/taskStore';

interface Props {
  task: Task;
}

export default function TaskCard({ task }: Props) {
  // 2. Safely grab the deleteTask action using a selector
  const deleteTask = useTaskStore((state) => state.deleteTask);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('taskId', task.id);
  };

  const editTask = () => {
    window.location.href = `/edit/${task.id}`;
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="task-card group p-5 bg-white border border-gray-200 rounded-2xl hover:border-teal-400 hover:shadow-md transition-all"
    >
      <div className="flex justify-between items-start">
        <span className="text-xs px-4 py-1 bg-teal-100 text-teal-700 rounded-full font-medium">
          {task.category}
        </span>
        <div className="opacity-0 group-hover:opacity-100 flex gap-2">
          <button onClick={editTask} className="text-teal-600 hover:text-teal-700">
            <Edit3 size={18} />
          </button>
          <button onClick={() => deleteTask(task.id)} className="text-pink-600 hover:text-pink-700">
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      <h4 className="font-medium text-lg text-gray-800 mt-3">{task.title}</h4>
      {task.description && <p className="text-sm text-gray-600 mt-2 line-clamp-2">{task.description}</p>}
    </div>
  );
}