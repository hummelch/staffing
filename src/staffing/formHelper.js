export const validateFormElement = (value, type) => {
  if(type) {
    switch (type) {
      case 'integer':
        return parseInt(value, 10);

      case 'float':
        return parseFloat(value);

      default:
        console.warn(`Unknown validation type: ${type}`);
    }
  }

  return value;
};
