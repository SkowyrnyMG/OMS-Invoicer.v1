import { useSelector } from 'react-redux';
import {
  selectLastOrder,
  selectLastInvoice,
} from 'store/slices/db-slice/db-slice';

// * [future updates]: it can be improved with ability to choose from which register you want to get the lastest order

export const useAutoNumeration = (option) => {
  const lastOrder = useSelector(selectLastOrder);
  const lastInvoice = useSelector(selectLastInvoice);
  const lastValue = option === 'order' ? lastOrder : lastInvoice;
  const lastValueSplitted =
    lastValue !== undefined ? lastValue.firstReg.split('-') : '';
  const newValue = `${lastValueSplitted[0]}-${
    Number(lastValueSplitted[1]) + 1
  }-${lastValueSplitted[2]}`;
  return newValue;
};
