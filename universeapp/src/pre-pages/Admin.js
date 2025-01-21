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
    showAlert("Admin Login Successful😍! Now, just wait❤️", "success");
    // Trigger the login success handler
    setTimeout(() => {
      onLoginSuccess(); // Call the passed function to update the state in App component
      navigate("/Admin-Dashboard"); //To Navigate to the AdminDashboard page
    }, 1000);
  } else {
    showAlert("Invalid Email🙂‍↔️. Use your university email😉!", "error");
  }
};

  const handleCloseAdminForgot = () => {
    setShowAdminForgot(false); // Return to the login page
  };

  const handleCloseAdminSignup = () => {
    setShowAdminSignup(false); // Return to the Login page
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

      {!showAdminForgot && !showAdminSignup && (
        <div className="flex justify-center items-center w-full">
          {/* Add a wrapper div with padding and max-width */}
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
                  Welcome to UniVerse, Admin! <br/> You can login or signup below.
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
                    className="w-full bg-blue-500 text-white font-bold py-3 rounded-full hover:bg-blue-600"
                  >
                    Admin Login
                  </button>
                </form>
                <p
                  onClick={() => setShowAdminForgot(true)}
                  className="text-sm text-blue-500 hover:underline cursor-pointer mt-2"
                >
                  Forgot Password?
                </p>
                <p
                  onClick={() => setShowAdminSignup(true)}
                  className="text-sm text-gray-600 mt-4"
                >
                  No account yet?{" "}
                  <span className="text-blue-500 hover:underline cursor-pointer">Sign up here</span>
                </p>
                <p 
                  onClick={() => navigate("/auth")}
                  className="text-sm text-gray-600 mt-4"
                >
                  Are you an Student?{" "}
                  <span className="text-blue-500 hover:underline cursor-pointer"> Go Here</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAdminForgot && <AdminForgot onClose={handleCloseAdminForgot} showAlert={showAlert} />}
      {showAdminSignup && <AdminSignup onClose={handleCloseAdminSignup} showAlert={showAlert} />}
      {showAuth && <Auth onClose={() => setShowAuth(false)} />}
    </div>
  );
};

export default Admin;
