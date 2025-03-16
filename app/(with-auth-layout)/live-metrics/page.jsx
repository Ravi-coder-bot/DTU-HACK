"use client";

import React, { useEffect, useState } from "react";

const LiveMetrics = () => {
  const [metrics, setMetrics] = useState({
    heartRate: "--",
    calories: "--",
    healthScore: "--",
    oxygenLevel: "--",
    waterIntake: "--",
    stepsCount: "--",
    sleepHours: "--",
    stressLevel: "--",
    bloodPressure: "--",
    bodyTemperature: "--",
    hydrationLevel: "--",
    activeMinutes: "--",
    respiratoryRate: "--",
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
      interval = setInterval(fetchMetrics, 5000);
    }

    return () => clearInterval(interval);
  }, [isConnected]);

  const handleConnect = () => {
    setIsConnected(true);
    setMetrics((prev) => ({ ...prev })); // Force re-render
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-900 to-black text-white p-6">
      <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
        Live Health Metrics
      </h1>

      <button
        onClick={handleConnect}
        disabled={isConnected}
        className={`mt-6 px-6 py-3 rounded-lg text-white font-semibold transition duration-300 shadow-lg ${
          isConnected
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 hover:shadow-xl"
        }`}
      >
        {isConnected ? "Connected to Wearable ✅" : "Connect to Wearable"}
      </button>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 w-full max-w-5xl">
        {Object.entries(metrics).map(([key, value], index) => (
          <MetricCard
            key={key}
            title={formatTitle(key)}
            value={isConnected ? value : "--"}
            size={getGridSize(index)}
          />
        ))}
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, size }) => (
  <div className={`p-4 bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg ${size}`}>
    <h3 className="text-lg font-medium text-gray-300">{title}</h3>
    <p className="text-3xl font-bold text-blue-400">{value}</p>
  </div>
);

const formatTitle = (key) => {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
};

const getGridSize = (index) => {
  if (index === 1) return "col-span-2"; // Make the second box wide
  const sizes = ["col-span-1", "col-span-1", "col-span-3", "col-span-2", "col-span-1"];
  return sizes[index % sizes.length];
};

export default LiveMetrics;