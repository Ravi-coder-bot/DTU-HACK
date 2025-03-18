"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
} from "recharts";

export default function Home() {
  const [selectedOrgan, setSelectedOrgan] = useState("");

  const sectionsRef = {
    lungs: useRef(null),
    heart: useRef(null),
    kidney: useRef(null),
  };

  useEffect(() => {
    if (selectedOrgan && sectionsRef[selectedOrgan]?.current) {
      sectionsRef[selectedOrgan].current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedOrgan]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <h1 className="text-3xl font-bold text-center p-4">X-Verse Health Dashboard</h1>

      {/* Dropdown Menu moved to the top */}
      <DropdownMenu setSelectedOrgan={setSelectedOrgan} />

      <HumanModelSection />
      
      <OrganSection ref={sectionsRef.lungs} title="Lungs" model={<LungsModel />} diseases={lungsDiseases} />
      <OrganSection ref={sectionsRef.heart} title="Heart" model={<HeartModel />} diseases={heartDiseases} />
      <OrganSection ref={sectionsRef.kidney} title="Kidney" model={<KidneyModel />} diseases={kidneyDiseases} />
    </div>
  );
}

// Diseases Data
const lungsDiseases = ["Asthma", "Bronchitis", "Lung Cancer"];
const heartDiseases = ["Heart Attack", "Arrhythmia", "Cardiomyopathy"];
const kidneyDiseases = ["Kidney Stones", "Chronic Kidney Disease", "Nephritis"];

// Health Data for Line Chart
const healthData = [
  { name: "Day 1", oxygen: 95, heartRate: 72, steps: 3000, calories: 500 },
  { name: "Day 2", oxygen: 96, heartRate: 75, steps: 4500, calories: 600 },
  { name: "Day 3", oxygen: 94, heartRate: 70, steps: 2000, calories: 400 },
  { name: "Day 4", oxygen: 97, heartRate: 78, steps: 5000, calories: 700 },
  { name: "Day 5", oxygen: 98, heartRate: 80, steps: 6000, calories: 800 },
  { name: "Day 6", oxygen: 99, heartRate: 82, steps: 7000, calories: 900 },
  { name: "Day 7", oxygen: 97, heartRate: 79, steps: 5500, calories: 750 },
];

// Human Model Section (Split into two parts: Chart on the left, Model on the right)
const HumanModelSection = () => (
  <div className="p-8 flex flex-col md:flex-row items-center">
    {/* Left Side: Interactive Line Chart */}
    <div className="w-full md:w-1/2 p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Health Metrics</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={healthData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#555" />
          <XAxis dataKey="name" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#333",
              border: "1px solid #555",
              borderRadius: "5px",
              color: "#fff",
            }}
          />
          <Legend
            wrapperStyle={{
              paddingTop: "10px",
              color: "#fff",
            }}
          />
          <Brush dataKey="name" height={20} stroke="#8884d8" fill="#333" />
          <Line
            type="monotone"
            dataKey="oxygen"
            stroke="#8884d8"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            animationDuration={500}
          />
          <Line
            type="monotone"
            dataKey="heartRate"
            stroke="#82ca9d"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            animationDuration={500}
          />
          <Line
            type="monotone"
            dataKey="steps"
            stroke="#ffc658"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            animationDuration={500}
          />
          <Line
            type="monotone"
            dataKey="calories"
            stroke="#ff7300"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            animationDuration={500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>

    {/* Right Side: Human Model */}
    <div className="w-full md:w-1/2 h-96">
      <h2 className="text-2xl font-bold text-center mb-4">Human Model</h2>
      <Canvas camera={{ position: [0, 400, 600] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} />
        <HumanModel />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  </div>
);

// Dropdown Menu
const DropdownMenu = ({ setSelectedOrgan }) => (
  <div className="flex justify-center p-4">
    <select
      className="p-2 rounded bg-gray-800 text-white"
      onChange={(e) => setSelectedOrgan(e.target.value)}
    >
      <option value="">Select an organ</option>
      <option value="lungs">Lungs</option>
      <option value="heart">Heart</option>
      <option value="kidney">Kidney</option>
    </select>
  </div>
);

// Organ Section Component
const OrganSection = React.forwardRef(({ title, model, diseases }, ref) => (
  <div ref={ref} className="flex flex-col md:flex-row items-center p-8 border-b border-gray-700">
    <div className="w-full md:w-1/2 h-96">
      <Canvas camera={{ position: [0, 2, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} />
        {model}
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
    <div className="w-full md:w-1/2 p-4">
      <h2 className="text-2xl font-bold mb-2">{title} Diseases</h2>
      <ul className="list-disc pl-5">
        {diseases.map((disease, index) => (
          <li key={index} className="text-lg">{disease}</li>
        ))}
      </ul>
    </div>
  </div>
));

// Model Components
const LungsModel = () => ModelComponent("/models/lungs2.glb", 10);  // Zoomed In
const HeartModel = () => ModelComponent("/models/heart.glb", 0.7);   // Zoomed Out
const KidneyModel = () => ModelComponent("/models/kidney.glb", 1.5);
const HumanModel = () => ModelComponent("/models/human_body.glb", 2.5);

// Generic Model Component
const ModelComponent = (path, scale = 1.5) => {
  const modelRef = useRef();
  const { scene } = useGLTF(path);

  useFrame(() => {
    if (modelRef.current) modelRef.current.rotation.y += 0.01;
  });

  return <primitive ref={modelRef} object={scene} scale={[scale, scale, scale]} />;
};