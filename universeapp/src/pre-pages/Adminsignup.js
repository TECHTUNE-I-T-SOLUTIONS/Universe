import React, { useState } from "react";
import { Alert } from "@nextui-org/alert";
import Nametext from "../icons/UniVersetext.svg";
import logo from "../icons/UniVerselog.svg";

const AdminSignup = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [adminSignupCode, setAdminSignupCode] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [step, setStep] = useState(1); // Tracks the current step in the signup process

  const showAlert = (message, type = "success") => {
    setAlertMessage(message);
    setAlertType(type);
    setAlertVisible(true);
    setTimeout(() => setAlertVisible(false), 3000);
  };

  const handleSendAdminSignupCode = () => {
    if (!email.endsWith("@unilorin.edu.ng")) {
      showAlert("Only university emails are allowed.😉", "error");
      return;
    }
    showAlert("Signup code sent to your email👌, please check🙏.", "success");
    setStep(2); // Move to the next step to show the signup code input
  };

  const handleConfirmAdminSignupCode = () => {
    if (adminSignupCode.trim() === "") {
      showAlert("Please enter the signup code!😡", "error");
      return;
    }
    showAlert("Signup code confirmed! Proceed.😍", "success");
    setStep(3); // Move to the next step to show the rest of the input fields
  };

  const handleAdminSignup = () => {
    if (password !== confirmPassword) {
      showAlert("Passwords do not match! Please, check🙏", "error");
      return;
    }
    showAlert("Signup successful❤️! Hold on...", "success");
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  return (
    <div className="flex items-center justify-center bg-transparent">
      {alertVisible && (
        <div
          className={`fixed top-4 right-4 z-[9999] border-l-4 p-4 rounded-lg shadow-lg ${
            alertType === "success"
              ? "bg-green-100 border-green-500 text-green-800"
              : "bg-red-100 border-red-500 text-red-800"
          }`}
        >
          <Alert
            title={alertType === "success" ? "Success" : "Error"}
            description={alertMessage}
          />
        </div>
      )}
      <div className="w-full max-w-sm p-6 shadow-lg rounded-lg bg-transparent">
        <div className="flex flex-col items-center mb-4">
          <img src={logo} alt="Logo" className="h-16 animate-spin-slow mb-2" />
          <img src={Nametext} alt="UniVerse" className="h-8 opacity-80" />
        </div>
        <h2 className="text-2xl font-bold text-white text-center mb-4">Admin Sign Up</h2>
        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="example@unilorin.edu.ng"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring focus:ring-blue-300 mb-4"
            />
            <button
              onClick={handleSendAdminSignupCode}
              className="w-full bg-green-700 font-bold text-white py-2 rounded-full hover:bg-black mb-4"
            >
              Send Admin Signup Code
            </button>
          </>
        )}
        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Enter Admin Signup Code"
              value={adminSignupCode}
              onChange={(e) => setAdminSignupCode(e.target.value)}
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring focus:ring-red-600 mb-4"
            />
            <button
              onClick={handleConfirmAdminSignupCode}
              className="w-full bg-blue-500 text-white font-bold py-2 rounded-full hover:bg-blue-600 mb-4"
            >
              Confirm Admin Signup Code
            </button>
          </>
        )}
        {step === 3 && (
          <>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring focus:ring-green-600 mb-4"
            />
            <input
              type="password"
              placeholder="Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring focus:ring-green-600 mb-4"
            />
            <input
              type="password"
              placeholder="Confirm Admin Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring focus:ring-green-600 mb-4"
            />
            <button
              onClick={handleAdminSignup}
              className="w-full bg-green-500 font-bold text-white py-2 rounded-full hover:bg-green-600 mb-4"
            >
              Signup as Admin
            </button>
          </>
        )}
        <button
          onClick={onClose}
          className="w-full bg-red-600 font-bold text-white py-2 rounded-full hover:bg-black"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AdminSignup;
