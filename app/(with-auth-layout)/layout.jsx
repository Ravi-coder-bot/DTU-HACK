"use client";
import { useState } from "react";
import Link from "next/link";
import * as Popover from "@radix-ui/react-popover";
import { useClerk } from "@clerk/nextjs";
import {
  FaBars,
  FaTimes,
  FaHeartbeat,
  FaUserMd,
  FaChartLine,
  FaClipboardList,
  FaShoppingCart,
  FaUsers,
  FaSignOutAlt,
  FaRobot,
  FaLaptopMedical,
} from "react-icons/fa";
import { UserButton } from "@clerk/nextjs";

export default function RootLayout({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  const { signOut } = useClerk();

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#0A1F44] to-[#1E3A8A] text-white">
      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "w-64" : "w-20"
        } transition-all duration-300 bg-gradient-to-r from-[#1E3A8A] to-[#0A1F44] shadow-lg`}
      >
        {/* Sidebar Toggle Button */}
        <div className="sticky top-0 px-4 py-3 flex items-center justify-between">
          {isOpen && (
            <div className="flex items-center">
              <a href="/" className="flex items-center">
                <h1 className="text-2xl font-bold tracking-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
                    Health
                  </span>
                  <span className="text-cyan-300">Sync</span>
                </h1>
              </a>
            </div>
          )}
          {!isOpen && <span className="text-2xl font-bold text-cyan-300">H</span>}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-xl p-3 hover:text-gray-300"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <hr className="border-gray-600" />

        {/* Sidebar Links */}
        <ul className="flex-1 overflow-y-auto space-y-4 px-4 scrollbar-thin scrollbar-thumb-cyan-500 scrollbar-track-gray-800">
          <NavItem href="/dashboard" icon={<FaChartLine />} label="Dashboard" isOpen={isOpen} />
          <NavItem href="/live-metrics" icon={<FaHeartbeat />} label="Live Metrics" isOpen={isOpen} />
          <NavItem href="/Xverse" icon={<FaLaptopMedical />} label="3D Xverse" isOpen={isOpen} />
          <NavItem href="/ai-insights" icon={<FaRobot />} label="AI Insights" isOpen={isOpen} />
          <NavItem href="/booking" icon={<FaUserMd />} label="Consultation" isOpen={isOpen} />
          <NavItem href="/community" icon={<FaUsers />} label="Community" isOpen={isOpen} />
          <NavItem href="/Veda-shop" icon={<FaShoppingCart />} label="Veda Store" isOpen={isOpen} />
          <NavItem href="/recomendation" icon={<FaShoppingCart />} label="Recomendation" isOpen={isOpen} />
          <NavItem href="/medical-history" icon={<FaClipboardList />} label="Medical History" isOpen={isOpen} />
        </ul>
        <hr className="border-gray-600" />

        {/* Logout Button */}
        <div className="p-4">
          <LogoutPopover />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <nav className="sticky top-0 bg-gradient-to-r from-[#1E3A8A] to-[#0A1F44] p-4 flex justify-between items-center shadow-lg">
  <h1 className="text-lg font-semibold">Dashboard</h1>
  <div className="flex items-center gap-4">
    <NavButton label="Feedback" />
    <NavButton label="Help" />
    <NavButton label="Docs" />
    <div className="w-full h-full rounded-full object-cover">
      <UserButton />
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
function NavItem({ href, icon, label, isOpen }) {
  return (
    <li className="flex items-center gap-3 p-2 hover:bg-cyan-500 rounded transition">
      {icon}
      {isOpen && <Link href={href}>{label}</Link>}
    </li>
  );
}

// Logout Popover
function LogoutPopover() {
  const { signOut } = useClerk();
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="flex items-center gap-3 p-2 text-red-400 hover:bg-red-500 hover:text-white rounded w-full transition">
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </Popover.Trigger>
      <Popover.Content
        className="w-48 bg-white text-black shadow-lg rounded-lg p-4 flex flex-col items-center text-center"
        side="top"
        align="center"
      >
        <p className="text-gray-800 mb-3">Are you sure you want to log out?</p>
        <div className="flex gap-2">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            onClick={() => signOut()}
          >
            Logout
          </button>
          <Popover.Close asChild>
            <button className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition">
              Cancel
            </button>
          </Popover.Close>
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}

function NavButton({ label }) {
  return (
    <button className="px-4 py-2 font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg shadow-md transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:from-blue-400 hover:to-cyan-400">
      {label}
    </button>
  );
}
