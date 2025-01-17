// index.js

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "./index.css";
import Mainapp from "./pre-pages/Mainapp";
import Auth from "./pre-pages/auth";
import Welcome from "./components/welcome/welcome";
import reportWebVitals from "./reportWebVitals";

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
        className={`fixed bottom-0 right-0 bg-white bg-opacity-80 rounded-l-lg p-3 transition-transform duration-500 ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        <p className="text-sm text-gray-700">&copy; TeamUniVerse, 2025</p>
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
