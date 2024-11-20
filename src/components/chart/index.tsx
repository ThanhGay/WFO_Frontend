import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

// Đăng ký các thành phần Chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

// Dữ liệu JSON
const dataPoints = [
  { date: "2024-11-17", amount: 1635000 },
  { date: "2024-11-18", amount: 2070000 },
  { date: "2024-11-20", amount: 1950000 },
];

const LineChart = ({dataPoints}:{dataPoints:any}) => {
  // Chuyển đổi dữ liệu
  const labels = dataPoints.map((item:any) => item.date); // Trục X
  const amounts = dataPoints.map((item:any) => item.amount); // Giá trị trục Y

  // Cấu hình dữ liệu cho Chart.js
  const data = {
    labels,
    datasets: [
      {
        label: "Doanh thu (VNĐ)",
        data: amounts,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4, // Độ cong của đường
      },
    ],
  };

  // Tùy chọn hiển thị
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
