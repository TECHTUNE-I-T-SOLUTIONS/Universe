import React, { useState } from "react";
import Analytics from "./Analytics";
import Reports from "./Reports";
import CloseIcon from "../../icons/close.png";

const Dashboard = ({ setActivePage, onClose, showLogoutDialog }) => {
  const [activeTab, setActiveTab] = useState("analytics"); // State to switch between Analytics and Reports

  const formatDate = () => {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    return new Date().toLocaleDateString(undefined, options);
  };

  return (
    <div>
      {/* Header */}
      <header className="flex justify-between items-center bg-blue-400 p-2 rounded mb-6 fixed top-0 w-full">
        <div>
          <h1 className="text-xl font-bold text-black">DASHBOARD</h1>
          <p className="text-sm text-white">Today is: {formatDate()}</p>
        </div>
      </header>

      {/* Close Button */}
        <button
          className="fixed top-5 right-4 w-5 h-5 bg-transparent rounded-full flex items-center justify-center"
          onClick={() => setActivePage("AdminMainContent")}
        >
          <img src={CloseIcon} alt="Close" className="w-full h-full" />
        </button>

      {/* Tab Navigation */}
      <div className="mt-10 p-4">
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
