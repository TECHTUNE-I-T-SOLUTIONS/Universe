import React from "react";
import Event_Management from "../../icons/Event_Management.png";

const EventManagementItem = ({ isSidebarOpen, showSubMenu, toggleSubMenu }) => (
  <div>
    <button
      onClick={() => toggleSubMenu("event_management")}
      className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-500 hover:text-white"
    >
      <div className="flex items-center space-x-2">
        <img src={Event_Management} alt="Event Management" className="w-6 h-6" />
        {isSidebarOpen && <span>Event Management</span>}
      </div>
      {isSidebarOpen && <span>{showSubMenu.event_management ? "-" : "+"}</span>}
    </button>
    {showSubMenu.event_management && isSidebarOpen && (
      <div className="pl-6 space-y-2">
        <a
          href="#create_events"
          title="Create Events"
          className="block p-2 text-sm rounded hover:bg-gray-500 hover:text-white"
        >
          Create/Edit Events
        </a>
        <a
          href="#track_rsvps"
          className="block p-2 text-sm rounded hover:bg-gray-500 hover:text-white"
        >
          Track RSVPs
        </a>
        <a
          href="#volunteer_opportunities"
          className="block p-2 text-sm rounded hover:bg-gray-500 hover:text-white"
        >
          Manage Volunteer Opportunities
        </a>
      </div>
    )}
  </div>
);

export default EventManagementItem;
