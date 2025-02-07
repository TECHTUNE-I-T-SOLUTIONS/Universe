import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
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
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  
  const navigate = useNavigate(); // Hook for redirection

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const toggleTheme = () => setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));

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
      default:
        return <AdminMainContent />;
    }
  };

  return (
    <div className={`flex h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-blue-700"} relative`}>
      {/* Sidebar - Fixed on the left */}
      <div
        className={`fixed top-0 left-0 h-full transition-all duration-300 z-40 ${
          isSidebarOpen ? "w-64" : "w-20"
        } ${theme === "dark" ? "bg-gray-800" : "bg-blue-100"}`}
      >
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} setActivePage={setActivePage} />
      </div>

      {/* Main Content - Adjusts to Sidebar width */}
      <main
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        } ${showLogoutDialog ? "opacity-50 pointer-events-none" : ""}`}
        style={{ zIndex: 20 }}
      >
        {/* Page Content - Adjusts to Header */}
        <div className={`h-full overflow-y-auto pt-16 ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>{renderActivePage()}</div>

        {/* Theme Toggle Button - Positioned under Rules Section */}
        <div className="mt-8 flex justify-center">
          <button className="px-3 py-2 bg-blue-500 text-white rounded" onClick={toggleTheme}>
            Change to {theme === "light" ? "Dark" : "Light"} Mode
          </button>
        </div>
      </main>

      {/* Logout Dialog - Shown above everything */}
      {showLogoutDialog && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className={`p-6 rounded shadow-lg ${theme === "dark" ? "bg-gray-700 text-white" : "bg-white text-black"}`}>
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
