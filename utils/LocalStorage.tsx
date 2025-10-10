
export const saveToLocalStorage = (key:any, value:any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const getFromLocalStorage = (key:any) => {
  if (typeof window !== 'undefined') {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
  return null;
};

export const removeFromLocalStorage = (key:any) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
};
