import React from "react";
import Settings_icon from "../../icons/Setings.png";

const SettingsItem = ({ isSidebarOpen, showSubMenu, toggleSubMenu }) => (
  <div>
    <button
      onClick={() => toggleSubMenu("settings")}
      className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-500 hover:text-white"
      title="Settings"
    >
      <div className="flex items-center space-x-2">
        <img src={Settings_icon} alt="Settings" className="w-6 h-6" />
        {isSidebarOpen && <span>Settings</span>}
      </div>
      {isSidebarOpen && <span>{showSubMenu.settings ? "-" : "+"}</span>}
    </button>
    {showSubMenu.settings && isSidebarOpen && (
      <div className="pl-6 space-y-2">
        <a
          href="#profile"
          title="Profile Settings"
          className="block p-2 text-sm rounded hover:bg-gray-500 hover:text-white"
        >
          Profile Settings
        </a>
        <a
          href="#system"
          title="System Settings"
          className="block p-2 text-sm rounded hover:bg-gray-500 hover:text-white"
        >
          System Settings
        </a>
      </div>
    )}
  </div>
);

export default SettingsItem;
