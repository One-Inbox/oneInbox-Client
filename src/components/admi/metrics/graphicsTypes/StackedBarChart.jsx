import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const StackedBarChart = ({ data, label }) => {
  console.log("data recibida en grafico", data);

  // Calcular el rango dinámico basado en los datos
  const allValues = data.flatMap((item) => [
    -item.beforeTime, // Valores negativos (antes de tiempo)
    item.onTime, // Valores positivos (a tiempo)
    item.afterTime, // Valores positivos (fuera de tiempo)
  ]);

  const minValue = Math.min(...allValues);
  const maxValue = Math.max(...allValues);

  // Redondear al múltiplo de 10 más cercano, con mínimo de 10
  const minRounded = Math.min(Math.floor(minValue / 10) * 10, -10);
  const maxRounded = Math.max(Math.ceil(maxValue / 10) * 10, 10);

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          boxWidth: 12,
          padding: 10,
          color: "#333",
          font: {
            size: 12,
            family: "Inter, sans-serif",
            weight: "200",
          },
          usePointStyle: true, // Esto hace que los iconos sean circulares
          pointStyle: "circle", // Especifica explícitamente que sean círculos
        },
      },
      tooltip: {
        enabled: true,
        bodyFont: {
          size: 12,
          family: "Inter, sans-serif",
          weight: "200",
        },
      },
    },
    layout: {
      padding: 10,
    },
    responsive: true,
    // Controlar el ancho de las barras de forma condicional
    barPercentage: data.length <= 2 ? 0.4 : 0.8, // Más delgado para 1-2 barras, normal para 3+
    categoryPercentage: data.length <= 2 ? 0.5 : 0.8, // Más delgado para 1-2 barras, normal para 3+
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        min: minRounded, // Valor mínimo calculado dinámicamente
        max: maxRounded, // Valor máximo calculado dinámicamente
        ticks: {
          stepSize: 10, // Obligar que vaya de 10 en 10
          callback: function (value) {
            // Mostrar solo múltiplos de 10
            return value % 10 === 0 ? value : "";
          },
        },
        grid: {
          color: function (context) {
            // Resalta la línea del cero con un color más oscuro y grosor mayor
            if (context.tick.value === 0) {
              return "rgb(245, 158, 11)"; // Color naranja para la línea del cero
            }
            return "#e5e5e5"; // Color gris claro para las demás líneas
          },
          lineWidth: function (context) {
            // Hace la línea del cero más gruesa
            if (context.tick.value === 0) {
              return 2; // Grosor de 2px para la línea del cero
            }
            return 1; // Grosor normal para las demás líneas
          },
        },
      },
    },
  };

  const utilsData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: "antes de tiempo",
        data: data.map((item) => {
          return -item.beforeTime;
        }),
        backgroundColor: "rgb(52, 211, 153)",
        pointStyle: "circle", // Asegura que el punto de la leyenda sea circular
      },
      {
        label: "a tiempo",
        data: data.map((item) => item.onTime),
        backgroundColor: "rgb(245, 158, 11)",
        pointStyle: "circle",
      },
      {
        label: "fuera de tiempo",
        data: data.map((item) => item.afterTime),
        backgroundColor: "rgb(8, 47, 73)",
        pointStyle: "circle",
      },
    ],
  };

  return <Bar options={options} data={utilsData} />;
};

export default StackedBarChart;
