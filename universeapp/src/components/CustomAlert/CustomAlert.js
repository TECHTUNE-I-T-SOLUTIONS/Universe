// CustomAlert.js
import React, { useState, useEffect } from "react";

let showAlert;

const CustomAlert = () => {
  const [alert, setAlert] = useState({ message: "", type: "", visible: false });

  useEffect(() => {
    showAlert = (message, type = "info") => {
      setAlert({ message, type, visible: true });
      setTimeout(() => setAlert((prevAlert) => ({ ...prevAlert, visible: false })), 5000); // Hide after 5 seconds
    };
  }, []);

  if (!alert.visible) return null;

  return (
    <div
      className={`fixed top-5 right-5 px-4 py-2 rounded-lg text-white shadow-lg animate-fade-in-out ${
        alert.type === "success"
          ? "bg-green-500"
          : alert.type === "error"
          ? "bg-red-500"
          : "bg-blue-500"
      }`}
    >
      {alert.message}
    </div>
  );
};

export const triggerAlert = (message, type) => {
  if (showAlert) {
    showAlert(message, type);
  } else {
    console.error("CustomAlert is not initialized yet.");
  }
};

export default CustomAlert;

