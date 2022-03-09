export const isStringEmpty = (text) => {
  return text === "";
};

export const yearNow = (date) => {
  const newDate = new Date(date).getFullYear();
  const currentDate = new Date(Date.now()).getFullYear();
  return currentDate - newDate;
};
