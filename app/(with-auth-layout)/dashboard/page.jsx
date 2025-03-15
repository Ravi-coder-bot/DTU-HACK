"use client";
import React from "react";
import { HeartPulse, Activity, ShieldCheck, UserPlus } from "lucide-react";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#12233F] to-[#0A1F44] text-white p-6">
      
      <h1 className="text-3xl font-bold text-center mb-6">HealthSync Dashboard</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-4 gap-6">
        <StatCard icon={<HeartPulse className="text-red-500" />} title="Heart Rate" value="72 bpm" trend="+3 bpm" />
        <StatCard icon={<Activity className="text-blue-500" />} title="Calories Burned" value="2,450 kcal" trend="+150 kcal" />
        <StatCard icon={<ShieldCheck className="text-green-500" />} title="Health Score" value="92%" trend="+4% improvement" />
        <StatCard icon={<UserPlus className="text-yellow-500" />} title="Consultations" value="5 this week" trend="+1 session" />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        <div className="bg-[#1A2B50] p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Health Progress</h2>
          <Bar data={barData} options={chartOptions} />
        </div>
        <div className="bg-[#1A2B50] p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Activity Trends</h2>
          <Line data={lineData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, trend }) => (
  <div className="flex flex-col items-center bg-[#1A2B50] p-4 rounded-lg shadow-md text-center">
    {icon}
    <h3 className="text-lg font-semibold mt-2">{title}</h3>
    <p className="text-xl font-bold">{value}</p>
    <span className="text-green-400 text-sm">{trend}</span>
  </div>
);

const barData = {
  labels: ["Blood Pressure", "Heart Rate", "Oxygen Levels", "Glucose"],
  datasets: [
    {
      label: "Weekly Average",
      data: [120, 72, 98, 90],
      backgroundColor: ["#4F46E5", "#F43F5E", "#22C55E", "#EAB308"],
    },
  ],
};

const lineData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Daily Steps",
      data: [6000, 7500, 8200, 9000, 10400, 11200, 9800],
      borderColor: "#4F46E5",
      backgroundColor: "rgba(79, 70, 229, 0.5)",
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
  },
};

export default Dashboard;
