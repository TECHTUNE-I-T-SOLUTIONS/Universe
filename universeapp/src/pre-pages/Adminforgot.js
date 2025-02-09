import React, { useState } from "react";
import Nametext from "../icons/UniVersetext.svg";
import logo from "../icons/UniVerselog.svg";

const AdminForgot = ({ onClose, showAlert }) => {
  const [email, setEmail] = useState("");

  const handleReset = () => {
    if (!email.endsWith("@unilorin.edu.ng")) {
      showAlert("Only university emails are allowed.😉", "error");
      return;
    }
    showAlert("Password reset link sent👌! Please check your inbox😉", "success");
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  return (
    <div className="flex items-center justify-center bg-transparent">
      <div className="w-full max-w-sm p-6 bg-transparent rounded-lg shadow-lg">
        <div className="flex flex-col items-center mb-4">
          <img src={logo} alt="Logo" className="h-16 animate-spin-slow mb-2" />
          <img src={Nametext} alt="UniVerse" className="h-8 opacity-80" />
        </div>
        <h2 className="text-2xl font-bold text-white text-center mb-4">Password Recovery</h2>
        <input
          type="email"
          placeholder="example@unilorin.edu.ng"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring focus:ring-blue-300 mb-4"
        />
        <button
          onClick={handleReset}
          className="w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 mb-4"
        >
          Reset Password
        </button>
        <button
          onClick={onClose}
          className="w-full bg-gray-300 text-gray-800 py-2 rounded-full hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AdminForgot;
