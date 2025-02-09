// Admin.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "@nextui-org/alert";

// Import background images
import student1 from "../icons/student1.jpg";
import student2 from "../icons/student2.jpg";
import student3 from "../icons/student3.jpg";
import student4 from "../icons/student4.jpg";
import student5 from "../icons/student5.png";
import student6 from "../icons/student6.jpg";
import student7 from "../icons/students7.jpg";
import student8 from "../icons/students8.jpg";
import student9 from "../icons/students9.jpg";
import student10 from "../icons/students10.jpg";
import student11 from "../icons/student11.jpg";
import student12 from "../icons/student12.jpg";
import student13 from "../icons/student13.jpg";
import student14 from "../icons/student14.jpg";

import Nametext from "../icons/UniVersetext.svg";
import logo from "../icons/UniVerselog.svg";
import AdminForgot from "./Adminforgot";
import AdminSignup from "./Adminsignup";
import Auth from "./auth";

const Admin = ({ onLoginSuccess = () => {} }) => {
  const [showAdminForgot, setShowAdminForgot] = useState(false);
  const [showAdminSignup, setShowAdminSignup] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const images = [
    student1, student2, student3, student4, student5, student6,
    student7, student8, student9, student10, student11, student12,
    student13, student14
  ];

  // Cycle through images every 3 seconds
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

  const handleLogin = (email, password) => {
    if (email.endsWith("@unilorin.edu.ng")) {
      showAlert("Admin Login Successful😍! Now, just wait❤️", "success");
      setTimeout(() => {
        onLoginSuccess();
        navigate("/Admin-Dashboard");
      }, 1000);
    } else {
      showAlert("Invalid Email🙂‍↔️. Use your university email😉!", "error");
    }
  };

  const handleCloseAdminForgot = () => {
    setShowAdminForgot(false);
  };

  const handleCloseAdminSignup = () => {
    setShowAdminSignup(false);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-cover bg-center">
      {/* Animated Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${images[currentImageIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(2px)",
          opacity: 0.9,
        }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-70"></div>

      {/* Foreground Container */}
      <div className="relative z-10 flex flex-col items-center justify-center p-10 bg-white bg-opacity-20 rounded-lg shadow-lg">
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

        {/* Render Login Form only when neither Forgot nor Signup is active */}
        {(!showAdminForgot && !showAdminSignup) && (
          <div className="flex flex-col items-center justify-center w-full max-w-sm">
            <img src={logo} alt="Logo" className="h-16 animate-spin-slow mb-4" />
            <img src={Nametext} alt="UniVerse" className="h-8 opacity-80 mb-6" />
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const email = e.target.email.value;
                const password = e.target.password.value;
                handleLogin(email, password);
              }}
              className="space-y-4 w-full"
            >
              <input
                type="email"
                name="email"
                placeholder="example@unilorin.edu.ng"
                className="w-full p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-bold py-3 rounded-full hover:bg-blue-900"
              >
                Admin Login
              </button>
            </form>
            <div className="mt-2">
              <p
                onClick={() => setShowAdminForgot(true)}
                className="text-xs sm:text-sm text-black hover:underline cursor-pointer"
              >
                Forgot Password?
              </p>
            </div>
            <div className="mt-4">
              <p
                onClick={() => setShowAdminSignup(true)}
                className="text-xs sm:text-sm text-white hover:underline cursor-pointer"
              >
                No account yet?{" "}
                <span className="text-xs sm:text-sm text-white hover:underline cursor-pointer">
                  Sign up here
                </span>
              </p>
            </div>
            <div className="mt-4">
              <p
                onClick={() => navigate("/auth")}
                className="text-xs sm:text-sm text-white hover:underline cursor-pointer"
              >
                Are you a Student?{" "}
                <span className="text-xs sm:text-sm text-white hover:underline cursor-pointer">
                  Go Here
                </span>
              </p>
            </div>
          </div>
        )}

        {/* Render Forgot/Signup pages exclusively */}
        {showAdminForgot && (
          <AdminForgot onClose={handleCloseAdminForgot} showAlert={showAlert} />
        )}
        {showAdminSignup && (
          <AdminSignup onClose={handleCloseAdminSignup} showAlert={showAlert} />
        )}
        {showAuth && <Auth onClose={() => setShowAuth(false)} />}
      </div>
    </div>
  );
};

export default Admin;
