    'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useTaskStore } from '../../../store/taskStore';

export default function EditTaskPage() {
  const router = useRouter();
  const { id } = useParams();
  const { tasks, updateTask } = useTaskStore();

  const task = tasks.find(t => t.id === id);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    category: 'Work',
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description || '',
        dueDate: task.dueDate || '',
        category: task.category,
      });
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !task) return;

    updateTask(task.id, formData);
    router.push('/');
  };

  if (!task) {
    return <div>Task not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-pink-50 flex items-center justify-center p-4">
      <div className="bg-white p-10 rounded-3xl w-full max-w-md shadow-2xl">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-teal-600 to-pink-600 bg-clip-text text-transparent">Edit Task</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Task title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-4 border border-gray-300 rounded-2xl"
            required
          />

          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-4 border border-gray-300 rounded-2xl h-32"
          />

          <button 
            type="submit" 
            className="w-full py-4 bg-gradient-to-r from-teal-500 to-pink-500 text-white rounded-2xl font-medium text-lg"
          >
            Update Task
          </button>
          <button 
            type="button" 
            onClick={() => router.back()} 
            className="w-full py-4 bg-gray-100 text-gray-700 rounded-2xl"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}