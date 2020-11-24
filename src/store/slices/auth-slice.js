import { createSlice } from '@reduxjs/toolkit';
import { auth } from 'firebase.config';

export const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    uuid: '',
    message: '',
  },
  reducers: {
    setSignInUserStatus: (state, action) => {
      state.uuid = action.payload.uuid;
      state.message = action.payload.message;
    },
  },
});

const { setSignInUserStatus } = AuthSlice.actions;

const getSignInUserStatus = ({ email, password }) => async (dispatch) => {
  try {
    await auth.signInWithEmailAndPassword(email, password).then((res) => {
      const uuid = res.user.uid;
      const message = 'Success!';
      dispatch(setSignInUserStatus({ uuid, message }));
    });
  } catch ({ message }) {
    dispatch(setSignInUserStatus({ uuid: '', message }));
  }
};

export const selectStatus = (state) => state.auth.message;

export { getSignInUserStatus };
export default AuthSlice.reducer;
