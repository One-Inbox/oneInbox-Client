const getYearAndMonth = (input) => {
  const date = input instanceof Date ? input : new Date(input);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return { year, month, day };
};
export default getYearAndMonth;
