import React from "react";
//import { IconUser } from "../../../utils/selectUser/IconUser";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  //Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  //Title,
  Tooltip,
  Legend
);

const BarChart = ({ data, label }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      scales: {
        y: {
          beginAtZero: true,
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
        // usePointStyle: true, // si querés que los íconos sean circulares
      },
      // title: {
      //   display: true,
      //   text: "respuesta de usuarios",
      // },
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
  const utilsData = {
    labels: data.map((item) => item.name.split(" ")),
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
      },
    ],
  };
  return <Bar options={options} data={utilsData} />;
};

export default BarChart;
