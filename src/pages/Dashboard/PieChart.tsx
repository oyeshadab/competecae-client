import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Lorem', 'Lorem', 'Lorem'],
  datasets: [
    {
      label: '# of Votes',
      data: [70, 49, 20],
      backgroundColor: ['#FFCC66', '#725095', '#FADEA8'],
      borderWidth: 0,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        usePointStyle: true,
        boxWidth: 999,
        boxHeight: 9,
      },
    },
  },
  cutout: 50,
};

export default function PieChart() {
  return <Doughnut data={data} options={options} />;
}
