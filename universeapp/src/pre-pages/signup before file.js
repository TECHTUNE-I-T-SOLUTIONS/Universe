import React, { useState, useEffect } from "react";
import { Alert } from "@nextui-org/alert";
import student1 from "../icons/student1.jpg";
import student2 from "../icons/student2.jpg";
import student3 from "../icons/student3.jpg";
import student4 from "../icons/student4.jpg";
import Nametext from "../icons/UniVersetext.svg";
import logo from "../icons/UniVerselog.svg";

const Signup = ({ onClose }) => {
  const [showSignup, setShowSignup] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");


  const images = [student1, student2, student3, student4];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const showAlert = (message, type = "success") => {
    setAlertMessage(message);
    setAlertType(type);
    setAlertVisible(true);
    setTimeout(() => setAlertVisible(false), 3000);
  };

  const handleSignup = () => {
    if (!email.endsWith("@unilorin.edu.ng")) {
      showAlert("Only university emails are allowed.", "error");
      return;
    }
    if (password !== confirmPassword) {
      showAlert("Passwords do not match.", "error");
      return;
    }
    showAlert("Signup successful!", "success");
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  const handleCloseSignup = () => {
    setShowSignup(false); // Return to the Signup page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      {alertVisible && (
      <div className="w-full max-w-4xl p-3 sm:p-8 grid grid-cols-2 shadow-lg rounded-lg bg-gray-100">
        <div className="relative flex items-center justify-center bg-gray-200">
          <img
            src={images[currentImageIndex]}
            alt="Student"
            className="h-full w-full object-cover rounded-l-lg"
          />
        </div>
        <div className="flex flex-col items-center justify-center p-6 space-y-4 bg-white rounded-r-lg">
          <img src={logo} alt="Logo" className="h-16 animate-spin-slow" />
          <img src={Nametext} alt="UniVerse" className="h-8 opacity-80" />
          <input
            type="email"
            placeholder="example@unilorin.edu.ng"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none"
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none"
          />
          <button
            onClick={handleSignup}
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            Signup
          </button>

           {showSignup ? (
            <Signup onClose={handleCloseSignup} />
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

export default Signup;
