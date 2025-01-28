import React, { useState } from "react";
import logo from "../../icons/UniVerselog.svg";
import Nametext from "../../icons/UniVersetext.svg";
import openSidebarIcon from "../../icons/open_sidebar.png";
import closeSidebarIcon from "../../icons/close_sidebar.png";
import log_out from "../../icons/log-out.png";

const Sidebar = ({ isSidebarOpen, toggleSidebar, setActivePage }) => {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = () => {
    setShowLogoutDialog(true);
  };

  const confirmLogout = () => {
    setShowLogoutDialog(false);
    console.log("Logout confirmed");
    // Perform actual logout logic here
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
          <img src={logo} alt="Logo" className="h-[5vmin]" />
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
          className="w-full text-left p-2 hover:bg-gray-200"
        >
          Dashboard
        </button>
        <button
          onClick={() => setActivePage("UserManagement")}
          className="w-full text-left p-2 hover:bg-gray-200"
        >
          User Management
        </button>
        <button
          onClick={() => setActivePage("AcademicManagement")}
          className="w-full text-left p-2 hover:bg-gray-200"
        >
          Academic Management
        </button>
        <button
          onClick={() => setActivePage("ContentModeration")}
          className="w-full text-left p-2 hover:bg-gray-200"
        >
          Content Moderation
        </button>
        <button
          onClick={() => setActivePage("EventManagement")}
          className="w-full text-left p-2 hover:bg-gray-200"
        >
          Event Management
        </button>
        <button
          onClick={() => setActivePage("Settings")}
          className="w-full text-left p-2 hover:bg-gray-200"
        >
          Settings
        </button>
      </nav>

      {/* Logout Button */}
      <div className="p-4 bg-gray-200 rounded hover:bg-gray-500 hover:text-white">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center w-full"
          title="log-out"
        >
          <img src={log_out} alt="Logout" className="w-6 h-6 rounded-full mr-2" />
          {isSidebarOpen && <span>Logout</span>}
        </button>
      </div>

      {/* Logout Confirmation Dialog */}
      {showLogoutDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">Admin Logout Confirmation</h3>
            <p>Are you sure you want to log out?</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={cancelLogout}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
