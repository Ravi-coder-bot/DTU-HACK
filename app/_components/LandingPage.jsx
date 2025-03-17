"use client";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import Navbar from "./Navbar";
import { TextGenerateEffect } from "../../components/ui/TextGenerateEffect";
import { ChevronRight, Star } from "lucide-react";
import { AnimatedTestimonials } from "../../components/ui/AnimatedTestimonial";
import testimonialpic1 from "../../public/assets/testimonialpic1.png";
import testimonialpic2 from "../../public/assets/testimonialpic2.png";
import testimonialpic3 from "../../public/assets/testimonialpic3.png";
import testimonialpic4 from "../../public/assets/testimonialpic4.png";
import testimonialpic5 from "../../public/assets/testimonialpic5.png";

// 3D Model Component
const Model = () => {
  const { scene } = useGLTF("/models/heart.glb"); // Ensure correct path
  return <primitive object={scene} scale={0.8} />;
};

const LandingPage = () => {
  const testimonials = [
    {
      quote:
        "HealthSync has revolutionized how I manage my health. The real-time monitoring and AI-driven insights give me confidence in my daily wellness routine.",
      name: "Dr. Sophia Patel",
      designation: "Cardiologist at MedCare",
      src: testimonialpic1, 
    },
    {
      quote:
        "The AI-powered health insights helped me detect early warning signs. HealthSync's seamless integration with my doctor saved me time and worry.",
      name: "Michael Lee",
      designation: "Software Engineer & Fitness Enthusiast",
      src: testimonialpic2,
    },
    {
      quote:
        "As a physician, I recommend HealthSync to my patients. The remote monitoring features allow me to track their vitals effortlessly and provide proactive care.",
      name: "Dr. Ananya Sharma",
      designation: "General Physician at HealthFirst",
      src: testimonialpic3, // 
    },
    {
      quote:
        "HealthSync made healthcare accessible to my elderly parents. The real-time vitals and doctor consultations have been a game-changer for us.",
      name: "Aisha Khan",
      designation: "Caregiver & Working Professional",
      src: testimonialpic4, //
    },
    {
      quote:
        "I love how HealthSync connects me directly with specialists. No more waiting rooms or long appointments—just instant, quality healthcare!",
      name: "James Carter",
      designation: "Entrepreneur & Health Advocate",
      src: testimonialpic5, // 
    },
  ];

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-[#030014] text-white">
      <Navbar />
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#1a237e_0%,_#0A1F44_50%,_black_100%)] opacity-80"></div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-60 top-10 left-20 animate-pulse"></div>
        <div className="absolute w-3 h-3 bg-pink-500 rounded-full opacity-70 top-40 left-1/3 animate-ping"></div>
        <div className="absolute w-1.5 h-1.5 bg-purple-400 rounded-full opacity-60 bottom-20 right-20 animate-pulse"></div>
        <div className="absolute w-4 h-4 bg-yellow-500 rounded-full opacity-50 bottom-10 left-1/4 animate-bounce"></div>
      </div>

      <div className="relative min-h-screen flex flex-col justify-center text-center px-4 pt-16">
        <section id="main">
          <div className="h-full w-full flex">
            {/* Left Text Section */}
            <div className="h-full w-[50%] flex flex-col justify-center items-center text-center">
              <div className="p-5">
                <TextGenerateEffect
                  className="text-3xl font-extrabold sm:text-6xl text-blue-300 drop-shadow-lg"
                  words="Innovating Healthcare for Better Lives"
                />
                <p className="text-gray-300 p-3 text-xl">
                  HealthSync is your one-stop platform for real-time health
                  monitoring, AI-driven insights, and seamless doctor
                  consultations.
                </p>

                {/* Centering Buttons */}
                <div className="flex justify-center items-center mt-5 space-x-4">
                  <a
                    href="https://github.com/Ravi-coder-bot/DTU-HACK"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-400 hover:text-blue-500 transition-colors border border-gray-500 hover:border-blue-500 rounded-full px-4 py-2 shadow-lg shadow-blue-400/50"
                  >
                    <Star className="h-4 w-4 mr-1" />
                    Learn More
                  </a>
                  <button
                    className="bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-600 hover:to-blue-400 text-white rounded-full px-6 py-2 shadow-lg shadow-blue-500/40 flex items-center transition-transform hover:scale-110"
                    onClick={() => (window.location.href = "/dashboard")}
                  >
                    Get Started
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Section: 3D Model */}
            <div className="w-[50%] h-[500px] flex justify-center items-center">
              <Canvas camera={{ position: [0, 6, 9], fov: 50 }}>
                {/* Adjusted camera position for zoom out */}
                <ambientLight intensity={0.6} />
                <directionalLight position={[3, 3, 3]} intensity={1} />
                <OrbitControls enableZoom={false} />
                <Model />
              </Canvas>
            </div>
          </div>
        </section>
        <section>
          <AnimatedTestimonials testimonials={testimonials} />
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
