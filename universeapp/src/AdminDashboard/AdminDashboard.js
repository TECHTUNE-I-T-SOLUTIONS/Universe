import React, { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";

// Import all the components/pages to be displayed
import AdminMainContent from "./Admin_Main_Content/AdminMainContent";
import Dashboard from "./Dashboard/Dashboard";
import UserManagement from "./Management/User_Management";
import AcademicManagement from "./Acad_Management/Acad_Management";
import ContentModeration from "./Content_Moderation/Content_Moderation";
import EventManagement from "./Event_Management/Event_Management";
import Settings from "./Settings/Settings";

const AdminDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState("AdminMainContent"); // Track active page

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const renderActivePage = () => {
    switch (activePage) {
      case "Dashboard":
        return <Dashboard />;
      case "UserManagement":
        return <UserManagement />;
      case "AcademicManagement":
        return <AcademicManagement />;
      case "ContentModeration":
        return <ContentModeration />;
      case "EventManagement":
        return <EventManagement />;
      case "Settings":
        return <Settings />;
      default:
        return <AdminMainContent />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        setActivePage={setActivePage} // Pass setActivePage to Sidebar
      />

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <div className="h-full overflow-y-auto p-4">{renderActivePage()}</div>
      </main>
    </div>
  );
};

export default AdminDashboard;
