import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";

// Import all the components/pages to be displayed
import AdminMainContent from "./Admin_Main_Content/AdminMainContent";
import Dashboard from "./Dashboard/Dashboard";
import UserManagement from "./Management/User_Management";
import AcademicManagement from "./Acad_Management/Acad_Management";
import ContentModeration from "./Content_Moderation/Content_Moderation";
import EventManagement from "./Event_Management/Event_Management";
import Settings from "./Settings/Settings";
import ProfileSettings from "./Settings/Profile_Settings"; // New: Profile settings page

const AdminDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState("AdminMainContent"); // Track active page
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  
  const navigate = useNavigate(); // Hook for redirection


  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    sessionStorage.removeItem("adminSession");
    setShowLogoutDialog(false);
    setTimeout(() => {
      navigate("/Admin");
    }, 500);
  };

  const renderActivePage = () => {
    switch (activePage) {
      case "Dashboard":
        return <Dashboard setActivePage={setActivePage} showLogoutDialog={showLogoutDialog} />;
      case "UserManagement":
        return <UserManagement setActivePage={setActivePage} />;
      case "AcademicManagement":
        return <AcademicManagement setActivePage={setActivePage} />;
      case "ContentModeration":
        return <ContentModeration setActivePage={setActivePage} />;
      case "EventManagement":
        return <EventManagement setActivePage={setActivePage} />;
      case "Settings":
        return <Settings setActivePage={setActivePage} />;
      case "Profile_Settings":
        return <ProfileSettings setActivePage={setActivePage} />;
      default:
        return <AdminMainContent setActivePage={setActivePage} />;
    }
  };

  return (
    <div className={`flex h-screen bg-gray-100 relative`}>
      {/* Sidebar - Fixed on the left */}
      <div
        className={`fixed top-0 left-0 h-full transition-all duration-300 z-40 ${
          isSidebarOpen ? "w-64" : "w-20"
        } }`}
      >
        <Sidebar 
          isSidebarOpen={isSidebarOpen} 
          toggleSidebar={toggleSidebar} 
          activePage={activePage}
          setActivePage={setActivePage} 
        />
      </div>

      {/* Main Content - Adjusts to Sidebar width */}
      <main
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        } ${showLogoutDialog ? "opacity-50 pointer-events-none" : ""}`}
        style={{ zIndex: 20 }}
      >
        {/* Page Content - Adjusts to Header */}
        <div className={`h-full overflow-y-auto pt-16 bg-white`}>
          {renderActivePage()}
        </div>
      </main>

      {/* Logout Dialog */}
      {showLogoutDialog && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className={`p-6 rounded shadow-lg bg-white text-black`}>
            <p className="text-lg font-semibold">Are you sure you want to log out?</p>
            <div className="mt-4 flex justify-end space-x-4">
              <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => setShowLogoutDialog(false)}>
                Cancel
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
