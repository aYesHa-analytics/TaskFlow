'use client';

import { useTaskStore } from '../../../store/taskStore';
import { Task } from '../../../types';     // ← Fixed relative import

export function useTasks(filters: any = {}) {   // temporary 'any' to avoid error
  const { tasks, addTask, updateTask, deleteTask, moveTask } = useTaskStore();

  const filteredTasks = tasks.filter((task: Task) => {
    const matchesSearch = 
      !filters.searchTerm || 
      task.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(filters.searchTerm.toLowerCase()));

    const matchesStatus = 
      !filters.status || 
      filters.status === 'all' || 
      task.status === filters.status;

    const matchesCategory = 
      !filters.category || 
      task.category === filters.category;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return {
    tasks: filteredTasks,
    allTasks: tasks,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    stats: {
      total: tasks.length,
      todo: tasks.filter((t: Task) => t.status === 'todo').length,
      inprogress: tasks.filter((t: Task) => t.status === 'inprogress').length,
      done: tasks.filter((t: Task) => t.status === 'done').length,
    }
  };
}