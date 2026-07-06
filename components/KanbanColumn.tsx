'use client';

import { Task } from '../types';
import TaskCard from './TaskCard';

interface Props {
  status: string;
  label: string;
  color: string;
  tasks: Task[];
  onEdit: (task: Task) => void;
}

export default function KanbanColumn({ status, label, color, tasks, onEdit }: Props) {
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    // Add moveTask logic here later
  };

  return (
    <div
      className="kanban-column bg-white border border-gray-200 rounded-3xl p-6 min-h-[600px]"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className={`w-4 h-4 rounded-full ${color}`} />
          <h3 className="text-2xl font-semibold text-gray-800">{label}</h3>
        </div>
        <span className="bg-teal-100 text-teal-700 text-sm px-4 py-1 rounded-full">{tasks.length}</span>
      </div>

      <div className="space-y-4">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} onEdit={onEdit} />
        ))}
        {tasks.length === 0 && (
          <div className="h-40 flex items-center justify-center text-gray-400 border border-dashed border-gray-300 rounded-2xl">
            Drop tasks here
          </div>
        )}
      </div>
    </div>
  );
}