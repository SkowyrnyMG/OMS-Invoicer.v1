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

// * add base registry options for invoices and orders to proceed autonumeration
export const registrySetup = createAsyncThunk(
  'db/registrySetup',
  async (reg) => {
    const localUuid = getLocalValue('uuid');
    const year = new Date().getFullYear();
    const firstReg = `${reg.mainOrderPrefix}-0-${year}`;
    try {
      return await db
        .put(`data/${localUuid}/orders/lastOrder.json`, { firstReg })
        .then(({ data }) => data);
    } catch (error) {
      return error;
    }
  }
);

export const getAllOrders = createAsyncThunk('db/getAllOrders', async () => {
  const localUuid = getLocalValue('uuid');
  try {
    return await db.get(`data/${localUuid}/orders.json`).then(({ data }) => {
      console.log(data.firstReg);
      return (
        data !== null && [
          data.firstReg === null || data.firstReg === undefined
            ? []
            : Object.values(data.firstReg),
          data.lastOrder !== null ? data.lastOrder : undefined,
        ]
      );
    });
  } catch (error) {
    return error;
  }
});

export const addNewOrder = createAsyncThunk(
  'db/addNewOrder',
  async ({ orderValues, isNewOrder }) => {
    const localUuid = getLocalValue('uuid');
    try {
      return await db
        .put(
          `/data/${localUuid}/orders/firstReg/${orderValues.order_number}.json`,
          orderValues
        )
        .then(async ({ data }) => {
          if (isNewOrder) {
            await db
              .put(`/data/${localUuid}/orders/lastOrder.json`, {
                firstReg: orderValues.order_number,
              })
              .then(({ orderNumber }) => {
                return orderNumber;
              });
          }

          return data;
        });
    } catch (err) {
      return err;
    }
  }
);

export const cancelOrder = createAsyncThunk(
  'db/cancelOrder',
  async (orderNumber) => {
    const localUuid = getLocalValue('uuid');
    const canceledStatus = 'Cancelled';
    try {
      const res = await db
        .put(
          `/data/${localUuid}/orders/firstReg/${orderNumber}/status.json`,
          JSON.stringify(canceledStatus),
          {
            headers: {
              Accept: 'application/json',
              'Content-type': 'application/json',
            },
          }
        )
        .then(({ data }) => {
          console.log(data);
          return data;
        });
      return { status: res, orderNumber };
    } catch (error) {
      console.error(error);
      return error;
    }
  }
);

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

    [registrySetup.fulfilled]: (state, { payload }) => {
      state.orders.lastOrder = payload;
      // state.orders.lastOrder;
    },
    [registrySetup.rejected]: (state) => {
      state.orders.lastOrder = 'Something went wrong - please reset your app';
    },

    [getAllOrders.fulfilled]: (state, { payload }) => {
      console.log('FULLFILED');
      console.log(payload);
      const defaultOder = 'ZL-0-2020';

      if (payload) {
        const [orderList, lastOrder] = payload;
        state.orders.lastOrder.firstReg = lastOrder
          ? lastOrder.firstReg
          : defaultOder;
        state.orders.firstReg = orderList;
        console.log(orderList);
      } else {
        state.orders.lastOrder.firstReg = defaultOder;
      }
    },
    [getAllOrders.rejected]: (state) => {
      const defaultOder = 'ZL-0-2020';
      console.log('REJECTED');
      state.orders.firstReg = [];
      state.orders.lastOrder.firstReg = defaultOder;
    },

    [addNewOrder.fulfilled]: (state, { payload }) => {
      console.log('state');
      console.log(state.orders.firstReg);
      console.log('payload');
      console.log(payload);
      state.orders.firstReg = state.orders.firstReg
        ? [...state.orders.firstReg, payload]
        : [payload];
      state.orders.lastOrder.firstReg = payload.order_number;
    },
    [addNewOrder.rejected]: (state) => {
      state.orders.firstReg =
        'Error, something went wrong.. Please refresh website and try one more time';
    },

    [cancelOrder.rejected]: (state) => {
      state.orders.firstReg = ['ERROR! REFRESH THE PAGE!'];
    },
  },
});

export const selectCustomers = (state) => state.db.customers;
export const selectUserConfig = (state) => state.db.config;
export const selectOrders = (state) => state.db.orders.firstReg;
export const selectLastOrder = (state) => state.db.orders.lastOrder;

export default dbSlice.reducer;
