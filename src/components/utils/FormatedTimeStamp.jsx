import PropTypes from "prop-types";

const FormattedTimestamp = ({ timestamp }) => {
  // Convertir el timestamp a un número si es necesario
  const timestampNumber = Number(timestamp);

  // Verificar si el timestamp es en milisegundos y si cae dentro del rango aceptable
  let date;
  if (!isNaN(timestampNumber) && timestampNumber > 0) {
    // Si el timestamp es demasiado grande, intentamos dividirlo por 1000
    if (timestampNumber > 1e12) {
      date = new Date(timestampNumber);
    } else {
      // Asumimos que el timestamp está en segundos y lo multiplicamos por 1000
      date = new Date(timestampNumber * 1000);
    }
  } else {
    date = new Date(Date.parse(timestamp));
  }
  // Verificar si la fecha es válida
  if (isNaN(date.getTime())) {
    //console.error("Invalid date:", timestamp);
    return <span>sin fecha</span>;
  }

  // Formatear la fecha
  const formattedDate = date.toLocaleString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return <span>{formattedDate}</span>;
};

FormattedTimestamp.propTypes = {
  timestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default FormattedTimestamp;
