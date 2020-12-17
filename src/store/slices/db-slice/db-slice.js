import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from 'utils/axios-helper';
import { getLocalValue } from 'hooks/useLocalStorage';

export const getAllCustomers = createAsyncThunk(
  'db/getAllCustomers',
  async () => {
    const localUuid = getLocalValue('uuid');
    try {
      return await db
        .get(`data/${localUuid}/customers.json`)
        .then(({ data }) => {
          console.log(data);
          return data !== null && Object.values(data);
        });
    } catch (err) {
      console.log(err);
      return err;
    }
  }
);

export const addNewCustomer = createAsyncThunk(
  'db/addNewCustomer',
  async (cred) => {
    const localUuid = getLocalValue('uuid');
    try {
      return await db
        .put(`/data/${localUuid}/customers/${cred.vat_number}.json`, cred)
        .then(({ data }) => {
          // console.log(data);
          return data;
        });
    } catch (err) {
      return err;
    }
  }
);

export const deleteCustomer = createAsyncThunk(
  'db/deleteCustomer',
  async (cred) => {
    const localUuid = getLocalValue('uuid');
    try {
      return await db
        .delete(`data/${localUuid}/customers/${cred.vat_number}.json`)
        .then(() => cred.vat_number);
    } catch (error) {
      return error;
    }
  }
);

export const getUserConfig = createAsyncThunk('db/getUserConfing', async () => {
  const localUuid = getLocalValue('uuid');
  try {
    return await db.get(`data/${localUuid}/config.json`).then(({ data }) => {
      console.log(data);
      return data;
    });
  } catch (error) {
    return error;
  }
});

export const addUserConfig = createAsyncThunk(
  'db/addUserCofig',
  async (cred) => {
    const localUuid = getLocalValue('uuid');
    try {
      return await db
        .put(`data/${localUuid}/config.json`, cred)
        .then(({ data }) => {
          return data;
        });
    } catch (error) {
      return error;
    }
  }
);

export const getAllOrders = createAsyncThunk('db/getAllOrders', async () => {
  const localUuid = getLocalValue('uuid');
  try {
    return await db.get(`data/${localUuid}/orders.json`).then(({ data }) => {
      console.log(data);
      return data;
    });
  } catch (error) {
    return error;
  }
});

// {order_number: 719, price: "€348,08", status: "finished", desc: "Maecenas pulvinar lobortis est. Phasellus sit amet…turpis a pede posuere nonummy. Integer non velit.", email: "bbrimming0@ow.ly"}desc: "Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit."email: "bbrimming0@ow.ly"order_number: 719price: "€348,08"status: "finished"}
const dbSlice = createSlice({
  name: 'database',
  initialState: {
    customers: [],
    config: {},
    orders: [],
  },
  reducers: {},
  extraReducers: {
    [getAllCustomers.fulfilled]: (state, { payload }) => {
      state.customers = payload;
    },
    [getAllCustomers.rejected]: (state, { payload }) => {
      state.customers = payload;
    },

    [addNewCustomer.fulfilled]: (state, { payload }) => {
      state.customers =
        state.customers.length > 0 ? [...state.customers, payload] : [payload];
    },
    [addNewCustomer.rejected]: (state, { payload }) => {
      state.customers = payload;
    },

    [deleteCustomer.fulfilled]: (state, { payload }) => {
      state.customers = [
        ...state.customers.filter((curr) => {
          return curr.vat_number !== payload && curr;
        }),
      ];
    },
    [deleteCustomer.rejected]: (state, { payload }) => {
      state.customers = payload;
    },

    [getUserConfig.fulfilled]: (state, { payload }) => {
      state.config = payload;
    },
    [getUserConfig.rejected]: (state) => {
      state.config = null;
    },

    [addUserConfig.fulfilled]: (state, { payload }) => {
      state.config = payload;
    },
  },
});

export const selectCustomers = (state) => state.db.customers;
export const selectUserConfig = (state) => state.db.config;

export default dbSlice.reducer;
