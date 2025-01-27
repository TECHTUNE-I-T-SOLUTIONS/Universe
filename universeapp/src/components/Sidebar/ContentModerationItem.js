import React from "react";
import Content_Moderation from "../../icons/Content_Moderation.png";

const ContentModerationItem = ({ isSidebarOpen }) => (
  <div>
    <button
      onClick={() => (window.location.href = "/AdminDashboard/Content_Moderation")}
      className="flex items-center justify-start w-full p-2 rounded hover:bg-gray-500 hover:text-white"
      title="Content Moderation"
    >
      <div className="flex items-center space-x-2">
        <img src={Content_Moderation} alt="Content Moderation" className="w-6 h-6" />
        {isSidebarOpen && <span>Content Moderation</span>}
      </div>
    </button>
  </div>
);

export default ContentModerationItem;
