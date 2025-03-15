"use client";

import React, { useEffect, useState } from "react";

const LiveMetrics = () => {
  const [metrics, setMetrics] = useState({
    heartRate: "--",
    calories: "--",
    healthScore: "--",
    consultations: "--",
  });

  useEffect(() => {
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

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 5000); // Fetch every 5 sec

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold">Live Health Metrics</h1>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <MetricCard title="Heart Rate" value={`${metrics.heartRate} bpm`} />
        <MetricCard title="Calories Burned" value={`${metrics.calories} kcal`} />
        <MetricCard title="Health Score" value={`${metrics.healthScore}%`} />
        <MetricCard title="Consultations" value={`${metrics.consultations} this week`} />
      </div>
    </div>
  );
};

const MetricCard = ({ title, value }) => (
  <div className="p-4 bg-gray-800 rounded-lg">
    <h3 className="text-lg">{title}</h3>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default LiveMetrics;
