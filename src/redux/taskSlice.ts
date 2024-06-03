import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Görev tipi tanımı
interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

// Redux slice durumu
interface TaskState {
  tasks: Task[];
}

// Başlangıç durumu
const initialState: TaskState = {
  tasks: [],
};

// Redux slice tanımı
const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // Görev ekleme işlemi
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    // Görev silme işlemi
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    // Görevin tamamlanma durumunu değiştirme işlemi
    toggleTask: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    // Görev düzenleme işlemi
    editTask: (state, action: PayloadAction<{ id: number; title: string; description?: string }>) => {
      const task = state.tasks.find(task => task.id === action.payload.id);
      if (task) {
        task.title = action.payload.title;
        task.description = action.payload.description;
      }
    },
  },
});

export const { addTask, deleteTask, toggleTask, editTask } = taskSlice.actions;
export default taskSlice.reducer;
