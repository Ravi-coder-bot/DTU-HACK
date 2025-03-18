"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { motion } from "framer-motion";

export default function Home() {
  const [selectedOrgan, setSelectedOrgan] = useState(null);

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white">
      <h1 className="text-3xl font-bold text-center p-4">X-Verse Health Dashboard</h1>
      
      {/* Dropdown Menu */}
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

      {/* 3D Human Model */}
      <div className="flex justify-center items-center flex-grow">
        <Canvas camera={{ position: [0, 80, 180] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 2, 2]} />
          <HumanModel />
        </Canvas>
      </div>

      {/* Grid of Organs */}
      <div className="grid grid-cols-3 gap-4 p-4">
        <OrganCard title="Lungs" cameraPosition={[0, 0.3, 0.4]} selected={selectedOrgan === "lungs"}>
          <LungsModel />
        </OrganCard>
        <OrganCard title="Heart" cameraPosition={[0, 5, 10]} selected={selectedOrgan === "heart"}>
          <HeartModel />
        </OrganCard>
        <OrganCard title="Kidney" cameraPosition={[0, 2, 5]} selected={selectedOrgan === "kidney"}>
          <KidneyModel />
        </OrganCard>
      </div>
    </div>
  );
}

// Wrapper for Organ Models
const OrganCard = ({ title, children, cameraPosition, selected }) => (
  <motion.div
    className={`p-4 rounded-lg flex flex-col items-center transition-all duration-300 ${
      selected ? "bg-yellow-500 scale-105 shadow-lg" : "bg-gray-800"
    }`}
    animate={{ y: selected ? -10 : 0 }}
  >
    <h2 className="text-lg font-semibold mb-2">{title}</h2>
    <Canvas camera={{ position: cameraPosition }} className="h-40 w-40">
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} />
      {children}
      <OrbitControls enableZoom={true} />
    </Canvas>
  </motion.div>
);

// 3D Human Model
const HumanModel = () => {
  const modelRef = useRef();
  const { scene } = useGLTF("/models/human_body.glb");

  useFrame(() => {
    if (modelRef.current) modelRef.current.rotation.y += 0.005;
  });

  return <primitive ref={modelRef} object={scene} scale={[0.6, 0.6, 0.6]} position={[2, -1, 0]} />;
};

// Lungs Model
const LungsModel = () => {
  const modelRef = useRef();
  const { scene } = useGLTF("/models/lungs2.glb");

  useFrame(() => {
    if (modelRef.current) modelRef.current.rotation.y += 0.01;
  });

  return <primitive ref={modelRef} object={scene} scale={[1.5, 1.5, 1.5]} />;
};

// Heart Model
const HeartModel = () => {
  const modelRef = useRef();
  const { scene } = useGLTF("/models/heart.glb");

  useFrame(() => {
    if (modelRef.current) modelRef.current.rotation.y += 0.01;
  });

  return <primitive ref={modelRef} object={scene} scale={[1.5, 1.5, 1.5]} />;
};

// Kidney Model
const KidneyModel = () => {
  const modelRef = useRef();
  const { scene } = useGLTF("/models/kidney.glb");

  useFrame(() => {
    if (modelRef.current) modelRef.current.rotation.y += 0.01;
  });

  return <primitive ref={modelRef} object={scene} scale={[1.5, 1.5, 1.5]} />;
};