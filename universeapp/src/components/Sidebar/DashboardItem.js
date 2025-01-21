import React from "react";
import DashboardIcon from "../../icons/Dashboard.png";
import AnalyticsIcon from "../../icons/Analytics.png";
import ReportsIcon from "../../icons/Reports.png";

const DashboardItem = ({ isSidebarOpen, toggleSubMenu, showSubMenu }) => (
  <div>
    <button
      onClick={() => toggleSubMenu("dashboard")}
      className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-500 hover:text-white"
    >
      <div className="flex items-center space-x-2">
        <img src={DashboardIcon} alt="Dashboard" className="w-6 h-6" />
        {isSidebarOpen && <span>Dashboard</span>}
      </div>
      {isSidebarOpen && <span>{showSubMenu.dashboard ? "-" : "+"}</span>}
    </button>

    {showSubMenu.dashboard && isSidebarOpen && (
      <div className="pl-6 space-y-2">
        <a
          href="#analytics"
          className="block p-2 text-sm rounded hover:bg-gray-500 hover:text-white"
        >
          <img src={AnalyticsIcon} alt="Analytics" className="w-5 h-5 inline-block mr-2" />
          Analytics
        </a>
        <a
          href="#reports"
          className="block p-2 text-sm rounded hover:bg-gray-500 hover:text-white"
        >
          <img src={ReportsIcon} alt="Reports" className="w-5 h-5 inline-block mr-2" />
          Reports
        </a>
      </div>
    )}
  </div>
);

export default DashboardItem;
