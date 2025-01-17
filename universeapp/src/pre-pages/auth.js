// auth.js
import React, { useState, useEffect } from "react";
import { Alert } from "@nextui-org/alert";
import student1 from "../icons/student1.jpg";
import student2 from "../icons/student2.jpg";
import student3 from "../icons/student3.jpg";
import student4 from "../icons/student4.jpg";
import Nametext from "../icons/UniVersetext.svg";
import logo from "../icons/UniVerselog.svg";
import Forgot from "./forgot";
import Signup from "./signup";

const Auth = ({ onLoginSuccess = () => {} }) => {
  const [showForgot, setShowForgot] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  //   const handleForgotPassword = () => {
  //   setShowForgot(true); // Show the Forgot Password page
  // };

  const handleCloseForgot = () => {
    setShowForgot(false); // Return to the login page
  };

  const handleCloseSignup = () => {
    setShowSignup(false); // Return to the Signup page
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

      {!showForgot && !showSignup && (
        <div className="flex justify-center items-center w-full">
          {/* Add a wrapper div with padding and max-width */}
          <div className="w-full max-w-4xl p-3 sm:p-8 lg:p-3 bg-gray-100 shadow-lg rounded-lg">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Animated Image Column */}
              <div className="relative flex flex-col items-center justify-center bg-gray-200 p-4 rounded-lg">
                <img
                  src={images[currentImageIndex]}
                  alt="Student"
                  className="h-full w-auto rounded-lg object-cover shadow-md transition-all"
                />
                <p
                  className="absolute bottom-4 text-center text-lg font-medium text-yellow-500"
                  style={{ textShadow: "1px 1px 2px red" }}
                >
                  Welcome to UniVerse! Please login or signup to continue.
                </p>
              </div>

              {/* Login Form */}
              <div className="p-6 flex flex-col items-center">
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
                    className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600"
                  >
                    Login
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
              </div>
            </div>
          </div>
        </div>
      )}

      {showForgot && <Forgot onClose={handleCloseForgot} showAlert={showAlert} />}
      {showSignup && <Signup onClose={handleCloseSignup} showAlert={showAlert} />}
    </div>
  );
};

export default Auth;
