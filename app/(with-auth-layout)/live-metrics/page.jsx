"use client";

import React, { useEffect, useState } from "react";

const LiveMetrics = () => {
  const [metrics, setMetrics] = useState({
    heartRate: "--",
    calories: "--",
    healthScore: "--",
    consultations: "--",
    oxygenLevel: "--",
    waterIntake: "--",
    stepsCount: "--",
    sleepHours: "--",
    stressLevel: "--",
  });

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    let interval;

    const fetchMetrics = async () => {
      try {
        const response = await fetch("/api/live-metrics");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setMetrics(data);
      } catch (error) {
        console.error("Error fetching live metrics:", error);
      }
    };

    if (isConnected) {
      fetchMetrics();
      interval = setInterval(fetchMetrics, 5000); // Fetch every 5 sec
    }

    return () => clearInterval(interval);
  }, [isConnected]);

  const handleConnect = () => {
    setIsConnected(true); // Simulate connection to wearable
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold">Live Health Metrics</h1>

      <button
        onClick={handleConnect}
        disabled={isConnected}
        className={`mt-4 px-6 py-3 rounded-lg text-white font-semibold ${
          isConnected ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isConnected ? "Connected to Wearable ✅" : "Connect to Wearable"}
      </button>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <MetricCard title="Heart Rate" value={isConnected ? `${metrics.heartRate} bpm` : "--"} />
        <MetricCard title="Calories Burned" value={isConnected ? `${metrics.calories} kcal` : "--"} />
        <MetricCard title="Health Score" value={isConnected ? `${metrics.healthScore}%` : "--"} />
        <MetricCard title="Consultations" value={isConnected ? `${metrics.consultations} this week` : "--"} />
        <MetricCard title="Oxygen Level" value={isConnected ? `${metrics.oxygenLevel}%` : "--"} />
        <MetricCard title="Water Intake" value={isConnected ? `${metrics.waterIntake} L` : "--"} />
        <MetricCard title="Steps Count" value={isConnected ? `${metrics.stepsCount} steps` : "--"} />
        <MetricCard title="Sleep Hours" value={isConnected ? `${metrics.sleepHours} hrs` : "--"} />
        <MetricCard title="Stress Level" value={isConnected ? `${metrics.stressLevel}/10` : "--"} />
      </div>
    </div>
  );
};

const MetricCard = ({ title, value }) => (
  <div className="p-4 bg-gray-800 rounded-lg text-center">
    <h3 className="text-lg">{title}</h3>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default LiveMetrics;
