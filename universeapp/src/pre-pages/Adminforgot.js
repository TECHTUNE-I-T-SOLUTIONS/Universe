import React, { useState, useEffect } from "react";
import { Alert } from "@nextui-org/alert";
import student1 from "../icons/student1.jpg";
import student2 from "../icons/student2.jpg";
import student3 from "../icons/student3.jpg";
import student4 from "../icons/student4.jpg";
import Nametext from "../icons/UniVersetext.svg";
import logo from "../icons/UniVerselog.svg";

const Adminforgot = ({ onClose }) => {
  const [showAdminforgot, setShowAdminforgot] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");

  const images = [student1, student2, student3, student4];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const showAlert = (message, type = "success") => {
    setAlertMessage(message);
    setAlertType(type);
    setAlertVisible(true);
    setTimeout(() => setAlertVisible(false), 3000);
  };

  const handleReset = () => {
    if (!email.endsWith("@unilorin.edu.ng")) {
      showAlert("Only university emails are allowed.😉", "error");
      return;
    }
    showAlert("Password reset link sent👌! Please Check your inbox😉", "success");
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  const handleCloseAdminforgot = () => {
    setShowAdminforgot(false); // Return to the login page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      {alertVisible && (
        <div
          className={`fixed top-4 right-4 z-[9999] border-l-4 p-4 rounded-lg shadow-lg ${
            alertType === "success"
              ? "bg-green-100 border-green-500 text-green-800"
              : "bg-red-100 border-red-500 text-red-800"
          }`}
        >
          <Alert title={alertType === "success" ? "Success" : "Error"} description={alertMessage} />
        </div>
      )}

      <div className="w-full max-w-4xl p-3 sm:p-8 grid grid-cols-2 shadow-lg rounded-lg bg-gray-100">
        {/* Image Column */}
        <div className="relative flex items-center justify-center bg-gray-200">
          <img
            src={images[currentImageIndex]}
            alt="Student"
            className="h-full w-full object-cover rounded-l-lg"
          />
        </div>

        {/* Form Column */}
        <div className="flex flex-col items-center justify-center p-6 space-y-4 bg-white rounded-r-lg">
          <img src={logo} alt="Logo" className="h-16 animate-spin-slow" />
          <img src={Nametext} alt="UniVerse" className="h-8 opacity-80" />
          <input
            type="email"
            placeholder="example@unilorin.edu.ng"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            onClick={handleReset}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Reset Password
          </button>
           {showAdminforgot ? (
            <Adminforgot onClose={handleCloseAdminforgot} />
            ) : (
          <button
            onClick={onClose}
            className="w-full bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
                )}
        </div>
      </div>
    </div>
  );
};

export default Adminforgot;
