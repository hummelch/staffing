export const config = {
  databaseHost: window.localStorage.getItem('databaseHost') || '',
  year: new Date().getFullYear(),
  idleReloadSeconds: 300
};
