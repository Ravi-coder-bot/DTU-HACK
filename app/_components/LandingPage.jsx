"use client";
import React from "react";
import Navbar from "./Navbar";
import { TextGenerateEffect } from "../../components/ui/TextGenerateEffect";
import { ChevronRight, Star } from "lucide-react";

const LandingPage = () => {
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

      <div className="relative min-h-screen flex flex-col justify-center text-center px-4">
        <section id="main">
          <div className="h-full w-full flex">
            <div className="h-full w-[50%] flex flex-col justify-center items-center text-center">
              <div className="p-5">
                <TextGenerateEffect className="text-3xl font-extrabold sm:text-6xl text-blue-300 drop-shadow-lg" words="Innovating Healthcare for Better Lives" />
                <p className="text-gray-300 p-3 text-xl">
                  HealthSync is your one-stop platform for real-time health monitoring, AI-driven insights, and seamless doctor consultations.
                </p>

                {/* Centering Buttons in the 50% Div */}
                <div className="flex justify-center items-center mt-5 space-x-4">
                  <a
                    href="https://github.com/Ravi-coder-bot"
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
            <div>
              {/* Future: Place a 3D Globe or Animation Here */}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
