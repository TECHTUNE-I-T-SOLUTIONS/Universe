import React from "react";
import Management_icon from "../../icons/Management.png";

const AcademicManagementItem = ({ isSidebarOpen, showSubMenu, toggleSubMenu }) => (
  <div>
    <button
      onClick={() => toggleSubMenu("academic_management")}
      className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-500 hover:text-white"
    >
      <div className="flex items-center space-x-2">
        <img src={Management_icon} alt="Academic Management" className="w-6 h-6"
          title="Academic Management"
        />
        {isSidebarOpen && <span>Acad. Management</span>}
      </div>
      {isSidebarOpen && <span>{showSubMenu.academic_management ? "-" : "+"}</span>}
    </button>
    {showSubMenu.academic_management && isSidebarOpen && (
      <div className="pl-6 space-y-2">
        <a
          href="#assignments"
          title="Assignments"
          className="block p-2 text-sm rounded hover:bg-gray-500 hover:text-white"
        >
          Create/Manage Assignments
        </a>
        <a
          href="#exam_schedules"
          title="Exam Schedules"
          className="block p-2 text-sm rounded hover:bg-gray-500 hover:text-white"
        >
          Exam Schedules
        </a>
        <a
          href="#grade_analytics"
          title="Grade Analytics"
          className="block p-2 text-sm rounded hover:bg-gray-500 hover:text-white"
        >
          Grade Analytics
        </a>
        <a
          href="#student_performance"
          title="Student Performance"
          className="block p-2 text-sm rounded hover:bg-gray-500 hover:text-white"
        >
          Student Performance Reports
        </a>
      </div>
    )}
  </div>
);

export default AcademicManagementItem;
