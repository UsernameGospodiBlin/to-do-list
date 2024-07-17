export interface Task {
    text: string;
    completed: boolean;
  }
  
  export interface TaskContextType {
    tasks: { [key: string]: Task[] };
    addTask: (date: Date, text: string) => void;
    removeTask: (date: Date, index: number) => void;
    toggleTaskCompletion: (date: Date, index: number) => void;
  }
  