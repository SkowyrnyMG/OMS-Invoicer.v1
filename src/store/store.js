import { configureStore } from '@reduxjs/toolkit';
import AuthSliceReudcer from './slices/auth-slice/auth-slice';
import LoadingReducer from './slices/loading-slice/loading-slice';

export const reducer = {
  auth: AuthSliceReudcer,
  loading: LoadingReducer,
};

const store = configureStore({
  reducer,
});

export default store;
