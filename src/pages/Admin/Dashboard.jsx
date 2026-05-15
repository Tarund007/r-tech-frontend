import React, { useState, useEffect, useRef, useCallback } from "react";
import { Search, Users, BarChart2, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import useDashboardSocket from "../../hooks/useDashboardSocket";
import Sidebar from "../../components/Sidebar";
import { Settings, Mail } from "lucide-react"; // Uncomment if you use these icons
import { File, FileArchiveIcon, FileText, FileBarChart, FileSpreadsheet, FileArchive, FileSignature, FileCheck2 } from "lucide-react";

import MessagePanel from "../../components/MessagePanel";
import RecentDocuments from "../../components/RecentDocuments";

import { io } from "socket.io-client";
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000';
export const socket = io(SOCKET_URL);

const API_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000') + "/api/documents";

// Utility functions

const getFileIcon = (filename) => {
  const ext = filename?.split(".").pop().toLowerCase();

  switch (ext) {
    case "pdf":
      return <FileArchiveIcon className="w-4 h-4 text-red-600" />;
    case "doc":
    case "docx":
      return <FileText className="w-4 h-4 text-blue-600" />;
    case "ppt":
    case "pptx":
      return <FileBarChart className="w-4 h-4 text-orange-500" />;
    case "xls":
    case "xlsx":
      return <FileSpreadsheet className="w-4 h-4 text-green-600" />;
    case "zip":
    case "rar":
      return <FileArchive className="w-4 h-4 text-gray-500" />;
    case "txt":
      return <FileSignature className="w-4 h-4 text-gray-400" />;
    case "json":
    case "csv":
      return <FileCheck2 className="w-4 h-4 text-yellow-500" />;
    default:
      return <File className="w-4 h-4 text-gray-400" />;
  }
};


const getFileTypeLabel = (filename) => {
  const ext = filename?.split(".").pop().toLowerCase();
  switch (ext) {
    case "pdf": return "PDF";
    case "doc":
    case "docx": return "Word";
    case "ppt":
    case "pptx": return "PPT";
    case "xls":
    case "xlsx": return "Excel";
    default: return "File";
  }
};

const renderAvgSession = (value) => {
  if (!value || isNaN(value)) return "0m 0s";
  const mins = Math.floor(value / 60);
  const secs = value % 60;
  return `${mins}m ${secs}s`;
};

export default function Dashboard() {
  const { filteredDocs,activeUsers, conversionRate, avgSession, } = useDashboardSocket();
  const [query, setQuery] = useState("");
  const observerRef = useRef();
  const navigate = useNavigate();
  const [visibleDocs, setVisibleDocs] = useState([]);
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([]);
  const filteredMsgs = messages.filter(Boolean);
  useEffect(() => {
  socket.on("newMessage", (message) => {
    setMessages((prev) => [message, ...prev.slice(0, 9)]); // Max 10 messages
  }); 

  return () => socket.off("newMessage");
}, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(`${API_URL}/upload`, formData);
      const newDoc = res.data;
      const updatedDocs = [newDoc, ...documents];
      setDocuments(updatedDocs);
      setFilteredDocs(updatedDocs);
      setVisibleDocs(updatedDocs.slice(0, 20));
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get("/auth/logout");
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
  <div className="flex h-screen overflow-y-auto">
    <Sidebar />
    <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dashboards, reports, users..."
            className="w-full rounded-full border border-gray-200 px-4 py-2 pr-10 text-sm placeholder-gray-400"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        </div>

        <div className="flex items-center gap-4 ml-auto">
          <div className="text-right">
            <p className="text-sm font-semibold text-blue-900">D.P Dinkar</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
          <img src="/assets/R-Tech-10.png" alt="Avatar" className="w-10 h-10 rounded-full border" />
          <button onClick={handleLogout} className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-medium">
            Logout
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-5 rounded-xl shadow border">
          <Users className="text-blue-600 w-5 h-5 mb-2" />
          <p className="text-sm font-semibold text-blue-900">Active Users</p>
          <p className="text-2xl font-bold text-blue-800">{activeUsers}</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow border">
          <BarChart2 className="text-blue-600 w-5 h-5 mb-2" />
          <p className="text-sm font-semibold text-blue-900">Conversion Rate</p>
          <p className="text-2xl font-bold text-blue-800">{conversionRate}%</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow border">
          <Clock className="text-blue-600 w-5 h-5 mb-2" />
          <p className="text-sm font-semibold text-blue-900">Avg. Session</p>
          <p className="text-2xl font-bold text-blue-800">{renderAvgSession(avgSession)}</p>
        </div>
      </div>

      {/* ───────────────────────── MAIN GRID (CHART + LINKS) ───────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Chart area (2 columns) */}
        <div className="lg:col-span-2 gap-4 space-y-6 ">
          <div className="bg-white rounded-xl shadow border p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base font-semibold text-blue-900">Users Overview</h2>
              <div className="flex gap-2">
                {['Weekly', 'Monthly', 'Yearly'].map((range) => (
                  <button
                    key={range}
                    className="text-sm px-3 py-1 rounded-full border text-blue-700 hover:bg-blue-100"
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* Chart placeholder */}
            <div className="h-48 bg-gray-50 border border-dashed rounded-lg flex items-center justify-center text-gray-400 text-sm">
              (Chart Placeholder)
            </div>
          </div>
        </div>

        {/* Quick links (third column) */}
        <div className="bg-white p-5 rounded-xl shadow border">
          <h3 className="text-sm font-semibold text-blue-900 mb-4">Quick Links</h3>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => navigate('/users')}
              className="flex flex-col items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-4 rounded-lg transition"
            >
              <Users className="w-6 h-6 text-blue-600" strokeWidth={2.5} />
              <span className="text-sm text-center">Users Management</span>
            </button>

            <button
              onClick={() => navigate('/analytics')}
              className="flex flex-col items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-4 rounded-lg transition"
            >
              <BarChart2 className="w-6 h-6 text-blue-600" strokeWidth={2.5} />
              <span className="text-sm text-center">Analytics Overview</span>
            </button>

            <button
              onClick={() => navigate('/settings')}
              className="flex flex-col items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-4 rounded-lg transition"
            >
              <Settings className="w-6 h-6 text-blue-600" strokeWidth={2.5} />
              <span className="text-sm text-center">Settings</span>
            </button>

            <button
              onClick={() => navigate('/messages')}
              className="flex flex-col items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-4 rounded-lg transition"
            >
              <Mail className="w-6 h-6 text-blue-600" strokeWidth={2.5} />
              <span className="text-sm text-center">Messages</span>
            </button>
          </div>
        </div>
      </div>

      {/* DOCUMENTS & MESSAGES – SIDE BY SIDE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {visibleDocs && (
          <RecentDocuments
            documents={filteredDocs}
            onUpload={handleUpload}
            visibleDocs={visibleDocs}
            observerRef={observerRef}
          />
        )}
    
        <MessagePanel messages={filteredMsgs} />
        
      </div>
    </main>
  </div>
);

}
