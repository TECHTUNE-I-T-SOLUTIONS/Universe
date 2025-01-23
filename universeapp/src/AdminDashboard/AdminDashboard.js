import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import AdminMainContent from "./Admin_Main_Content/AdminMainContent";
import UserManagement from "../AdminDashboard/Management/User_Management";
import AcademicManagement from "../AdminDashboard/Acad_Management/Acad_Management";
import ContentModeration from "../AdminDashboard/Content_Moderation/Content_Moderation";
import EventManagement from "../AdminDashboard/Event_Management/Event_Management";
import Settings from "./Settings/Settings";

const AdminDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        onNavigate={(path) => navigate(path)} // Pass navigation handler to Sidebar
      />

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <Routes>
          <Route path="/" element={<AdminMainContent />} />
          <Route path="/Dashboard" element={<AdminMainContent />} />
          <Route path="/UserManagement" element={<UserManagement />} />
          <Route path="/Acad_Management" element={<AcademicManagement />} />
          <Route path="/Content_Moderation" element={<ContentModeration />} />
          <Route path="/Event_Management" element={<EventManagement />} />
          <Route path="/Settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;
