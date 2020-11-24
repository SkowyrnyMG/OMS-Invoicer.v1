import { configureStore } from '@reduxjs/toolkit';
import AuthSliceReudcer from './slices/auth-slice/auth-slice';
import LoadingReducer from './slices/loading-slice/loading-slice';

const store = configureStore({
  reducer: {
    auth: AuthSliceReudcer,
    loading: LoadingReducer,
  },
});

export default store;
