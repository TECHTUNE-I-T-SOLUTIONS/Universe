import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../icons/UniVerselog.svg";
import Nametext from "../icons/UniVersetext.svg";
import openSidebarIcon from "../icons/open_sidebar.png";
import closeSidebarIcon from "../icons/close_sidebar.png";
import settings from "../icons/settings.png";
import profile from "../icons/profile.png";

const AdminDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState(null);
  const [showSubMenu, setShowSubMenu] = useState({});
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const toggleSubMenu = (menuName) => {
    setShowSubMenu((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  const handleLogout = () => navigate("/auth");

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } transition-width duration-300 bg-gray-800 text-white flex flex-col fixed top-0 left-0 h-full`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <img src={logo} alt="Logo" className="h-8" />
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

        {/* Sidebar Navigation */}
        <nav className="flex-1 px-4 space-y-4">
          {/* Sidebar Item with Dropdown */}
          <div>
            <button
              onClick={() => toggleSubMenu("dashboard")}
              className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-700"
            >
              <span>Dashboard</span>
              {isSidebarOpen && <span>{showSubMenu.dashboard ? "-" : "+"}</span>}
            </button>
            {showSubMenu.dashboard && isSidebarOpen && (
              <div className="pl-6 space-y-2">
                <a
                  href="#analytics"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Analytics
                </a>
                <a
                  href="#reports"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Reports
                </a>
              </div>
            )}
          </div>

          <div>
            <button
              onClick={() => toggleSubMenu("management")}
              className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-700"
            >
              <span>Management</span>
              {isSidebarOpen && <span>{showSubMenu.management ? "-" : "+"}</span>}
            </button>
            {showSubMenu.management && isSidebarOpen && (
              <div className="pl-6 space-y-2">
                <a
                  href="#users"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  User Management
                </a>
                <a
                  href="#projects"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Project Management
                </a>
              </div>
            )}
          </div>

          <div>
            <button
              onClick={() => toggleSubMenu("settings")}
              className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-700"
            >
              <span>Settings</span>
              {isSidebarOpen && <span>{showSubMenu.settings ? "-" : "+"}</span>}
            </button>
            {showSubMenu.settings && isSidebarOpen && (
              <div className="pl-6 space-y-2">
                <a
                  href="#profile"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Profile Settings
                </a>
                <a
                  href="#system"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  System Settings
                </a>
              </div>
            )}
          </div>
        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full p-4 text-left text-sm hover:bg-red-600"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <header className="bg-gray-200 p-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <div className="flex space-x-4">
            <img src={settings} alt="Settings" className="w-8 h-8 cursor-pointer" />
            <img src={profile} alt="Profile" className="w-8 h-8 cursor-pointer" />
          </div>
        </header>

        <section className="p-6">
          {activePage ? (
            <div>
              {/* Placeholder for dynamic content */}
              <h2 className="text-lg font-semibold">{activePage} Content</h2>
              <button
                onClick={() => setActivePage(null)}
                className="mt-4 px-4 py-2 bg-gray-800 text-white rounded"
              >
                Back to Dashboard
              </button>
            </div>
          ) : (
            <div>
              <h2 className="text-lg font-semibold">Welcome to the Admin Dashboard</h2>
              <p>Use the sidebar to navigate through various sections.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
