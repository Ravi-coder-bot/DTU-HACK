"use client";
import React from 'react';
import Navbar from './Navbar';
import { useState } from 'react';
import { TextGenerateEffect } from "../../components/ui/TextGenerateEffect";

import { ChevronRight,Star} from "lucide-react";


const LandingPage = () => {
  return (
    <div   className="min-h-screen w-full relative overflow-hidden">
      <Navbar />
      <div className="relative min-h-screen flex flex-col justify-center text-center px-4"> 
           <section id="main">
            <div className='h-full w-full flex '>
              <div className='h-full w-[50%]'>
                <div className='p-5 items-center '>
                  <TextGenerateEffect className="text-3xl font-extrabold sm:text-6xl" words="Make our Earth Clean Together" />
                  <p className="text-gray-600 p-3 text-xl">We are a group of passionate individuals who are working towards a greener future.</p>

                  <div className='ml-10 mt-5'>
                  <div className="flex items-center space-x-4">
              <a
                href="https://github.com/Ravi-coder-bot"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-green-900 hover:text-green-900 transition-colors border border-gray-700 hover:border-green-900 rounded-full px-4 py-1"
              >
                <Star className="h-4 w-4 mr-1" />
                Learn More
              </a>
              <button
                className="bg-gradient-to-r from-green-900 to-green-300 hover:from-green-400 hover:to-green-600 text-white rounded-full px-6 py-2 shadow-lg shadow-green-500/20 flex items-center transition-transform hover:scale-105"
                onClick={() => (window.location.href = "/dashboard")}
              >
                Get Started
                <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
                    
                  </div>
                </div>
              </div>
              <div>
                {/* globe */}
              </div>
              
              

            </div>
           </section>
        
      </div>
    </div>
  )
}

export default LandingPage