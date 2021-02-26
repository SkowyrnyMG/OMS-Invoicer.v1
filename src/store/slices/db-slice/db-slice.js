import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from 'utils/axios-helper';
import { getLocalValue } from 'hooks/useLocalStorage';
import { logoutUser } from 'store/slices/auth-slice/auth-slice';

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
  },
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
  },
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
  },
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
  },
);

// * add base registry options for invoices and orders to proceed autonumeration
export const registrySetup = createAsyncThunk(
  'db/registrySetup',
  async (reg) => {
    const localUuid = getLocalValue('uuid');
    const year = new Date().getFullYear();
    const firstRegOrder = `${reg.mainOrderPrefix}-0-${year}`;
    const firstRegInvoice = `${reg.mainInvoicePrefix}-0-${year}`;
    try {
      const defaultOrder = await db
        .put(`data/${localUuid}/orders/lastOrder.json`, {
          firstReg: firstRegOrder,
        })
        .then(({ data }) => data);
      const defaultInvoice = await db
        .put(`data/${localUuid}/invoices/lastInvoice.json`, {
          firstReg: firstRegInvoice,
        })
        .then(({ data }) => data);

      return { defaultOrder, defaultInvoice };
    } catch (error) {
      return error;
    }
  },
);

export const getAllOrders = createAsyncThunk('db/getAllOrders', async () => {
  const localUuid = getLocalValue('uuid');
  try {
    return await db.get(`data/${localUuid}/orders.json`).then(({ data }) => {
      // console.log(Object.values(data.firstReg));
      return (
        // * if there is no order list created in DB, action will return empty array to the reducer
        data !== null
          ? [
              data.firstReg === null || data.firstReg === undefined
                ? []
                : Object.values(data.firstReg),
              // data.firstReg !== null ||
              //   (data.firstReg !== undefined && Object.values(data.firstReg)),
              data.lastOrder !== null ? data.lastOrder : undefined,
            ]
          : null
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
          orderValues,
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
  },
);

export const setOrderStatus = createAsyncThunk(
  'db/setOrderStatus',
  async ({ orderNumber, status }) => {
    const localUuid = getLocalValue('uuid');
    try {
      const res = await db
        .put(
          `/data/${localUuid}/orders/firstReg/${orderNumber}/status.json`,
          JSON.stringify(status),
          {
            headers: {
              Accept: 'application/json',
              'Content-type': 'application/json',
            },
          },
        )
        .then(({ data }) => {
          return data;
        });
      return { status: res, orderNumber };
    } catch (error) {
      console.error(error);
      return error;
    }
  },
);

export const getAllInvoices = createAsyncThunk(
  'db/getAllInvoices',
  async () => {
    const localUuid = getLocalValue('uuid');
    try {
      return await db
        .get(`/data/${localUuid}/invoices.json`)
        .then(({ data }) => {
          return (
            // * if there is no invoices list created in DB, action will return empty array to the reducer
            data !== null && [
              data.firstReg !== null && data.firstReg !== undefined
                ? Object.values(data.firstReg)
                : [],
              data.lastInvoice !== null ? data.lastInvoice : undefined,
            ]
          );
        });
    } catch (error) {
      return error;
    }
  },
);

export const getLastInvoice = createAsyncThunk(
  'db/getLastInvoice',
  async () => {
    const localUuid = getLocalValue('uuid');
    try {
      return await db
        .get(`/data/${localUuid}/invoices/lastOrder.json`)
        .then(({ data }) => {
          return data;
        });
    } catch (error) {
      return error;
    }
  },
);

export const addNewInvoice = createAsyncThunk(
  'db/addNewInvoice',
  async ({ invoiceValues, isNewInvoice }) => {
    const localUuid = getLocalValue('uuid');
    try {
      return await db
        .put(
          `/data/${localUuid}/invoices/firstReg/${invoiceValues.invoice_number}.json`,
          invoiceValues,
        )
        .then(async ({ data }) => {
          if (isNewInvoice) {
            await db
              .put(`/data/${localUuid}/invoices/lastInvoice.json`, {
                firstReg: invoiceValues.invoice_number,
              })
              .then(({ invoiceNumber }) => {
                return invoiceNumber;
              });
          }

          return data;
        });
    } catch (error) {
      return error;
    }
  },
);

export const setInvoiceStatus = createAsyncThunk(
  'db/setInvoiceStatus',
  async ({ invoiceNumber, status }) => {
    const localUuid = getLocalValue('uuid');
    try {
      const statusRes = await db
        .put(
          `/data/${localUuid}/invoices/firstReg/${invoiceNumber}/payment_status.json`,
          JSON.stringify(status),
          {
            headers: {
              Accept: 'application/json',
              'Content-type': 'application/json',
            },
          },
        )
        .then(({ data }) => {
          return data;
        });

      const leftToPayRes =
        statusRes && status === 'paid'
          ? await db
              .put(
                `/data/${localUuid}/invoices/firstReg/${invoiceNumber}/left_to_pay.json`,
                JSON.stringify(0),
                {
                  headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json',
                  },
                },
              )
              .then(({ data }) => data)
          : null;

      return { status: statusRes, invoiceNumber, left_to_pay: leftToPayRes };
    } catch (error) {
      return error;
    }
  },
);

const dbSlice = createSlice({
  name: 'database',
  initialState: {
    customers: [],
    config: null,
    orders: { firstReg: [], lastOrder: { firstReg: '' } },
    invoices: { firstReg: [], lastInvoice: { firstReg: '' } },
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
      const { defaultOrder, defaultInvoice } = payload;
      state.orders.lastOrder = defaultOrder;
      state.invoices.lastInvoice = defaultInvoice;
    },
    [registrySetup.rejected]: (state) => {
      state.orders.lastOrder = 'Something went wrong - please reset your app';
    },

    [getAllOrders.fulfilled]: (state, { payload }) => {
      const defaultOder = 'ZL-0-2020';
      if (payload !== null) {
        const [orderList, lastOrder] = payload;
        state.orders.lastOrder.firstReg = lastOrder
          ? lastOrder.firstReg
          : defaultOder;
        state.orders.firstReg = orderList;
      } else {
        state.orders.lastOrder.firstReg = defaultOder;
      }
    },
    [getAllOrders.rejected]: (state) => {
      const defaultOder = 'ZL-0-2020';
      state.orders.firstReg = [];
      state.orders.lastOrder.firstReg = defaultOder;
    },

    [addNewOrder.fulfilled]: (state, { payload }) => {
      state.orders.firstReg = state.orders.firstReg
        ? [...state.orders.firstReg, payload]
        : [payload];
      state.orders.lastOrder.firstReg = payload.order_number;
    },
    [addNewOrder.rejected]: (state) => {
      state.orders.firstReg =
        'Error, something went wrong.. Please refresh website and try one more time';
    },

    [setOrderStatus.rejected]: (state) => {
      state.orders.firstReg = ['ERROR! REFRESH THE PAGE!'];
    },

    [getAllInvoices.fulfilled]: (state, { payload }) => {
      if (payload) {
        const [invoicesList, lastInvoice] = payload;
        state.invoices.firstReg = invoicesList;
        state.invoices.lastInvoice = lastInvoice;
      }
    },
    [getAllInvoices.rejected]: (state) => {
      state.invoices.fistReg =
        'Error something went wrong.. Please refresh website and try one more time';
    },

    [addNewInvoice.fulfilled]: (state, { payload }) => {
      state.invoices.firstReg = state.invoices.firstReg
        ? [...state.invoices.firstReg, payload]
        : [payload];
      state.invoices.lastInvoice.firstReg = payload.invoice_number;
    },
    [addNewInvoice.rejected]: (state) => {
      state.invoices.firstReg = {
        invoice_number: 'Error something went wrong. Please refresh the page',
      };
    },

    [setInvoiceStatus.rejected]: (state) => {
      state.orders.firstReg = ['ERROR! REFRESH THE PAGE!'];
    },

    [logoutUser.fulfilled]: (state) => {
      state.customers = [];
      state.config = {};
      state.orders = { firstReg: [], lastOrder: { firstReg: '' } };
      state.invoices = { firstReg: [], lastInvoice: { firstReg: '' } };
    },
  },
});

export const selectCustomers = (state) => state.db.customers;
export const selectUserConfig = (state) => state.db.config;
export const selectOrders = (state) => state.db.orders.firstReg;
export const selectLastOrder = (state) => state.db.orders.lastOrder;
export const selectLastInvoice = (state) => state.db.invoices.lastInvoice;
export const selectInvoices = (state) => state.db.invoices.firstReg;

export default dbSlice.reducer;
