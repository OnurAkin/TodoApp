import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Görev arayüzü
interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

// Görev durum arayüzü
interface TaskState {
  tasks: Task[];
}

// Başlangıç durumu
const initialState: TaskState = {
  tasks: [],
};

// taskSlice'ı oluşturuyoruz
const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // Görev ekleme işlemi
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    // Görev güncelleme işlemi
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    // Görev silme işlemi
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    // Görev tamamlama/iptal etme işlemi
    toggleTask: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
  },
});

// Aksiyonları ve reducer'ı dışa aktarıyoruz
export const { addTask, updateTask, deleteTask, toggleTask } = taskSlice.actions;
export default taskSlice.reducer;