import { createSlice } from '@reduxjs/toolkit';
import {
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
} from 'store/slices/auth-slice/auth-slice';
import {
  getAllCustomers,
  addNewCustomer,
  deleteCustomer,
  getAllOrders,
  addNewOrder,
  addNewInvoice,
  getAllInvoices,
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

    [addNewOrder.pending]: () => true,
    [addNewOrder.fulfilled]: () => false,
    [addNewOrder.rejected]: () => false,

    [getAllOrders.pending]: () => true,
    [getAllOrders.fulfilled]: () => false,
    [getAllOrders.rejected]: () => false,

    [getAllInvoices.pending]: () => true,
    [getAllInvoices.fulfilled]: () => false,
    [getAllInvoices.rejected]: () => false,

    [addNewInvoice.pending]: () => true,
    [addNewInvoice.fulfilled]: () => false,
    [addNewInvoice.rejected]: () => false,
  },
});

export const selectLoading = (state) => state.loading;
export const { setLoadingOn, setLoadingOff } = loadingSlice.actions;

export default loadingSlice.reducer;
