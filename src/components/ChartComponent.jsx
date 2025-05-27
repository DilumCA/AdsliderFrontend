import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'; // Chart.js auto import

function ChartComponent() {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Monthly Usage',
        data: [400, 450, 350, 500, 550, 600],
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      },
    ],
  };

  return (
  <div className="w-full max-w-3xl mx-auto">
      <Line data={data} />
    </div>
  );
}

export default ChartComponent;
