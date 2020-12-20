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

      return data !== null && [Object.values(data.firstReg), data.lastOrder];
    });
  } catch (error) {
    return error;
  }
});

export const addNewOrder = createAsyncThunk('db/addNewOrder', async (cred) => {
  const localUuid = getLocalValue('uuid');
  try {
    console.log(cred);
    return await db
      .put(`/data/${localUuid}/orders/firstReg/${cred.order_number}.json`, cred)
      .then(({ data }) => {
        console.log(data);
        return data;
      });

    // await db
    //   .push(
    //     `/data/${localUuid}/orders/firstReg/lastOrder.json`,
    //     cred.order_number
    //   )
    //   .then(({ data }) => {
    //     return data;
    //   });
  } catch (err) {
    return err;
  }
});

const dbSlice = createSlice({
  name: 'database',
  initialState: {
    customers: [],
    config: {},
    orders: { firstReg: [], lastOrder: { firstReg: '' } },
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

    [getAllOrders.fulfilled]: (state, { payload }) => {
      const [ordersList, lastOrder] = payload;

      console.log(ordersList);
      state.orders.firstReg = ordersList;
      state.orders.lastOrder = lastOrder;
    },
    [getAllOrders.rejected]: (state, { payload }) => {
      state.orders.firstReg = payload;
    },

    [addNewOrder.fulfilled]: (state, { payload }) => {
      console.log('state');
      console.log(state.orders.firstReg);
      console.log('payload');
      console.log(payload);
      state.orders.firstReg = state.orders.firstReg
        ? [...state.orders.firstReg, payload]
        : [payload];
    },
    [addNewOrder.rejected]: (state) => {
      state.orders.firstReg =
        'Error, something went wrong.. Please refresh website and try one more time';
    },
  },
});

export const selectCustomers = (state) => state.db.customers;
export const selectUserConfig = (state) => state.db.config;
export const selectOrders = (state) => state.db.orders.firstReg;
export const selectLastOrder = (state) => state.db.orders.lastOrder.firstReg;

export default dbSlice.reducer;
