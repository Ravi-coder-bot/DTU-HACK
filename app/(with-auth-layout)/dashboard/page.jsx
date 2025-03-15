"use client";
import React from "react";
import { motion } from "framer-motion";
import { HeartPulse, Activity, ShieldCheck, UserPlus } from "lucide-react";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8 }}
      className="min-h-screen w-full bg-[#0A1F44] p-8 text-white"
    >
      {/* Header */}
      <motion.h1 
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-8"
      >
        HealthSync Dashboard
      </motion.h1>

      {/* Top Stats Section */}
      <div className="grid grid-cols-4 gap-6">
        <StatCard icon={<HeartPulse className="text-red-500" />} title="Heart Rate" value="72 bpm" trend="+3 bpm" />
        <StatCard icon={<Activity className="text-blue-500" />} title="Calories Burned" value="2,450 kcal" trend="+150 kcal" />
        <StatCard icon={<ShieldCheck className="text-green-500" />} title="Health Score" value="92%" trend="+4% improvement" />
        <StatCard icon={<UserPlus className="text-yellow-500" />} title="Consultations" value="5 this week" trend="+1 session" />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-3 gap-6 mt-8">
        <ChartCard title="Daily Steps" chart={<Line data={lineData} options={chartOptions} />} />
        <ChartCard title="Health Statistics" chart={<Bar data={barData} options={chartOptions} />} />
        <ChartCard title="Sleep Cycle" chart={<CircularProgress value={75} />} />
      </div>

      {/* Bottom Buttons */}
      <motion.div className="mt-10 flex justify-center gap-4">
        <Button label="Live Monitoring" />
        <Button label="Health Reports" />
        <Button label="Settings" />
      </motion.div>
    </motion.div>
  );
};

/* Reusable Components */
const StatCard = ({ icon, title, value, trend }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="flex flex-col items-center bg-[#1A2B50] p-5 rounded-lg shadow-lg text-center"
  >
    {icon}
    <h3 className="text-lg font-semibold mt-2">{title}</h3>
    <p className="text-2xl font-bold">{value}</p>
    <span className="text-green-400 text-sm">{trend}</span>
  </motion.div>
);

const ChartCard = ({ title, chart }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }} 
    animate={{ opacity: 1, scale: 1 }} 
    transition={{ duration: 0.5 }}
    className="bg-[#1A2B50] p-6 rounded-lg shadow-lg"
  >
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    {chart}
  </motion.div>
);

const Button = ({ label }) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="bg-gradient-to-r from-[#4F46E5] to-[#F43F5E] px-6 py-3 rounded-lg text-lg font-semibold"
  >
    {label}
  </motion.button>
);

const CircularProgress = ({ value }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
    className="relative w-40 h-40 flex items-center justify-center"
  >
    <svg className="absolute transform -rotate-90" width="160" height="160" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="45" stroke="#1A2B50" strokeWidth="8" fill="none" />
      <circle
        cx="50" cy="50" r="45"
        stroke="#22C55E" strokeWidth="8" strokeLinecap="round" fill="none"
        strokeDasharray="283" strokeDashoffset={(283 * (100 - value)) / 100}
      />
    </svg>
    <span className="text-xl font-bold">{value}%</span>
  </motion.div>
);

/* Chart Data */
const barData = {
  labels: ["Blood Pressure", "Heart Rate", "Oxygen Levels", "Glucose"],
  datasets: [{
    label: "Weekly Average",
    data: [120, 72, 98, 90],
    backgroundColor: ["#4F46E5", "#F43F5E", "#22C55E", "#EAB308"],
  }],
};

const lineData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [{
    label: "Daily Steps",
    data: [6000, 7500, 8200, 9000, 10400, 11200, 9800],
    borderColor: "#4F46E5",
    backgroundColor: "rgba(79, 70, 229, 0.5)",
  }],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
  },
};

export default Dashboard;