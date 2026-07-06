'use client';

import { useState, useEffect } from 'react';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'inprogress' | 'done';
  category: string;
}

export default function TaskManager() {
  const [user, setUser] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [newTask, setNewTask] = useState({ title: '', description: '', category: 'Work' });

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(savedUser);

    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) setTasks(JSON.parse(savedTasks));
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addOrUpdateTask = () => {
    if (!newTask.title.trim()) return;

    if (editingTask) {
      setTasks(tasks.map(t => t.id === editingTask.id ? { ...t, ...newTask } : t));
    } else {
      setTasks([...tasks, {
        id: Date.now().toString(),
        ...newTask,
        status: 'todo'
      }]);
    }

    setNewTask({ title: '', description: '', category: 'Work' });
    setShowForm(false);
    setEditingTask(null);
  };

  const deleteTask = (id: string) => {
    if (confirm('Delete this task?')) {
      setTasks(tasks.filter(t => t.id !== id));
    }
  };

  const startEdit = (task: Task) => {
    setEditingTask(task);
    setNewTask({
      title: task.title,
      description: task.description,
      category: task.category
    });
    setShowForm(true);
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  const handleDrop = (e: React.DragEvent, status: 'todo' | 'inprogress' | 'done') => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId) {
      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, status } : task
      ));
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-pink-50 flex items-center justify-center">
        <div className="bg-white p-12 rounded-3xl shadow-xl w-96 text-center">
          <h1 className="text-6xl font-bold text-gray-800 mb-4">TaskFlow</h1>
          <p className="text-gray-600 mb-8">Stay organized beautifully</p>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full p-4 border border-gray-300 rounded-2xl mb-6 focus:outline-none focus:border-teal-500"
            onKeyDown={(e) => e.key === 'Enter' && setUser(e.currentTarget.value)}
          />
          <button 
            onClick={() => setUser('Demo User')} 
            className="w-full py-4 bg-gradient-to-r from-teal-500 to-pink-500 text-white rounded-2xl text-lg font-medium hover:scale-105 transition"
          >
            Get Started
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-pink-50">
      <header className="bg-white shadow border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
          <h1 className="text-4xl font-bold text-gray-800">TaskFlow</h1>
          
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white border border-gray-300 px-6 py-3 rounded-2xl w-80 focus:outline-none focus:border-teal-500"
            />
            <button 
              onClick={() => setShowForm(true)} 
              className="bg-gradient-to-r from-teal-500 to-pink-500 text-white px-8 py-3 rounded-2xl flex items-center gap-2 font-medium hover:scale-105 transition-all"
            >
              + New Task
            </button>
            <button 
              onClick={() => { localStorage.clear(); window.location.reload(); }} 
              className="text-red-500 hover:bg-red-50 px-5 py-3 rounded-2xl transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['todo', 'inprogress', 'done'].map((status) => (
            <div 
              key={status} 
              className="kanban-column bg-white border border-gray-200 rounded-3xl p-6"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, status as any)}
            >
              <h2 className="text-2xl font-semibold mb-6 capitalize text-gray-800">
                {status === 'inprogress' ? 'In Progress' : status}
              </h2>
              <div className="space-y-4">
                {filteredTasks.filter(t => t.status === status).map(task => (
                  <div 
                    key={task.id} 
                    draggable
                    onDragStart={(e) => handleDragStart(e, task.id)}
                    className="task-card bg-white border border-gray-100 p-5 rounded-2xl hover:border-teal-400 transition-all"
                  >
                    <div className="flex justify-between">
                      <span className="text-xs px-4 py-1 bg-teal-100 text-teal-700 rounded-full">{task.category}</span>
                      <div className="flex gap-3">
                        <button onClick={() => startEdit(task)} className="text-teal-600 hover:text-teal-700">Edit</button>
                        <button onClick={() => deleteTask(task.id)} className="text-pink-600 hover:text-pink-700">Delete</button>
                      </div>
                    </div>
                    <h3 className="font-medium mt-3 text-lg">{task.title}</h3>
                    {task.description && <p className="text-gray-600 mt-1">{task.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100] p-4">
          <div className="bg-white p-8 rounded-3xl w-full max-w-md shadow-2xl">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
              {editingTask ? 'Edit Task' : 'New Task'}
            </h2>
            
            <form onSubmit={(e) => { e.preventDefault(); addOrUpdateTask(); }} className="space-y-6">
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                placeholder="Task title"
                className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-teal-500"
                required
              />
              <textarea
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                placeholder="Description"
                className="w-full p-4 border border-gray-300 rounded-2xl h-32 resize-y focus:outline-none focus:border-teal-500"
              />
              <div className="flex gap-4 pt-4">
                <button 
                  type="submit" 
                  className="flex-1 py-4 bg-gradient-to-r from-teal-500 to-pink-500 text-white rounded-2xl font-medium text-lg"
                >
                  Save Task
                </button>
                <button 
                  type="button" 
                  onClick={() => { 
                    setShowForm(false); 
                    setEditingTask(null); 
                    setNewTask({ title: '', description: '', category: 'Work' }); 
                  }} 
                  className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-2xl text-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}