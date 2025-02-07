import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import logo from "../../icons/UniVerselog.svg";
import Nametext from "../../icons/UniVersetext.svg";
import openSidebarIcon from "../../icons/open_sidebar.png";
import closeSidebarIcon from "../../icons/close_sidebar.png";
import log_out from "../../icons/log-out.png";
import dashboardIcon from "../../icons/Dashboard.png"; // Replace with your actual icon paths
import userManagementIcon from "../../icons/User_Management.png";
import academicManagementIcon from "../../icons/Academic_Management.png";
import contentModerationIcon from "../../icons/Content_Moderation.png";
import eventManagementIcon from "../../icons/Event_Management.png";
import settingsIcon from "../../icons/Setings.png";

const Sidebar = ({ isSidebarOpen, toggleSidebar, setActivePage }) => {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const navigate = useNavigate(); // Hook for redirection

  const handleLogout = () => {
    setShowLogoutDialog(true);
  };

  const confirmLogout = () => {
    console.log("Logout confirmed, redirecting...");
    localStorage.removeItem("adminToken");
    sessionStorage.removeItem("adminSession");
    setShowLogoutDialog(false); // Close the dialog

    // Ensure logout completes before redirecting
    setTimeout(() => {
      navigate("/Admin");
    }, 500);
  };

  const cancelLogout = () => {
    setShowLogoutDialog(false);
  };

  return (
    <aside
      className={`${
        isSidebarOpen ? "w-64" : "w-20"
      } transition-width duration-300 bg-gray-300 text-black flex flex-col fixed top-0 left-0 h-full`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
            <img
              src={logo}
              className="h-[5vmin] pointer-events-none z-10 animate-spin-slow"
              alt="logo" 
            />
          {isSidebarOpen && <img src={Nametext} alt="UniVerse" className="h-6" />}
        </div>
        <button onClick={toggleSidebar}>
          <img
            src={isSidebarOpen ? closeSidebarIcon : openSidebarIcon}
            alt="Toggle Sidebar"
            className="w-6 h-6"
          />
        </button>
      </div>

      {/* Sidebar Items */}
      <nav className="flex-1 px-4 space-y-4 overflow-y-auto">
        <button
          onClick={() => setActivePage("Dashboard")}
          className="flex items-center w-full text-left p-2 hover:bg-gray-200"
          title="Dashboard"
        >
          <img src={dashboardIcon} alt="Dashboard" className="w-6 h-6 mr-4" />
          {isSidebarOpen && <span>Dashboard</span>}
        </button>
        <button
          onClick={() => setActivePage("UserManagement")}
          className="flex items-center w-full text-left p-2 hover:bg-gray-200"
          title="User Management"
        >
          <img src={userManagementIcon} alt="User Management" className="w-6 h-6 mr-4" />
          {isSidebarOpen && <span>User Management</span>}
        </button>
        <button
          onClick={() => setActivePage("AcademicManagement")}
          className="flex items-center w-full text-left p-2 hover:bg-gray-200"
          title="Academic Management"
        >
          <img src={academicManagementIcon} alt="Academic Management" className="w-6 h-6 mr-4" />
          {isSidebarOpen && <span>Academic Management</span>}
        </button>
        <button
          onClick={() => setActivePage("ContentModeration")}
          className="flex items-center w-full text-left p-2 hover:bg-gray-200"
          title="Content Moderation"
        >
          <img src={contentModerationIcon} alt="Content Moderation" className="w-6 h-6 mr-4" />
          {isSidebarOpen && <span>Content Moderation</span>}
        </button>
        <button
          onClick={() => setActivePage("EventManagement")}
          className="flex items-center w-full text-left p-2 hover:bg-gray-200"
          title="Event Management"
        >
          <img src={eventManagementIcon} alt="Event Management" className="w-6 h-6 mr-4" />
          {isSidebarOpen && <span>Event Management</span>}
        </button>
        <button
          onClick={() => setActivePage("Settings")}
          className="flex items-center w-full text-left p-2 hover:bg-gray-200"
          title="Settings"
        >
          <img src={settingsIcon} alt="Settings" className="w-6 h-6 mr-4" />
          {isSidebarOpen && <span>Settings</span>}
        </button>
      </nav>

      {/* Logout */}
      <a
        href="#logout"
        onClick={handleLogout}
        className="flex items-center justify-center p-4 bg-gray-200 rounded hover:bg-blue-800 hover:text-white"
        title="click to log-out"
      >
        <img src={log_out} alt="Logout" className="w-6 h-6 rounded-full mr-2" />
        {isSidebarOpen && <span>Logout</span>}
      </a>

      {/* Custom Logout Dialog */}
      {showLogoutDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100]">
          <div className="bg-white p-6 rounded-lg shadow-lg z-[101]">
            <h3 className="text-lg font-bold mb-4">Logout Confirmation</h3>
            <p>Are you sure you want to log out?</p>
            <div className="flex justify-between mt-4">
              <button onClick={cancelLogout} className="px-4 py-2 bg-gray-500 text-white rounded-lg">
                Cancel
              </button>
              <button onClick={confirmLogout} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )};

    </aside>
  );
};

export default Sidebar;
