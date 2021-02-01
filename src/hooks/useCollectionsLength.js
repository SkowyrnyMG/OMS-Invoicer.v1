import { useSelector } from 'react-redux';

import {
  selectCustomers,
  selectInvoices,
  selectOrders,
} from 'store/slices/db-slice/db-slice';

export const useCollectionsLength = () => {
  const customers = useSelector(selectCustomers);
  const invoices = useSelector(selectInvoices);
  const orders = useSelector(selectOrders);

  const collectionLength = {
    customers: customers.length ?? 0,
    invoices: invoices.length ?? 0,
    orders: orders.length ?? 0,
  };

  return collectionLength;
};
