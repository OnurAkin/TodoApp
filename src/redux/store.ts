import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';

// Redux mağazasını yapılandırma
const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
