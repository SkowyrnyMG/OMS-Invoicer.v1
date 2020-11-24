import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { auth } from 'firebase.config';

const signInWithEmailAndPassword = createAsyncThunk(
  'auth/signInWithEmailAndPassword',
  async ({ email, password }) => {
    try {
      return await auth
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          const uuid = res.user.uid;
          const message = 'Success!';
          return { uuid, message };
        });
    } catch ({ message }) {
      return { uuid: '', message };
    }
  }
);

export const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    login: {
      uuid: '',
      message: '',
    },
  },
  extraReducers: {
    [signInWithEmailAndPassword.fulfilled]: (state, { payload }) => {
      state.login = payload;
    },
    [signInWithEmailAndPassword.rejected]: (state, { payload }) => {
      state.login = payload;
    },
  },
});

export const getUserStatus = (state) => state.auth.login.message;

export { signInWithEmailAndPassword };
export default AuthSlice.reducer;
