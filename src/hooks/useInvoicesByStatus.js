import { useSelector } from 'react-redux';

import { selectInvoices } from 'store/slices/db-slice/db-slice';

export const useInvoicesByStatus = (status) => {
  const allInvoices = useSelector(selectInvoices);

  const allWithStatus = allInvoices.filter(
    (invoice) => invoice.payment_status === status,
  );
  const counter = allInvoices.reduce((acc, cur) => {
    acc += cur.payment_status === status ? 1 : 0;
    return acc;
  }, 0);

  return { allWithStatus, counter };
};
