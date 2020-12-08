export const useDefaultColumn = (columnsMenge) => ({
  minWidth: 150,
  width: columnsMenge < 5 ? 1268 / columnsMenge : 300,
  maxWidth: 700,
});
