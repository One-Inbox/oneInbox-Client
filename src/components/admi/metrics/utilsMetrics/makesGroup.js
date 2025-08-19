const makesGroup = (array, attribute) => {
  const grouped = array.reduce((acc, element) => {
    const key = element[attribute];
    if (!acc[key]) acc[key] = [];
    acc[key].push(element);
    return acc;
  }, {});

  // Después convertimos el objeto a un array de arrays
  const result = Object.values(grouped);
  return result;
};

export default makesGroup;
