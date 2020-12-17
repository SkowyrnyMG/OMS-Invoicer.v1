import { createSlice } from '@reduxjs/toolkit';
import {
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
} from 'store/slices/auth-slice/auth-slice';
import {
  getAllCustomers,
  addNewCustomer,
  deleteCustomer,
  getUserConfig,
} from 'store/slices/db-slice/db-slice';

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: false,
  reducers: {
    setLoadingOn: () => true,
    setLoadingOff: () => false,
  },
  extraReducers: {
    [signInWithEmailAndPassword.pending]: () => true,
    [signInWithEmailAndPassword.fulfilled]: () => false,
    [signInWithEmailAndPassword.rejected]: () => false,

    [registerWithEmailAndPassword.pending]: () => true,
    [registerWithEmailAndPassword.fulfilled]: () => false,
    [registerWithEmailAndPassword.rejected]: () => false,

    [getAllCustomers.pending]: () => true,
    [getAllCustomers.fulfilled]: () => false,
    [getAllCustomers.rejected]: () => false,

    [addNewCustomer.pending]: () => true,
    [addNewCustomer.fulfilled]: () => false,
    [addNewCustomer.rejected]: () => false,

    [deleteCustomer.pending]: () => true,
    [deleteCustomer.fulfilled]: () => false,
    [deleteCustomer.rejected]: () => false,

    [getUserConfig.pending]: () => true,
    [getUserConfig.fulfilled]: () => false,
    [getUserConfig.rejected]: () => false,
  },
});

export const selectLoading = (state) => state.loading;
export const { setLoadingOn, setLoadingOff } = loadingSlice.actions;

export default loadingSlice.reducer;
