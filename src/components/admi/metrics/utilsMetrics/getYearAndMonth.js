const getYearAndMonth = (input) => {
  const date = input instanceof Date ? input : new Date(input);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return { year, month };
};
export default getYearAndMonth;
