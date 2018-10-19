export const config = {
  databaseHost: window.localStorage.getItem('databaseHost') || '',
  databaseToken: '',
  year: window.localStorage.getItem('year') || new Date().getFullYear()
};
