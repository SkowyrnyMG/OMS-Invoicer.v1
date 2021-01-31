import { format } from 'date-fns';

export const roundTwoDecimals = (value) =>
  Number(`${Math.round(`${value}e+2`)}e-2`);

export const addDaysToDate = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return format(new Date(result), 'dd.MM.yyyy');
};
