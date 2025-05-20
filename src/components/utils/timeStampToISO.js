export const timestampToISO = (timestamp) => {
    const timestampNumber = Number(timestamp); //convierte el timestamp a un número
    let date; 
  
    if (!isNaN(timestampNumber) && timestampNumber > 0) { //verifica que timestampNumber sea un número válido y positivo 
      date = timestampNumber > 1e12 ? new Date(timestampNumber) : new Date(timestampNumber * 1000); //Si timestampNumber es mayor que 1e12 (1 billón, que generalmente indica un timestamp en milisegundos), se crea un objeto Date directamente a partir de timestampNumber.Si timestampNumber es menor que 1e12, se asume que el timestamp está en segundos, por lo que se multiplica por 1000 para convertirlo a milisegundos antes de crear el objeto Date.
    } else {
      date = new Date(Date.parse(timestamp)); //Si timestampNumber no es un número válido o es 0, se intenta analizar el timestamp como una cadena utilizando Date.parse() y se crea un objeto Date
    }
  
    return date.toISOString(); // Devuelve el formato ISO 8601 para comparación
  }

