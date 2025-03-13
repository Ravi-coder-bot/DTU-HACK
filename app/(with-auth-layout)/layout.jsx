"use client";
import { useState } from "react";
import Link from "next/link";
import {
    FaBars,
    FaTimes,
    FaBook,
    FaHome,
    FaUser,
    FaChartLine,
    FaClipboardList,
    FaCamera,
    FaLightbulb,
    FaUsers,
    FaSignOutAlt,
    FaRecycle,
  } from "react-icons/fa";
  import { UserButton } from "@clerk/nextjs";

export default function RootLayout({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className=" flex h-screen bg-gray-100 text-black">
      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "w-64" : "w-20"
        } transition-all duration-300 bg-gray-300  flex flex-col justify-between shadow-lg`}
      >
        {/* Sidebar Toggle Button */}
        <div className="sticky top-0 bg-gray-300 px-4 py-1 z-10 flex items-center justify-between ">
            {isOpen && (
             <div className="flex items-center">
             <a href="/" className="flex items-center">
               <h1 className="text-2xl font-bold tracking-tight transition-all duration-300">
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-900 to-green-300">Clean</span>
                 <span className="text-green-300">Yuva</span>
               </h1>
             </a>
           </div>
          )}
          {!isOpen && <span className="text-2xl font-bold text-green-900">C</span>}
          <div>
            <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-xl p-4 mt-1 ml-auto self-start"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
          </div>
        </div>
        <hr className='my-2 w-full border-gray-900'/>
        
        

        {/* Sidebar Links */}
        <ul className="flex-1 overflow-y-auto space-y-4 px-4 scrollbar-thin scrollbar-thumb-green-900 scrollbar-track-gray-300">
        <NavItem href="/" icon={<FaHome />} label="Dashboard" isOpen={isOpen} />
          <NavItem href="/upload-report" icon={<FaClipboardList />} label="Upload Report" isOpen={isOpen} />
          <NavItem href="/view-reports" icon={<FaBook />} label="View Reports" isOpen={isOpen} />
          <NavItem href="/ai-detections" icon={<FaCamera />} label="AI Detections" isOpen={isOpen} />
          <NavItem href="/analytics" icon={<FaChartLine />} label="Analytics" isOpen={isOpen} />
          <NavItem href="/recycling" icon={<FaRecycle />} label="Recycling Info" isOpen={isOpen} />
          <NavItem href="/community" icon={<FaUsers />} label="Community" isOpen={isOpen} />
          <NavItem href="/collaboration" icon={<FaUser />} label="Collaboration" isOpen={isOpen} />
          <NavItem href="/ai-insights" icon={<FaLightbulb />} label="AI Insights" isOpen={isOpen} />
        </ul>
        <hr className='my-2 w-full border-gray-900'/>

        {/* Logout Button */}
        <div className="sticky bottom-0 bg-gray-300 p-2">
          <NavItem href="/logout" icon={<FaSignOutAlt />} label="Logout" isOpen={isOpen} customStyle="text-red-500" />
        </div>
      </aside>
      

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <nav className="sticky top-0 bg-gray-300 p-4 flex justify-between items-center shadow-lg">
          <h1 className="text-lg font-bold">Dashboard</h1>
          <div className="flex items-center gap-6">
            <button className="p-2 bg-green-900 rounded">Feedback</button>
            <button className="p-2 bg-green-900 rounded">Help</button>
            <button className="p-2 bg-green-900 rounded">Docs</button>
            <div className="w-full h-full rounded-full object-cover">
              <UserButton/>
            </div>
            
          </div>
        </nav>
        <hr />

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

// Sidebar Link Component
function NavItem({ href, icon, label, isOpen, customStyle = "" }) {
  return (
    <li className={`flex items-center gap-3 p-2 hover:bg-green-900 rounded ${customStyle}`}>
      {icon}
      {isOpen && <Link href={href}>{label}</Link>}
    </li>
  );
}
