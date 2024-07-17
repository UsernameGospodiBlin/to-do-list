// src/components/TaskModal/TaskModal.tsx
import React, { useContext, useState } from 'react';
import { TaskContext } from '../../context/TaskContext';
import TaskList from '../TaskList/TaskList';
import { Task } from '../../types';

interface TaskModalProps {
  selectedDay: Date;
  closeModal: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ selectedDay, closeModal }) => {
  const { tasks, addTask, removeTask, toggleTaskCompletion } = useContext(TaskContext)!;
  const [taskText, setTaskText] = useState('');

  const handleAddTask = () => {
    addTask(selectedDay, taskText);
    setTaskText('');
  };

  const dayTasks = tasks[selectedDay.toDateString()] || [];

  return (
    <div className="task-modal">
      <h2>Tasks for {selectedDay.toDateString()}</h2>
      <TaskList
        tasks={dayTasks}
        onToggle={(index) => toggleTaskCompletion(selectedDay, index)}
        onDelete={(index) => removeTask(selectedDay, index)}
      />
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
      />
      <button onClick={handleAddTask}>Add Task</button>
      <button onClick={closeModal}>Close</button>
    </div>
  );
};

export default TaskModal;
