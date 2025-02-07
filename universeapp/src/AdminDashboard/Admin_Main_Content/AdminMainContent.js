import React, { useState, useEffect } from "react";
import settings from "../../icons/settings.png";
import profile from "../../icons/profile.png";
import sunIcon from "../../icons/sun.png";
import moonIcon from "../../icons/moon.png";

const AdminMainContent = () => {
  // Function to get the current date in a friendly format
  const getCurrentDate = () => {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    return new Date().toLocaleDateString("en-US", options);
  };

  // Theme state and toggle function
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div>
      {/* Header Section */}
      <header className="flex items-center justify-between bg-blue-400 p-2 rounded mb-6 fixed top-0 w-full z-30">
        {/* Left side: Text */}
        <div>
          <h1 className="text-xl font-bold text-white">Welcome! Admin</h1>
          <p className="text-sm text-white">{getCurrentDate()}</p>
        </div>
        {/* Right side: Icons */}
        <div className="flex items-center space-x-4">
          <img src={settings} alt="Settings" className="w-8 h-8 cursor-pointer" />
          <img src={profile} alt="Profile" className="w-8 h-8 cursor-pointer" />
          <img
            src={theme === "light" ? moonIcon : sunIcon}
            alt="Toggle Theme"
            className="w-8 h-8 cursor-pointer"
            onClick={toggleTheme}
          />
        </div>
      </header>

      {/* Main Content Section */}
      {/* Added top padding (pt-20) to push the content below the fixed header */}
      <section className="pt-20 p-6 bg-white shadow-md rounded-lg m-4">
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
    </div>
  );
};

export default AdminMainContent;
