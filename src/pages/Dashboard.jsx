import React from "react";
import Sidebar from "../components/SideBar";
import AdminNavbar from '../components/AdminNavbar';
import Card from "../components/CardComponent";
import CountUp from "react-countup";
import PieChartComponent from "../components/PieChartComponent";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart
} from "recharts";
import {
  FaGoogle,
  FaApple,
  FaAndroid,
  FaChartBar,
  FaDollarSign,
  FaBullhorn,
} from "react-icons/fa";

const adData = [
  { name: "Mon", impressions: 4000, clicks: 200 },
  { name: "Tue", impressions: 5000, clicks: 300 },
  { name: "Wed", impressions: 6000, clicks: 400 },
  { name: "Thu", impressions: 5500, clicks: 320 },
  { name: "Fri", impressions: 7000, clicks: 450 },
  { name: "Sat", impressions: 6500, clicks: 370 },
  { name: "Sun", impressions: 7200, clicks: 490 },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 }
  }),
};

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminNavbar />
        <main className="p-6 overflow-y-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Ad Metrics */}
            <div className="col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: "Ad Impressions", value: 1850000 },
                { label: "CTR", value: 3.4, suffix: "%" },
                { label: "Conversions", value: 12450 },
                { label: "Ad Spend", value: 76000, prefix: "$" },
              ].map((item, i) => (
                <motion.div key={i} custom={i} initial="hidden" animate="visible" variants={fadeInUp}>
                  <Card className="p-4 text-center">
                    <p className="text-sm text-gray-500">{item.label}</p>
                    <h2 className="text-3xl font-bold text-gray-800">
                      <CountUp
                        end={item.value}
                        duration={1.5}
                        separator=","
                        prefix={item.prefix || ""}
                        suffix={item.suffix || ""}
                      />
                    </h2>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="col-span-3 lg:col-span-1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-4 flex flex-col items-center justify-center">
                <h2 className="text-xl font-semibold mb-2">Platform Usage</h2>
                <ul className="mt-2 space-y-2 text-sm text-gray-700 w-full">
                  <li className="flex justify-between">
                    <span className="flex items-center gap-2"><FaAndroid className="text-green-600" /> Android</span>
                    <span>58%</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="flex items-center gap-2"><FaApple className="text-gray-700" /> iOS</span>
                    <span>35%</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="flex items-center gap-2"><FaGoogle className="text-blue-500" /> Web</span>
                    <span>7%</span>
                  </li>
                </ul>
              </Card>
            </motion.div>

            <div className="col-span-3 lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { icon: <FaBullhorn className="text-red-600 text-2xl mb-2" />, label: "Promo Pack A", value: 320000 },
                { icon: <FaBullhorn className="text-blue-600 text-2xl mb-2" />, label: "Unlimited 4G", value: 270000 },
                { icon: <FaBullhorn className="text-green-600 text-2xl mb-2" />, label: "Student Combo", value: 180000 },
              ].map((item, i) => (
                <motion.div key={i} custom={i} initial="hidden" animate="visible" variants={fadeInUp}>
                  <Card className="p-4 text-center flex flex-col items-center">
                    {item.icon}
                    <p className="font-semibold text-xl">
                      <CountUp end={item.value} duration={2} separator="," />
                    </p>
                    <p className="text-sm text-gray-600">{item.label}</p>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="col-span-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-4">
  <h2 className="text-xl font-semibold mb-4">Weekly Engagement</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* Line Chart */}
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={adData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="impressions" stroke="#00C49F" strokeWidth={2} />
        <Line type="monotone" dataKey="clicks" stroke="#8884d8" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>

    {/* Pie Chart */}
    <ResponsiveContainer width="100%" height={300}>
      <PieChartComponent />
    </ResponsiveContainer>
  </div>
</Card>

            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
