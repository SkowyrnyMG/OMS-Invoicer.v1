import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { auth } from 'firebase.config';

import { setLocalValue, getLocalValue } from 'hooks/useLocalStorage';

const localUuid = getLocalValue('uuid');
const localUser = getLocalValue('user');

const signInWithEmailAndPassword = createAsyncThunk(
  'auth/signInWithEmailAndPassword',
  async ({ email, password }) => {
    try {
      return await auth
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          const uuid = res.user.uid;
          const userInfo = res.user.email;
          const message = 'Success!';
          setLocalValue('user', userInfo);
          setLocalValue('uuid', uuid);
          return { uuid, userInfo, message };
        });
    } catch ({ message }) {
      return { uuid: '', userInfo: '', message };
    }
  }
);

export const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    login: {
      uuid: localUuid,
      userInfo: localUser,
      message: '',
    },
  },
  reducers: {
    logoutUser: (state) => {
      setLocalValue('user', '');
      setLocalValue('uuid', '');
      state.login = {
        uuid: '',
        userInfo: '',
        message: '',
      };
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
export const getUserData = (state) => state.auth.login;

export const { logoutUser } = AuthSlice.actions;

export { signInWithEmailAndPassword };
export default AuthSlice.reducer;
