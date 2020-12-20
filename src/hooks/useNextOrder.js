import { useSelector } from 'react-redux';
import { selectLastOrder } from 'store/slices/db-slice/db-slice';

export const useNextOrder = () => {
  const lastOrder = useSelector(selectLastOrder);
  const lastOrderSplitted = lastOrder !== undefined ? lastOrder.split('-') : '';
  const newOrder = `${lastOrderSplitted[0]}-${
    Number(lastOrderSplitted[1]) + 1
  }-${lastOrderSplitted[2]}`;
  return newOrder;
};
