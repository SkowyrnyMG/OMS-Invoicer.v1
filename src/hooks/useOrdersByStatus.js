import { useSelector } from 'react-redux';

import { selectOrders } from 'store/slices/db-slice/db-slice';

export const useOrdersByStatus = (status) => {
  const allOrders = useSelector(selectOrders);

  const all = allOrders.filter((order) => order.status === status);
  const counter = allOrders.reduce((acc, cur) => {
    acc += cur.status === status ? 1 : 0;
    return acc;
  }, 0);

  return { all, counter };
};
