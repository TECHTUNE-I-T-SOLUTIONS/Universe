import React from "react";
import User_Management from "../../icons/User_Management.png";

const UserManagementItem = ({ isSidebarOpen, showSubMenu, toggleSubMenu }) => (
  <div>
    <button
      onClick={() => toggleSubMenu("user_management")}
      className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-500 hover:text-white"
    >
      <div className="flex items-center space-x-2">
        <img src={User_Management} alt="User Management" className="w-6 h-6"
          title="User Management"
        />
        {isSidebarOpen && <span>User Management</span>}
      </div>
      {isSidebarOpen && <span>{showSubMenu.user_management ? "-" : "+"}</span>}
    </button>
    {showSubMenu.user_management && isSidebarOpen && (
      <div className="pl-6 space-y-2">
        <a
          href="#view_users"
          title="View Users"
          className="block p-2 text-sm rounded hover:bg-gray-500 hover:text-white"
        >
          View All Users
        </a>
        <a
          href="#roles_permissions"
          className="block p-2 text-sm rounded hover:bg-gray-500 hover:text-white"
          title="Roles and Permissions"
        >
          Manage Roles & Permissions
        </a>
        <a
          href="#reset_passwords"
          title="Reset Passwords"
          className="block p-2 text-sm rounded hover:bg-gray-500 hover:text-white"
        >
          Reset Passwords
        </a>
      </div>
    )}
  </div>
);

export default UserManagementItem;
