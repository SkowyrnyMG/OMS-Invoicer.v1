export const getLocalValue = (key) => localStorage.getItem(key);

export const setLocalValue = (key, value) => localStorage.setItem(key, value);

export const defaultLocalStorage = (key, defaultValue) => {
  const localKeyValue = getLocalValue(key);
  if (localKeyValue === null || localKeyValue === undefined)
    setLocalValue(key, defaultValue);
};
