import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';

// Redux store'u oluşturuyoruz ve tasks reducer'ını ekliyoruz
const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});

// Store'un root state ve dispatch türlerini dışa aktarıyoruz
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;