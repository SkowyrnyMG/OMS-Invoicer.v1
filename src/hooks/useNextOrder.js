import { useSelector } from 'react-redux';
import { selectLastOrder } from 'store/slices/db-slice/db-slice';

// * [future updates]: it can be improved with ability to choose from which register you want to get the lastest order

export const useNextOrder = () => {
  const lastOrder = useSelector(selectLastOrder);
  console.log(lastOrder);
  const lastOrderSplitted =
    lastOrder !== undefined ? lastOrder.firstReg.split('-') : '';
  const newOrder = `${lastOrderSplitted[0]}-${
    Number(lastOrderSplitted[1]) + 1
  }-${lastOrderSplitted[2]}`;
  return newOrder;
};
