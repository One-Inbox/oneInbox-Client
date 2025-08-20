import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ data, label }) => {
  const utilsData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: label,
        data: data.map((item) => item.quantity),
        backgroundColor: [
          "rgb(8, 47, 73)",
          "rgb(52, 211, 153)",
          "rgb(156, 163, 175)",
          "rgb(245, 158, 11)",
          "rgb(175, 185, 199)",
        ],

        borderWidth: 2,
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        align: "start", // alinea desde el inicio (izquierda)

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
        margin: 50,
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
  };

  return <Doughnut data={utilsData} options={options} />;
};
export default DoughnutChart;
