import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "@nextui-org/alert";
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
import Forgot from "./forgot";
import Signup from "./signup";
import Admin from "./Admin";
import "./auth.css";

const Auth = ({ onLoginSuccess = () => {} }) => {
  const [showForgot, setShowForgot] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false); // Toggle between Admin and User Login
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  const showAlert = (message, type = "success") => {
    setAlertMessage(message);
    setAlertType(type);
    setAlertVisible(true);
    setTimeout(() => setAlertVisible(false), 3000);
  };

  // UPDATED handleLogin: Fetch from backend
  const handleLogin = async (email, password) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }
      const data = await response.json();
      // Optionally store the token in localStorage
      localStorage.setItem("token", data.token);
      showAlert("Login Successful😍! Now, just wait❤️", "success");
      setTimeout(() => {
        onLoginSuccess(); // Call parent callback to update UI, navigate, etc.
      }, 1000);
    } catch (error) {
      showAlert(error.message, "error");
    }
  };

  const handleCloseForgot = () => {
    setShowForgot(false); // Return to the login page
  };

  const handleCloseSignup = () => {
    setShowSignup(false); // Return to the Login page
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-cover bg-center">
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
      <div className="relative z-10 flex flex-col items-center justify-center p-10 bg-white bg-opacity-20 rounded-lg shadow-lg">
        {alertVisible && (
          <div
            className={`fixed top-4 right-4 z-[9999] border-l-2 p-2 rounded-lg shadow-lg ${
              alertType === "success"
                ? "bg-green-100 border-green-500 text-green-800"
                : "bg-red-100 border-red-500 text-red-800"
            }`}
          >
            <Alert title={alertType === "success" ? "Success" : "Error"} description={alertMessage} />
          </div>
        )}
        <img src={logo} alt="Logo" className="h-16 animate-spin-slow mb-4" />
        <img src={Nametext} alt="UniVerse" className="h-8 opacity-80 mb-6" />
        
        {/* Only show the login form when neither Forgot nor Signup is active */}
        {(!showForgot && !showSignup) && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const email = e.target.email.value;
              const password = e.target.password.value;
              handleLogin(email, password);
            }}
            className="space-y-4 w-full max-w-sm"
          >
            <input
              type="email"
              name="email"
              placeholder="Email: example@unilorin.edu.ng"
              className="w-full sm:text-sm p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
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
              className="sm:text-sm w-full bg-blue-500 text-white font-bold py-3 rounded-full hover:bg-blue-900"
            >
              Student Login
            </button>
            
            {/* Each link is now wrapped in its own div for individual placement */}
            <div className="mt-4 text-center">
              <p
                onClick={() => setShowForgot(true)}
                className="text-xs sm:text-sm text-black hover:underline cursor-pointer"
              >
                Forgot Password?
              </p>
            </div>
            <div className="mt-4 text-center">
              <p
                onClick={() => setShowSignup(true)}
                className="text-xs sm:text-sm text-white hover:underline cursor-pointer"
              >
                No account yet? Sign up here
              </p>
            </div>
            <div className="mt-4 text-center">
              <p
                onClick={() => navigate("/Admin")}
                className="text-xs sm:text-sm text-white hover:underline cursor-pointer"
              >
                Are you an Admin? Go Here
              </p>
            </div>
          </form>
        )}
        
        {/* Render the Forgot or Signup page exclusively if they are active */}
        {showForgot && <Forgot onClose={handleCloseForgot} showAlert={showAlert} />}
        {showSignup && <Signup onClose={handleCloseSignup} showAlert={showAlert} />}
      </div>
      {showAdmin && <Admin onClose={() => setShowAdmin(false)} />}
    </div>
  );
};

export default Auth;
