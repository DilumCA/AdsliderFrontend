import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import './piechart-legend.css';

const data = [
  { name: 'Fiber Users', value: 40 },
  { name: '4G Users', value: 50 },
  { name: '5G Users', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FF6384'];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, index }) => {
  const radius = outerRadius + 20;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill={COLORS[index]}
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      fontSize={13}
      fontWeight="bold"
    >
      {data[index].value}%
    </text>
  );
};

const legendClasses = [
  "legend-dot-fiber",
  "legend-dot-4g",
  "legend-dot-5g"
];

const PieChartComponent = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded-xl shadow-md w-full h-full">
      {/* Pie Chart (Left) */}
      <div className="w-full md:w-2/3 h-56 mb-4 md:mb-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={70}
              labelLine={true}
              label={renderCustomizedLabel}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Text & Legend (Right) */}
      <div className="w-full md:w-1/3 text-center md:text-left overflow-hidden">
        <h3 className="text-lg font-semibold mb-4">Connection Types</h3>
        <div className="space-y-2">
          {data.map((entry, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 break-words"
            >
              <span className={`text-xl ${legendClasses[index]}`}>●</span>
              <span className="font-medium">{entry.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PieChartComponent;