import React from "react";
import Content_Moderation from "../../icons/Content_Moderation.png";

const ContentModerationItem = ({ isSidebarOpen, showSubMenu, toggleSubMenu }) => (
  <div>
    <button
      onClick={() => toggleSubMenu("content_moderation")}
      className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-500 hover:text-white"
    >
      <div className="flex items-center space-x-2">
        <img src={Content_Moderation} alt="Content Moderation" className="w-6 h-6" />
        {isSidebarOpen && <span>Content Moderation</span>}
      </div>
      {isSidebarOpen && <span>{showSubMenu.content_moderation ? "-" : "+"}</span>}
    </button>
    {showSubMenu.content_moderation && isSidebarOpen && (
      <div className="pl-6 space-y-2">
        <a
          href="#forum_posts"
          title="Forum Posts"
          className="block p-2 text-sm rounded hover:bg-gray-500 hover:text-white"
        >
          Forum Posts
        </a>
        <a
          href="#clubs_orgs"
          className="block p-2 text-sm rounded hover:bg-gray-500 hover:text-white"
        >
          Clubs & Organizations
        </a>
        <a
          href="#social_network"
          className="block p-2 text-sm rounded hover:bg-gray-500 hover:text-white"
        >
          Social Network Discussions
        </a>
      </div>
    )}
  </div>
);

export default ContentModerationItem;
