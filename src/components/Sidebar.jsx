// File: src/components/Sidebar.jsx
import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import Messages from "./Messages"
import {
  Home,
  Users,
  BarChart,
  FileText,
  Settings,
  Calendar,
  LogOut,
} from "lucide-react";

// import Messages from "./Messages";// Ensure this import matches your file structure

const navItems = [
  { label: "Dashboard", icon: <Home size={18} />, path: "/dashboard" },
  { label: "Messages", icon: <FileText size={18} />, path: "/admin/messages" },
  { label: "Users", icon: <Users size={18} />, path: "/users" },
  { label: "Analytics", icon: <BarChart size={18} />, path: "/analytics" },
  
  { label: "Settings", icon: <Settings size={18} />, path: "/settings" },
  { label: "Calendar", icon: <Calendar size={18} />, path: "/calendar" },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("/auth/logout");
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="w-56 h-screen bg-white shadow-sm border-r flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 p-6 border-b">
          <img src="/assets/R-Tech.svg" alt="Logo" className="w-8 h-8" />
          <h1 className="font-bold text-blue-800 text-base">Business</h1>
        </div>

        <nav className="flex flex-col space-y-2 px-3 py-4">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-blue-50 hover:text-blue-800 ${
                location.pathname === item.path
                  ? "bg-blue-100 text-blue-700"
                  : "text-blue-600"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-6 border-t">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-blue-600 text-sm font-medium hover:text-blue-800 hover:underline"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
