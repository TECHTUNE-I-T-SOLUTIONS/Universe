import React from "react";
import Event_Management from "../../icons/Event_Management.png";

const EventManagementItem = ({ isSidebarOpen }) => (
  <div>
    <button
      onClick={() => (window.location.href = "/AdminDashboard/EventManagement")}
      className="flex items-center justify-start w-full p-2 rounded hover:bg-gray-500 hover:text-white"
      title="Event Management"
    >
      <div className="flex items-center space-x-2">
        <img src={Event_Management} alt="Event Management" className="w-6 h-6" />
        {isSidebarOpen && <span>Event Management</span>}
      </div>
    </button>
  </div>
);

export default EventManagementItem;
