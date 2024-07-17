// src/components/TaskItem/TaskItem.tsx
import React from 'react';
import { Task } from '../../types';

interface TaskItemProps {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <li>
      <span
        style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
        onClick={onToggle}
      >
        {task.text}
      </span>
      <button onClick={onDelete}>Delete</button>
    </li>
  );
};

export default TaskItem;
