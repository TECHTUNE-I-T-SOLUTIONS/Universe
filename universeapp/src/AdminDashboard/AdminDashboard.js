import React, { useState } from "react";
import settings from "../icons/settings.png";
import profile from "../icons/profile.png";
import Sidebar from "../components/Sidebar/Sidebar";

const AdminDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);


  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-20"}`}
      >
        {/* Header Section */}
        <header className="bg-gray-200 p-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Welcome! Admin</h1>
          <div className="flex space-x-4">
            <img src={settings} alt="Settings" className="w-8 h-8 cursor-pointer" />
            <img src={profile} alt="Profile" className="w-8 h-8 cursor-pointer" />
          </div>
        </header>

        {/* Rules Section */}
        <section className="p-6 bg-white shadow-md rounded-lg m-4">
          <h2 className="text-lg font-semibold mb-4">Admin Responsibilities</h2>
          <ul className="list-disc list-inside space-y-2">
            <li className="text-gray-700">
              Ensure all student details are kept confidential and secure.
            </li>
            <li className="text-gray-700">
              Avoid actions or decisions that may create conflicts in the students' section.
            </li>
            <li className="text-gray-700">
              Regularly monitor and update system data to maintain accuracy and reliability.
            </li>
            <li className="text-gray-700">
              Uphold ethical standards and act in the best interest of the institution.
            </li>
            <li className="text-gray-700">
              Address student and staff concerns promptly and professionally.
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
