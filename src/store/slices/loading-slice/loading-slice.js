import { createSlice } from '@reduxjs/toolkit';
import {
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
} from 'store/slices/auth-slice/auth-slice';

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: false,
  extraReducers: {
    [signInWithEmailAndPassword.pending]: () => true,
    [signInWithEmailAndPassword.fulfilled]: () => false,
    [signInWithEmailAndPassword.rejected]: () => false,

    [registerWithEmailAndPassword.pending]: () => true,
    [registerWithEmailAndPassword.fulfilled]: () => false,
    [registerWithEmailAndPassword.rejected]: () => false,
  },
});

export const selectLoading = (state) => state.loading;

export default loadingSlice.reducer;
