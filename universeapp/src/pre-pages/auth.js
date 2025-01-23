// auth.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "@nextui-org/alert";
import student1 from "../icons/student1.jpg";
import student2 from "../icons/student2.jpg";
import student3 from "../icons/student3.jpg";
import student4 from "../icons/student4.jpg";
import Nametext from "../icons/UniVersetext.svg";
import logo from "../icons/UniVerselog.svg";
import Forgot from "./forgot";
import Signup from "./signup";
import Admin from "./Admin";

const Auth = ({ onLoginSuccess = () => {} }) => {
  const [showForgot, setShowForgot] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false); // Toggle between Admin and User Login
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();
  

  const images = [student1, student2, student3, student4];

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

  const handleLogin = (email, password) => {
    if (email.endsWith("@unilorin.edu.ng")) {
      showAlert("Login Successful😍! Now, just wait❤️", "success");
      // Trigger the login success handler
      setTimeout(() => {
        onLoginSuccess(); // Call the passed function to update the state in App component
      }, 1000);
    } else {
      showAlert("Invalid Email🙂‍↔️. Use your university email😉!", "error");
    }
  };

  const handleCloseForgot = () => {
    setShowForgot(false); // Return to the login page
  };

  const handleCloseSignup = () => {
    setShowSignup(false); // Return to the Login page
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

      {!showAdmin && !showForgot && !showSignup && (
        <div className="flex justify-center items-center w-full">
          <div className="w-full max-w-5xl p-3 sm:p-8 lg:p-3 bg-gray-50 shadow-lg rounded-lg">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Animated Image Column */}
              <div className="relative flex flex-col items-center justify-center p-1 rounded-lg">
                <img
                  src={images[currentImageIndex]}
                  alt="Student"
                  className="h-full w-full rounded-lg object-cover shadow-lg transition-all"
                />
                <p
                  className="absolute bottom-6 text-center text-lg font-sm text-yellow-500"
                  style={{ textShadow: "1px 1px 2px red" }}
                >
                  Welcome to UniVerse! <br /> Please login or signup to continue.
                </p>
              </div>

              {/* Login Form */}
              <div className="p-10 flex flex-col items-center justify-center bg-white rounded-lg shadow-lg">
                <img src={logo} alt="Logo" className="h-16 animate-spin-slow mb-4" />
                <img src={Nametext} alt="UniVerse" className="h-8 opacity-80 mb-6" />
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
                    placeholder="School Email: example@unilorin.edu.ng"
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
                    Student Login
                  </button>
                </form>
                <p
                  onClick={() => setShowForgot(true)}
                  className="text-sm text-blue-500 hover:underline cursor-pointer mt-2"
                >
                  Forgot Password?
                </p>
                <p
                  onClick={() => setShowSignup(true)}
                  className="text-sm text-gray-600 mt-4"
                >
                  No account yet?{" "}
                  <span className="text-blue-500 hover:underline cursor-pointer">Sign up here</span>
                </p>
                <p
                  onClick={() => navigate("/Admin")}
                  className="text-sm text-gray-600 mt-4"
                >
                  Are you an Admin?{" "}
                  <span className="text-blue-500 hover:underline cursor-pointer">Go Here</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAdmin && <Admin onClose={() => setShowAdmin(false)} />}
      {showForgot && <Forgot onClose={handleCloseForgot} showAlert={showAlert} />}
      {showSignup && <Signup onClose={handleCloseSignup} showAlert={showAlert} />}
    </div>
  );
};

export default Auth;
