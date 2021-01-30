export const roundTwoDecimals = (value) =>
  Number(`${Math.round(`${value}e+2`)}e-2`);
