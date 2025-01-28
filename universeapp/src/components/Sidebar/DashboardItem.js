import React from "react";
import DashboardIcon from "../../icons/Dashboard.png";

const DashboardItem = ({ isSidebarOpen }) => (
  <div>
    <button
      onClick={() => (window.location.href = "/AdminDashboard/Dashboard")}
      className="flex items-center justify-start w-full p-2 rounded hover:bg-gray-500 hover:text-white"
      title="Dashboard"
    >
      <div className="flex items-center space-x-2">
        <img src={DashboardIcon} alt="Dashboard" className="w-6 h-6" />
        {isSidebarOpen && <span>Dashboard</span>}
      </div>
    </button>
  </div>
);

export default DashboardItem;
