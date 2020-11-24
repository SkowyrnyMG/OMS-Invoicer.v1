import { createSlice } from '@reduxjs/toolkit';
import { signInWithEmailAndPassword } from 'store/slices/auth-slice/auth-slice';

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: false,
  extraReducers: {
    [signInWithEmailAndPassword.pending]: () => true,
    [signInWithEmailAndPassword.fulfilled]: () => false,
    [signInWithEmailAndPassword.rejected]: () => false,
  },
});

export const selectLoading = (state) => state.loading;

export default loadingSlice.reducer;
