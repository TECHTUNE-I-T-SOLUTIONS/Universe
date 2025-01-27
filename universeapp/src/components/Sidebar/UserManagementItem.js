import React from "react";
import User_Management from "../../icons/User_Management.png";

const UserManagementItem = ({ isSidebarOpen }) => (
  <div>
    <button
      onClick={() => (window.location.href = "/AdminDashboard/User_Management")}
      className="flex items-center justify-start w-full p-2 rounded hover:bg-gray-500 hover:text-white"
    >
      <div className="flex items-center space-x-2">
        <img
          src={User_Management}
          alt="User Management"
          className="w-6 h-6"
          title="User Management"
        />
        {isSidebarOpen && <span>User Management</span>}
      </div>
    </button>
  </div>
);

export default UserManagementItem;
