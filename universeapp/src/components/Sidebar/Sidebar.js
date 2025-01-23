import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../icons/UniVerselog.svg";
import Nametext from "../../icons/UniVersetext.svg";
import openSidebarIcon from "../../icons/open_sidebar.png";
import closeSidebarIcon from "../../icons/close_sidebar.png";
import log_out from "../../icons/log-out.png"; // Ensure you import the logout icon

// Import Sidebar Items
import DashboardItem from "./DashboardItem";
import UserManagementItem from "./UserManagementItem";
import AcademicManagementItem from "./AcademicManagementItem";
import ContentModerationItem from "./ContentModerationItem";
import EventManagementItem from "./EventManagementItem";
import SettingsItem from "./SettingsItem";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const [showSubMenu, setShowSubMenu] = useState({});
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const navigate = useNavigate();

  const toggleSubMenu = (menuName) => {
    setShowSubMenu((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  const handleLogout = () => {
    setShowLogoutDialog(true);
  };

  const confirmLogout = () => {
    setShowLogoutDialog(false);
    navigate("/Admin");
    console.log("Logout confirmed");
  };

  const cancelLogout = () => {
    setShowLogoutDialog(false);
  };

  const handleItemClick = (href, menuName) => {
    if (isSidebarOpen) {
      // Open submenu when sidebar is expanded
      toggleSubMenu(menuName);
    } else {
      // Navigate to the respective page when sidebar is collapsed
      navigate(href);
    }
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
            alt="Logo"
            className="h-[5vmin] pointer-events-none z-10 animate-spin-slow"
          />
          {isSidebarOpen && (
            <img src={Nametext} alt="UniVerse" className="h-6" />
          )}
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
        <DashboardItem
          isSidebarOpen={isSidebarOpen}
          onClick={() => handleItemClick("/Dashboard", "Dashboard")}
          toggleSubMenu={toggleSubMenu}
          showSubMenu={showSubMenu}
        />
        <UserManagementItem
          isSidebarOpen={isSidebarOpen}
          onClick={() => handleItemClick("/UserManagement", "UserManagement")}
          toggleSubMenu={toggleSubMenu}
          showSubMenu={showSubMenu}
        />
        <AcademicManagementItem
          isSidebarOpen={isSidebarOpen}
          onClick={() =>
            handleItemClick("/Acad_Management", "AcademicManagement")
          }
          toggleSubMenu={toggleSubMenu}
          showSubMenu={showSubMenu}
        />
        <ContentModerationItem
          isSidebarOpen={isSidebarOpen}
          onClick={() =>
            handleItemClick("/Content_Moderation", "ContentModeration")
          }
          toggleSubMenu={toggleSubMenu}
          showSubMenu={showSubMenu}
        />
        <EventManagementItem
          isSidebarOpen={isSidebarOpen}
          onClick={() =>
            handleItemClick("/Event_Management", "EventManagement")
          }
          toggleSubMenu={toggleSubMenu}
          showSubMenu={showSubMenu}
        />
        <SettingsItem
          isSidebarOpen={isSidebarOpen}
          onClick={() => handleItemClick("/Settings", "Settings")}
          toggleSubMenu={toggleSubMenu}
          showSubMenu={showSubMenu}
        />
      </nav>

      {/* Logout Button */}
      <div className="p-4 bg-gray-200 rounded hover:bg-gray-500 hover:text-white">
        <a
          href="#logout"
          onClick={handleLogout}
          className="flex items-center justify-center"
          title="log-out"
        >
          <img src={log_out} alt="Logout" className="w-6 h-6 rounded-full mr-2" />
          {isSidebarOpen && <span>Logout</span>}
        </a>
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
