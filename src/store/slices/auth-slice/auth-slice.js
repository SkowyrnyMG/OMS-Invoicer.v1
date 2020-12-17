import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { auth } from 'firebase.config';

import {
  setLocalValue,
  getLocalValue,
  defaultLocalStorage,
} from 'hooks/useLocalStorage';
import { db } from 'utils/axios-helper';

defaultLocalStorage('uuid', '');
defaultLocalStorage('user', '');
const localUuid = getLocalValue('uuid');
const localUser = getLocalValue('user');

const signInWithEmailAndPassword = createAsyncThunk(
  'auth/signInWithEmailAndPassword',
  async ({ email, password }) => {
    try {
      return await auth
        .signInWithEmailAndPassword(email, password)
        .then(async (res) => {
          const uuid = res.user.uid;
          const message = 'Success!';
          const userInfo = await db
            .get(`/users/${uuid}.json`)
            .then(({ data }) => {
              return data;
            });

          setLocalValue('user', userInfo.email);
          setLocalValue('uuid', uuid);

          return { uuid, userInfo, message };
        });
    } catch ({ message }) {
      return { uuid: '', userInfo: '', message };
    }
  }
);

const registerWithEmailAndPassword = createAsyncThunk(
  'auth/registerWithEmailAndPassword',
  async ({ email, password, name, lastname }) => {
    try {
      return await auth
        .createUserWithEmailAndPassword(email, password)
        .then(async (res) => {
          const uuid = res.user.uid;
          const userEmail = res.user.email;
          const message = 'Succesfuly registered!';
          const userInfo = {
            email: userEmail,
            name,
            lastname,
          };

          await db.put(`/users/${uuid}.json`, {
            uuid,
            email: userEmail,
            name,
            lastname,
          });

          setLocalValue('user', userInfo.email);
          setLocalValue('uuid', uuid);

          return {
            uuid,
            userInfo,
            message,
          };
        });
    } catch ({ message }) {
      return {
        uuid: '',
        userInfo: {
          email: '',
          name: '',
          lastname: '',
        },
        message,
      };
    }
  }
);

export const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    login: {
      uuid: localUuid,
      userInfo: {
        email: localUser,
        name: '',
        lastname: '',
      },
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
    resetMessage: (state) => {
      state.login.message = '';
    },
  },
  extraReducers: {
    [signInWithEmailAndPassword.fulfilled]: (state, { payload }) => {
      state.login = payload;
    },
    [signInWithEmailAndPassword.rejected]: (state, { payload }) => {
      state.login = payload;
    },
    [registerWithEmailAndPassword.fulfilled]: (state, { payload }) => {
      state.login = payload;
    },
    [registerWithEmailAndPassword.rejected]: (state, { payload }) => {
      state.login = payload;
    },
  },
});

export const getUserStatus = (state) => state.auth.login.message;
export const getUserData = (state) => state.auth.login;
export const getUid = (state) => state.auth.login.uuid;

export const { logoutUser, resetMessage } = AuthSlice.actions;

export { signInWithEmailAndPassword, registerWithEmailAndPassword };
export default AuthSlice.reducer;
