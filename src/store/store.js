import { configureStore } from '@reduxjs/toolkit';
import AuthSliceReudcer from './slices/auth-slice';

const store = configureStore({
  reducer: {
    auth: AuthSliceReudcer,
  },
});

export default store;
