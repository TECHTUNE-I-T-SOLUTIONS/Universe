// Forgot.js
import React, { useState } from "react";

const Forgot = ({ onClose, showAlert }) => {
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
    <div className="w-full max-w-sm p-6 bg-transparent rounded-lg shadow-lg">
      <h2 className="text-2xl sm:text-sm font-bold text-center mb-4">Forgot Password</h2>
      <input
        type="email"
        placeholder="example@unilorin.edu.ng"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring focus:ring-blue-300 mb-4"
      />
      <button
        onClick={handleReset}
        className="text-xs sm:text-sm w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 mb-4"
      >
        Reset Student Password
      </button>
      <button
        onClick={onClose}
        className="w-full bg-gray-300 text-gray-800 py-2 rounded-full hover:bg-gray-400"
      >
        Cancel
      </button>
    </div>
  );
};

export default Forgot;
