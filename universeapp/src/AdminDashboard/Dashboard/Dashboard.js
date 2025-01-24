import React, { useState } from "react";
import Analytics from "../Analytics";
import Reports from "../Reports";

const Dashboard = ({ onClose }) => {
  // const [Analytics, setAnalytics] = useState([]);
  // const [Reports, setReports] = useState([]);

  return (
    <div className="academic-progress h-full w-full p-4 sm:p-6 bg-gray-100 min-h-screen relative">
      {/* Header */}
      <header className="flex justify-between items-center bg-blue-400 p-2 rounded mb-6 fixed top-0 w-full z-10">
        <div>
          <h1 className="text-xl font-bold text-black">DASHBOARD</h1>
          <p className="text-sm text-white">Today is: {formatDate()}</p>
        </div>
      </header>

      <div className="mt-1 p-2">
        {/* Close Icon */}
        <div className="flex justify-end">
          <button className="w-10 h-10 bg-transparent flex items-center justify-center">
            <img
              src={CloseIcon}
              alt="Close"
              className="w-full h-full"
              onClick={onClose}
            />
          </button>
        </div>

      {/* Main Content */}
      <div className="space-y-8">
      </div>
    </div>
  );
};

export default Dashboard;
