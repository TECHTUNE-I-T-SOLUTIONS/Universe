import React from "react";
import settings from "../../icons/settings.png";
import profile from "../../icons/profile.png";

const AdminMainContent = ({ setActivePage }) => {
  // Function to get the current date in a friendly format
  const getCurrentDate = () => {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    return new Date().toLocaleDateString("en-US", options);
  };

  return (
    // Outer container with a vibrant gradient background covering the full viewport height
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      {/* Header Section */}
      <header className="flex items-center justify-between bg-gradient-to-r from-blue-400 to-indigo-500 p-2 rounded-b-lg fixed top-0 w-full z-30 shadow-lg">
        {/* Left side: Text */}
        <div>
          <h1 className="text-2xl font-bold text-black">Welcome! Admin</h1>
          <p className="text-sm text-white">{getCurrentDate()}</p>
        </div>
        {/* Right side: Icons */}
        <div className="flex items-center mr-60 space-x-4">
          <img
            src={settings}
            alt="Settings"
            className="w-8 h-8 cursor-pointer hover:scale-110 transition-transform"
            onClick={() => setActivePage("Settings")}
          />
          <img
            src={profile}
            alt="Profile"
            className="w-8 h-8 cursor-pointer hover:scale-110 transition-transform"
            onClick={() => setActivePage("Profile_Settings")}
          />
        </div>
      </header>

      {/* Main Content Section */}
      <section className="mt-1 p-8 pt-24 bg-gradient-to-r from-white to-gray-100 shadow-xl rounded-lg m-4">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Admin Responsibilities</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Ensure all student details are kept confidential and secure.</li>
          <li>Avoid actions or decisions that may create conflicts in the students' section.</li>
          <li>Regularly monitor and update system data to maintain accuracy and reliability.</li>
          <li>Uphold ethical standards and act in the best interest of the institution.</li>
          <li>Address student and staff concerns promptly and professionally.</li>
        </ul>
      </section>
    </div>
  );
};

export default AdminMainContent;
