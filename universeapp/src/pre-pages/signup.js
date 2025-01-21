import React, { useState, useEffect } from "react";
import { Alert } from "@nextui-org/alert";
import student1 from "../icons/student1.jpg";
import student2 from "../icons/student2.jpg";
import student3 from "../icons/student3.jpg";
import student4 from "../icons/student4.jpg";
import Nametext from "../icons/UniVersetext.svg";
import logo from "../icons/UniVerselog.svg";

const Signup = ({ onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [signupCode, setSignupCode] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [step, setStep] = useState(1); // Tracks the current step in the signup process

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

  const handleSendSignupCode = () => {
    if (!email.endsWith("@unilorin.edu.ng")) {
      showAlert("Only university emails are allowed.😉", "error");
      return;
    }
    showAlert("Signup code sent to your email👌, please Check🙏.", "success");
    setStep(2); // Move to the next step to show the signup code input
  };

  const handleConfirmSignupCode = () => {
    if (signupCode.trim() === "") {
      showAlert("Please enter the signup code!😡", "error");
      return;
    }
    showAlert("Signup code confirmed! Proceed.😍", "success");
    setStep(3); // Move to the next step to show the rest of the input fields
  };

  const handleSignup = () => {
    if (password !== confirmPassword) {
      showAlert("Passwords do not match! Please, Check🙏", "error");
      return;
    }
    showAlert("Signup successful❤️! hold on...", "success");
    setTimeout(() => {
      onClose();
    }, 3000);
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
      <div className="w-full max-w-5xl p-3 sm:p-8 grid grid-cols-2 shadow-lg rounded-lg bg-gray-100">
        <div className="relative flex items-center justify-center p-1 bg-gray-200">
          <img
            src={images[currentImageIndex]}
            alt="Student"
            className="h-full w-full object-cover rounded-l-lg"
          />
        </div>
        <div className="flex flex-col items-center justify-center p-6 space-y-4 bg-white rounded-r-lg">
          <img src={logo} alt="Logo" className="h-16 animate-spin-slow" />
          <img src={Nametext} alt="UniVerse" className="h-8 opacity-80" />

          {step === 1 && (
            <>
              <input
                type="email"
                placeholder="example@unilorin.edu.ng"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring focus:ring-blue-300"
              />
              <button
                onClick={handleSendSignupCode}
                className="w-full bg-green-700 font-bold text-white py-2 rounded-full hover:bg-black"
              >
                Send Signup Code
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <input
                type="text"
                placeholder="Enter Signup Code"
                value={signupCode}
                onChange={(e) => setSignupCode(e.target.value)}
                className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring focus:ring-red-600"
              />
              <button
                onClick={handleConfirmSignupCode}
                className="w-full bg-blue-500 text-white font-bold py-2 rounded-full hover:bg-blue-600"
              >
                Confirm Signup Code
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
                className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring focus:ring-green-600"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring focus:ring-green-600"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring focus:ring-green-600"
              />
              <button
                onClick={handleSignup}
                className="w-full bg-green-500 font-bold text-white py-2 rounded-full hover:bg-green-600"
              >
                Student Signup
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
    </div>
  );
};

export default Signup;
