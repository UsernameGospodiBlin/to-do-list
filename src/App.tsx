import React from 'react';
import Calendar from './components/Calendar/Calendar';
import { TaskProvider } from './context/TaskContext';
import './App.css';

const App: React.FC = () => {
  return (
    <TaskProvider>
      <div className="app">
        <Calendar />
      </div>
    </TaskProvider>
  );
};

export default App;
