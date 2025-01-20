import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "./index.css";
import Mainapp from "./pre-pages/Mainapp";
import Auth from "./pre-pages/auth";
import Welcome from "./components/welcome/welcome";
import Admin from "./pre-pages/Admin";
import reportWebVitals from "./reportWebVitals";
import CopyrightIcon from "./icons/copyright.png"; // Import the icon


const App = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAuth(true);
    }, 7000);

    const hideFooterTimer = setTimeout(() => {
      setIsVisible(false);
    }, 7000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideFooterTimer);
    };
  }, []);

  const handleMouseEnter = () => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setTimeout(() => setIsVisible(false), 7000); // Hide after 7 seconds
  };

  return (
    <>
      {isLoggedIn ? (
        <Welcome />
      ) : showAuth ? (
        <Auth onLoginSuccess={() => setIsLoggedIn(true)} />
      ) : (
        <Mainapp />
      )}

      {/* Footer Section */}
      <footer
        className={`fixed bottom-0 right-0 flex items-center bg-gray-200 transition-transform rounded-l-lg w-6 h-6 p-6`}
      >
        <img
          src={CopyrightIcon}
          alt="Copyright Icon"
          className={`fixed bottom-0 right-0 flex items-center transition-opacity w-6 h-6 p-3`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />

        <div className={`fixed bottom-0 right-0 flex items-center bg-opacity-80 rounded-l-lg p-3 transition-transform duration-500 ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
        >

        <img
          src={CopyrightIcon}
          alt="Copyright Icon"
          className={`w-6 h-6 transition-opacity ${
            isVisible ? "opacity-100" : "opacity-50"
          }`}
        />
        {isVisible && (
          <p className="text-gray-900">Team UniVerse, 2025</p>
        )}
        </div>
      </footer>
    </>
  );
};

const Root = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate("/welcome"); // Navigate to Welcome page on login success
  };

  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/auth" element={<Auth onLoginSuccess={handleLoginSuccess} />} />
      <Route path="/Admin" element={<Admin />} />
      <Route path="/Admin-Dashboard" element={<AdminDashboard />} />
    </Routes>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Root />
    </Router>
  </React.StrictMode>
);

reportWebVitals();
