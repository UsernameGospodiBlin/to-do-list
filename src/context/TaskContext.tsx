// src/context/TaskContext.tsx
import React, { createContext, useState, ReactNode } from 'react';
import { Task, TaskContextType } from '../types';

export const TaskContext = createContext<TaskContextType | null>(null);

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<{ [key: string]: Task[] }>({});

  const addTask = (date: Date, text: string) => {
    const dayTasks = tasks[date.toDateString()] || [];
    setTasks({ ...tasks, [date.toDateString()]: [...dayTasks, { text, completed: false }] });
  };

  const removeTask = (date: Date, index: number) => {
    const dayTasks = tasks[date.toDateString()] || [];
    dayTasks.splice(index, 1);
    setTasks({ ...tasks, [date.toDateString()]: dayTasks });
  };

  const toggleTaskCompletion = (date: Date, index: number) => {
    const dayTasks = tasks[date.toDateString()] || [];
    dayTasks[index].completed = !dayTasks[index].completed;
    setTasks({ ...tasks, [date.toDateString()]: dayTasks });
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, removeTask, toggleTaskCompletion }}>
      {children}
    </TaskContext.Provider>
  );
};
