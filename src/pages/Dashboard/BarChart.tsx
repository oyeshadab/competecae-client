import React, { useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            fontSize: 8,
          },
        },
      ],
    },
  },
};

const labels = ['Jun', 'Feb', 'Mar', 'Apr'];

export const data = {
  labels,
  datasets: [
    {
      data: [12, 86, 75, 46],
      backgroundColor: '#4F46BA',
      borderRadius: 15,
    },
    {
      data: [67, 32, 68, 46],
      backgroundColor: '#FFCC66',
      borderRadius: 15,
    },
  ],
};

// const ctx = document.createElement('canvas');
// ctx.getContext('2d');

// var myLine = new ChartJS(ctx).BarAlt(lineChartData, {
//   // 0 (flat) to 1 (more curvy)
//   curvature: 1,
// });

export default function BarChart() {
  return <Bar options={options} data={data} />;
}
