import React, { useState } from "react";
import themeIcon from "../../assets/theme-icon.png"; // Add appropriate image paths
import notificationIcon from "../../assets/notification-icon.png";
import alertIcon from "../../assets/alert-icon.png";
import deleteAccountIcon from "../../assets/delete-account-icon.png";
import referIcon from "../../assets/refer-icon.png";

const formatDate = () => {
  const date = new Date();
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    });
};


const SettingsPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [alertsEnabled, setAlertsEnabled] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    document.body.className = isDarkMode ? "light-mode" : "dark-mode"; // Assuming you have CSS classes for themes
  };

  const toggleNotifications = () => {
    setNotificationsEnabled((prev) => !prev);
    alert(
      `Notifications have been ${notificationsEnabled ? "disabled" : "enabled"}.`
    );
  };

  const toggleAlerts = () => {
    setAlertsEnabled((prev) => !prev);
    alert(`Alerts have been ${alertsEnabled ? "disabled" : "enabled"}.`);
  };

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirmDelete) {
      alert("Account deleted successfully.");
      // Add logic to handle account deletion
    }
  };

  const handleRefer = () => {
    const referralLink = "https://yourwebapp.com/referral-code"; // Replace with your actual referral link
    navigator.clipboard.writeText(referralLink);
    alert("Referral link copied to clipboard!");
  };

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      } min-h-screen`}
    >
      {/* Header */}
      <header className="flex justify-between items-center bg-blue-400 p-2 rounded mb-6 fixed top-0 w-full z-10">
        <div>
          <h1 className="text-xl font-bold text-black">SETTINGS</h1>
          <p className="text-sm text-white">Today is: {formatDate()}</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 px-4 space-y-6">
        <div className="flex items-center justify-between p-4 bg-gray-200 rounded shadow-md">
          <div className="flex items-center space-x-4">
            <img src={themeIcon} alt="Theme" className="w-6 h-6" />
            <span>Toggle Theme</span>
          </div>
          <button
            onClick={toggleTheme}
            className="bg-blue-400 text-white px-4 py-2 rounded"
          >
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-200 rounded shadow-md">
          <div className="flex items-center space-x-4">
            <img src={notificationIcon} alt="Notifications" className="w-6 h-6" />
            <span>Enable Notifications</span>
          </div>
          <button
            onClick={toggleNotifications}
            className={`${
              notificationsEnabled ? "bg-red-400" : "bg-blue-400"
            } text-white px-4 py-2 rounded`}
          >
            {notificationsEnabled ? "Disable" : "Enable"}
          </button>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-200 rounded shadow-md">
          <div className="flex items-center space-x-4">
            <img src={alertIcon} alt="Alerts" className="w-6 h-6" />
            <span>Enable Alerts</span>
          </div>
          <button
            onClick={toggleAlerts}
            className={`${
              alertsEnabled ? "bg-red-400" : "bg-blue-400"
            } text-white px-4 py-2 rounded`}
          >
            {alertsEnabled ? "Disable" : "Enable"}
          </button>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-200 rounded shadow-md">
          <div className="flex items-center space-x-4">
            <img src={deleteAccountIcon} alt="Delete Account" className="w-6 h-6" />
            <span>Delete Account</span>
          </div>
          <button
            onClick={handleDeleteAccount}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-200 rounded shadow-md">
          <div className="flex items-center space-x-4">
            <img src={referIcon} alt="Refer" className="w-6 h-6" />
            <span>Refer Friends</span>
          </div>
          <button
            onClick={handleRefer}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Copy Link
          </button>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
