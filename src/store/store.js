import { configureStore } from '@reduxjs/toolkit';
import AuthSliceReudcer from './slices/auth-slice/auth-slice';
import LoadingReducer from './slices/loading-slice/loading-slice';
import dbReducer from './slices/db-slice/db-slice';

export const reducer = {
  auth: AuthSliceReudcer,
  loading: LoadingReducer,
  db: dbReducer,
};

const store = configureStore({
  reducer,
});

export default store;
