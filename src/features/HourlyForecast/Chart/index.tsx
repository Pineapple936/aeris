import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export default function WeatherChart({ data }: { data: number[] }) {
  const dataForGpaph = {
    labels: data,
    datasets: [
      {
        label: "Температура (°C)",
        data: data,
        borderColor: "#007BFF",
        backgroundColor: "transparent",
        tension: 0.25,
        pointRadius: 0,
        pointHoverRadius: 0,
        borderWidth: 3,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
        border: { display: false },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
        border: { display: false },
      },
    },
  };

  return <Line data={dataForGpaph} options={options} />;
}
