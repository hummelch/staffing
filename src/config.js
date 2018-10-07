export const config = {
  databaseHost: window.localStorage.getItem('databaseHost') || '',
  year: window.localStorage.getItem('year') || new Date().getFullYear()
};
