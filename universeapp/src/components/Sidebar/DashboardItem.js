import React from "react";
import DashboardIcon from "../../icons/Dashboard.png";

const DashboardItem = ({ isSidebarOpen }) => (
  <div>
    <button
      onClick={() => toggleSubMenu("dashboard")}
      className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-500 hover:text-white"
      href="#Dashboard"
    >
      <div className="flex items-center space-x-2">
        <img src={DashboardIcon} alt="Dashboard" className="w-6 h-6" title="Dashboard"  />
        {isSidebarOpen && <span>Dashboard</span>}
      </div>
      {isSidebarOpen && <span>{showSubMenu.dashboard ? "-" : "+"}</span>}
    </button>
  </div>
);

export default DashboardItem;
