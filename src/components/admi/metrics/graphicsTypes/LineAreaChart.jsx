// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Filler,
//   Legend,
// } from "chart.js";
// import { Line } from "react-chartjs-2";
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Filler,
//   Legend
// );

// const LineAreaChart = ({ data, label }) => {
//   console.log("data en grafico", data);

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "bottom",
//       },
//       title: {
//         display: false,
//         text: "Chart.js Line Chart",
//       },
//     },
//   };

//   const utilData = {
//     labels: data.map((item) => item.hour),
//     datasets: [
//       {
//         fill: true,
//         label: label,
//         data: data.map((item) => item.quantity),
//         borderColor: "rgb(245, 158, 11)",
//         // backgroundColor: [
//         //   "rgb(8, 47, 73)",
//         //   "rgb(52, 211, 153)",
//         //   "rgb(156, 163, 175)",
//         //   "rgb(245, 158, 11)",
//
//         // ],
//         backgroundColor: "rgb(245, 158, 11)",
//       },
//     ],
//   };
//   return <Line options={options} data={utilData} />;
// };

// export default LineAreaChart;
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const LineAreaChart = ({ data, label }) => {
  console.log("data en grafico", data);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    labels: {
      boxWidth: 12, // ancho del cuadradito de color
      padding: 10, // espacio entre leyendas
      color: "#333",
      font: {
        size: 12,
        family: "Inter, sans-serif",
        weight: "200",
      },
      usePointStyle: true, // si querés que los íconos sean circulares
    },
    elements: {
      line: {
        tension: 0.5, // Esto hace las curvas más suaves (0-1, donde 0 = recta, 1 = muy curva)
      },
    },
  };

  const utilData = {
    labels: data.map((item) => `${item.hour} hrs.`.split(" ")),
    datasets: [
      {
        fill: true,
        label: label,
        data: data.map((item) => item.quantity),
        borderColor: "rgb(52, 211, 153)", // Color de la línea
        backgroundColor: "rgba(52, 211, 153, 0.4)", // Área transparente (0.2 = 20% opacidad)
        pointBackgroundColor: "rgb(245, 158, 11)", // Color rojo para los puntos
        pointBorderColor: "rgb(245, 158, 11)", // Borde de los puntos
        // pointHoverBackgroundColor: "rgb(245, 158, 11)", // Color al hacer hover
        // pointHoverBorderColor: "rgb(245, 158, 11)",
        pointRadius: 4, // Tamaño de los puntos
        pointHoverRadius: 6, // Tamaño al hacer hover
      },
    ],
  };

  return <Line options={options} data={utilData} />;
};

export default LineAreaChart;
