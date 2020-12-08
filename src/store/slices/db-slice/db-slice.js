import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from 'utils/axios-helper';

export const getAllCustomers = createAsyncThunk(
  'db/getAllCustomers',
  async () => {
    try {
      return await db
        .get('/customers.json')
        .then(({ data }) => Object.values(data));
    } catch (err) {
      console.log(err);
      return err;
    }
  }
);

const dbSlice = createSlice({
  name: 'database',
  initialState: {
    customers: [],
  },
  reducers: {},
  extraReducers: {
    [getAllCustomers.fulfilled]: (state, { payload }) => {
      state.customers = payload;
    },
    [getAllCustomers.rejected]: (state, { payload }) => {
      state.customers = payload;
    },
  },
});

export const selectCustomers = (state) => state.db.customers;

export default dbSlice.reducer;
