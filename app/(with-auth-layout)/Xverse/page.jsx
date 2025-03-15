"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function Home() {
  const [selectedDisease, setSelectedDisease] = useState("lungs");

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white">
      <h1 className="text-3xl font-bold text-center p-4">X-Verse Health Dashboard</h1>

      {/* Disease Selection */}
      <div className="p-4 flex justify-center">
        <label className="mr-2 text-lg">Select Disease:</label>
        <select
          className="bg-gray-800 p-2 rounded"
          onChange={(e) => setSelectedDisease(e.target.value)}
        >
          <option value="lungs">Lungs Infection</option>
          <option value="heart">Heart Disease</option>
          <option value="kidney">Kidney Failure</option>
        </select>
      </div>

      {/* 3D Human Model */}
      <div className="flex justify-center items-center flex-grow">
        <Canvas camera={{ position: [0, 80, 180] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 2, 2]} />
          <HumanModel selectedDisease={selectedDisease} />
          <OrbitControls enableRotate={false} /> {/* Disable rotation control */}
        </Canvas>
      </div>
    </div>
  );
}

// 3D Model Component
const HumanModel = ({ selectedDisease }) => {
  const modelRef = useRef();
  const { scene } = useGLTF("/models/human_body.glb"); // Load 3D model

  // Rotate only in X-axis
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={modelRef} scale={[0.6, 0.6, 0.6]} position={[2, -1, 0]}>
      <primitive object={scene} />
    </mesh>
  );
};
