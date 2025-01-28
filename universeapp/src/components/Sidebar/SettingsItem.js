import React from "react";
import Settings_icon from "../../icons/Setings.png";

const SettingsItem = ({ isSidebarOpen }) => (
  <div>
    <button
      onClick={() => (window.location.href = "/AdminDashboard/Settings")}
      className="flex items-center justify-start w-full p-2 rounded hover:bg-gray-500 hover:text-white"
      title="Settings"
    >
      <div className="flex items-center space-x-2">
        <img src={Settings_icon} alt="Settings" className="w-6 h-6" />
        {isSidebarOpen && <span>Settings</span>}
      </div>
    </button>
  </div>
);

export default SettingsItem;
