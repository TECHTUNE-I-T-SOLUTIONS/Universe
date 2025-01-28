import React from "react";
import Management_icon from "../../icons/Management.png";

const AcademicManagementItem = ({ isSidebarOpen }) => (
  <div>
    <button
      onClick={() => (window.location.href = "/AdminDashboard/Acad_Management")}
      className="flex items-center justify-start w-full p-2 rounded hover:bg-gray-500 hover:text-white"
      title="Academic Management"
    >
      <div className="flex items-center space-x-2">
        <img src={Management_icon} alt="Academic Management" className="w-6 h-6" />
        {isSidebarOpen && <span>Acad. Management</span>}
      </div>
    </button>
  </div>
);

export default AcademicManagementItem;
