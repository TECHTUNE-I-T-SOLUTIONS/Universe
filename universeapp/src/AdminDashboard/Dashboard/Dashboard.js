import React, { useState } from "react";
import Analytics from "./Analytics";
import Reports from "./Reports";
import CloseIcon from "../../icons/close.png";

const Dashboard = ({ onClose, showLogoutDialog }) => {
  const [activeTab, setActiveTab] = useState("analytics"); // State to switch between Analytics and Reports

  const formatDate = () => {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    return new Date().toLocaleDateString(undefined, options);
  };

  return (
    <div
      className={`academic-progress h-full w-full p-2 sm:p-6 bg-gray-100 min-h-screen relative ${
        showLogoutDialog ? "opacity-50 pointer-events-none" : ""
      }`}
      style={{ zIndex: showLogoutDialog ? 10 : 1 }} // Lower z-index when the logout dialog is visible
    >
      {/* Header */}
      <header className="flex justify-between items-center bg-blue-400 p-2 rounded mb-6 fixed top-0 w-full">
        <div>
          <h1 className="text-xl font-bold text-black">DASHBOARD</h1>
          <p className="text-sm text-white">Today is: {formatDate()}</p>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="mt-20 p-4">
        <button
          className="absolute top-20 right-4 w-5 h-5 bg-transparent rounded-full flex items-center justify-center"
          onClick={onClose}
        >
          <img src={CloseIcon} alt="Close" className="w-full h-full" />
        </button>

        <div className="flex justify-around space-x-4 bg-white shadow rounded-lg p-2">
          <button
            onClick={() => setActiveTab("analytics")}
            className={`px-4 py-2 rounded-lg ${
              activeTab === "analytics" ? "bg-blue-400 text-white" : "bg-gray-200"
            }`}
          >
            Analytics
          </button>
          <button
            onClick={() => setActiveTab("reports")}
            className={`px-4 py-2 rounded-lg ${
              activeTab === "reports" ? "bg-blue-400 text-white" : "bg-gray-200"
            }`}
          >
            Reports
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 bg-white shadow rounded-lg mt-6">
        {activeTab === "analytics" && <Analytics />}
        {activeTab === "reports" && <Reports />}
      </div>
    </div>
  );
};

export default Dashboard;
