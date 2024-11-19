import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import adminReducer from './features/adminSlice';
export const store = configureStore({
  reducer: {
    authState: authReducer,
    adminState: adminReducer,
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
