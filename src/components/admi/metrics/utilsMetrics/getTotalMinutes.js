const getTotalMinutes = (timestamp) => {
  const date = new Date(timestamp); // convierte a objeto Date
  const hour = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  // Pasar a número total de minutos
  const totalMinutes = hour * 60 + minutes;
  return totalMinutes;
};

export default getTotalMinutes;
