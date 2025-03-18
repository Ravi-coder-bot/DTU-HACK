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
      <DropdownMenu setSelectedOrgan={setSelectedOrgan} />
      <HumanModelSection />
      <OrganSection ref={sectionsRef.lungs} title="Lungs" model={<LungsModel />} diseases={lungsDiseases} />
      <OrganSection ref={sectionsRef.heart} title="Heart" model={<HeartModel />} diseases={heartDiseases} />
      <OrganSection ref={sectionsRef.kidney} title="Kidney" model={<KidneyModel />} diseases={kidneyDiseases} />
    </div>
  );
}

const lungsDiseases = ["Asthma", "Bronchitis", "Lung Cancer"];
const heartDiseases = ["Heart Attack", "Arrhythmia", "Cardiomyopathy"];
const kidneyDiseases = ["Kidney Stones", "Chronic Kidney Disease", "Nephritis"];

const generateDiseaseData = (diseases) => {
  return diseases.map((disease) => ({
    name: disease,
    cases: Math.floor(Math.random() * 1000) + 500,
  }));
};

const HumanModelSection = () => {
  const [lungsData, setLungsData] = useState(generateDiseaseData(lungsDiseases));
  const [heartData, setHeartData] = useState(generateDiseaseData(heartDiseases));
  const [kidneyData, setKidneyData] = useState(generateDiseaseData(kidneyDiseases));

  useEffect(() => {
    const interval = setInterval(() => {
      setLungsData(generateDiseaseData(lungsDiseases));
      setHeartData(generateDiseaseData(heartDiseases));
      setKidneyData(generateDiseaseData(kidneyDiseases));
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8 flex flex-col md:flex-row items-center">
      <div className="w-full md:w-1/2 p-4">
        <h2 className="text-2xl font-bold text-center mb-4">Disease Metrics</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={lungsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#555" />
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip contentStyle={{ backgroundColor: "#333", border: "1px solid #555", borderRadius: "5px", color: "#fff" }} />
            <Legend wrapperStyle={{ paddingTop: "10px", color: "#fff" }} />
            <Brush dataKey="name" height={20} stroke="#8884d8" fill="#333" />
            <Line type="monotone" dataKey="cases" stroke="#8884d8" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
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
};

const DropdownMenu = ({ setSelectedOrgan }) => (
  <div className="flex justify-center p-4">
    <select className="p-2 rounded bg-gray-800 text-white" onChange={(e) => setSelectedOrgan(e.target.value)}>
      <option value="">Select an organ</option>
      <option value="lungs">Lungs</option>
      <option value="heart">Heart</option>
      <option value="kidney">Kidney</option>
    </select>
  </div>
);

const OrganSection = React.forwardRef(({ title, model, diseases }, ref) => {
  const [data, setData] = useState(generateDiseaseData(diseases));

  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateDiseaseData(diseases));
    }, 15000);
    return () => clearInterval(interval);
  }, [diseases]);

  return (
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
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#555" />
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip contentStyle={{ backgroundColor: "#333", border: "1px solid #555", borderRadius: "5px", color: "#fff" }} />
            <Legend wrapperStyle={{ paddingTop: "10px", color: "#fff" }} />
            <Line type="monotone" dataKey="cases" stroke="#8884d8" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
});

const LungsModel = () => ModelComponent("/models/lungs2.glb", 10);
const HeartModel = () => ModelComponent("/models/heart.glb", 0.7);
const KidneyModel = () => ModelComponent("/models/kidney.glb", 1.5);
const HumanModel = () => ModelComponent("/models/human_body.glb", 2.5);

const ModelComponent = (path, scale = 1.5) => {
  const modelRef = useRef();
  const { scene } = useGLTF(path);
  useFrame(() => {
    if (modelRef.current) modelRef.current.rotation.y += 0.01;
  });
  return <primitive ref={modelRef} object={scene} scale={[scale, scale, scale]} />;
};