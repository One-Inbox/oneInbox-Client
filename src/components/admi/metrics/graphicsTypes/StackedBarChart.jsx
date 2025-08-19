import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StackedBarChart = () => {
  const options = {
    plugins: {
      title: {
        display: true,
        text: "Tiempo de respuesta por red social",
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  const labels = [
    "FACEBOOK",
    "INSTAGRAM",
    "MERCADO LIBRE",
    "WHATSAPP",
    "TELEGRAM",
  ];
  const data = {
    labels,
    datasets: [
      {
        label: "minimo",
        data: [60, 40, 10, 10, 60],
        backgroundColor: "rgb(53, 162, 235)",
      },
      {
        label: "medio",
        data: [90, 70, 30, 30, 120],
        backgroundColor: "rgb(75, 192, 192)",
      },
      {
        label: "maximo",
        data: [120, 100, 50, 50, 200],
        backgroundColor: "rgb(255, 99, 132)",
      },
    ],
  };
  return <Bar options={options} data={data} />;
};

export default StackedBarChart;
