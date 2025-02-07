import React, { useState, useEffect } from "react";
import CloseIcon from "../../icons/close.png";

const Settings = ({ setActivePage }) => {
  const [adminProfile, setAdminProfile] = useState({ name: "Admin", email: "admin@example.com" });
  const [systemSettings, setSystemSettings] = useState({ siteName: "TechTune System", maintenanceMode: false });
  const [studentSettings, setStudentSettings] = useState([]);

  // Get current date
  const getCurrentDate = () => {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    return new Date().toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    // Simulated student settings fetch
    setStudentSettings([
      { id: 1, name: "John Doe", email: "john@example.com", status: "Active" },
      { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Inactive" },
    ]);
  }, []);

  const updateAdminProfile = (e) => {
    e.preventDefault();
    alert("Admin profile updated successfully!");
  };

  const updateSystemSettings = (e) => {
    e.preventDefault();
    alert("System settings updated successfully!");
  };

  return (
    <div className="p-0 bg-white rounded-lg shadow-md">
      {/* Header with Date */}
      <header className="flex flex-col bg-blue-400 p-2 rounded mb-6 fixed top-0 w-full z-30">
        <h1 className="text-xl font-bold text-black">Admin Settings</h1>
        <p className="text-sm text-white">{getCurrentDate()}</p>
      </header>

      {/* Close Button */}
      <button
        className="absolute top-5 right-10 w-5 h-5 bg-transparent rounded-full flex items-center justify-center z-30"
        onClick={() => setActivePage("AdminMainContent")}
      >
        <img src={CloseIcon} alt="Close" className="w-full h-full" />
      </button>

      <div className="p-4">  
        {/* Admin Profile Settings */}
        <div className="mb-6 border p-4 rounded">
          <h2 className="text-lg font-semibold">Admin Profile</h2>
          <form onSubmit={updateAdminProfile}>
            <input type="text" className="w-full p-2 border rounded mb-2" value={adminProfile.name} onChange={(e) => setAdminProfile({ ...adminProfile, name: e.target.value })} />
            <input type="email" className="w-full p-2 border rounded mb-2" value={adminProfile.email} onChange={(e) => setAdminProfile({ ...adminProfile, email: e.target.value })} />
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
          </form>
        </div>

        {/* System Settings */}
        <div className="mb-6 border p-4 rounded">
          <h2 className="text-lg font-semibold">System Settings</h2>
          <form onSubmit={updateSystemSettings}>
            <input type="text" className="w-full p-2 border rounded mb-2" value={systemSettings.siteName} onChange={(e) => setSystemSettings({ ...systemSettings, siteName: e.target.value })} />
            <label className="flex items-center">
              <input type="checkbox" checked={systemSettings.maintenanceMode} onChange={(e) => setSystemSettings({ ...systemSettings, maintenanceMode: e.target.checked })} />
              <span className="ml-2">Enable Maintenance Mode</span>
            </label>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded mt-2">Save</button>
          </form>
        </div>

        {/* Student Settings */}
        <div className="mb-6 border p-4 rounded">
          <h2 className="text-lg font-semibold">Manage Students</h2>
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">ID</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {studentSettings.map((student) => (
                <tr key={student.id} className="border">
                  <td className="border p-2">{student.id}</td>
                  <td className="border p-2">{student.name}</td>
                  <td className="border p-2">{student.email}</td>
                  <td className="border p-2">{student.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Settings;
