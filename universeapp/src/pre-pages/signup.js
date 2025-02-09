import React, { useState } from "react";
import { Alert } from "@nextui-org/alert";

const Signup = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [signupCode, setSignupCode] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [step, setStep] = useState(1); // Tracks the current step in the signup process

  const showAlert = (message, type = "success") => {
    setAlertMessage(message);
    setAlertType(type);
    setAlertVisible(true);
    setTimeout(() => setAlertVisible(false), 3000);
  };

  const handleSendSignupCode = () => {
    if (!(email.endsWith("@unilorin.edu.ng") || email.endsWith("@gmail.com"))) { 
      showAlert("Only university emails are allowed.😉", "error");
      return;
    }
    showAlert("Signup code sent to your email👌, please check🙏.", "success");
    setStep(2); // Move to the next step to show the signup code input
  };

  const handleConfirmSignupCode = () => {
    if (signupCode.trim() === "") {
      showAlert("Please enter the signup code!😡", "error");
      return;
    }
    showAlert("Signup code confirmed! Proceed.😍", "success");
    setStep(3); // Move to the next step to show the rest of the input fields
  };

  // New handleSignup function that sends the signup data to the backend
  const handleSignup = async () => {
    if (password !== confirmPassword) {
      showAlert("Passwords do not match! Please, check🙏", "error");
      return;
    }
    // Prepare the payload. You can include username if desired.
    const payload = {
      email,
      password,
      // Uncomment the next line if your backend supports username:
      username,
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Signup failed");
      }
      const data = await response.json();
      showAlert(data.message, "success");
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      showAlert(error.message, "error");
    }
  };

  return (
    <div className="flex items-center justify-center">
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
      <div className="w-full max-w-md p-4 sm:p-8 shadow-lg rounded-lg bg-transparent">
        <h2 className="text-2xl sm:text-base font-bold text-center mb-4">Sign Up</h2>
        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="example@unilorin.edu.ng"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring focus:ring-blue-300 text-xs sm:text-base mb-4"
            />
            <button
              onClick={handleSendSignupCode}
              className="w-full bg-green-700 font-bold text-white py-2 rounded-full hover:bg-black text-xs sm:text-base mb-4"
            >
              Send Signup Code
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Enter Signup Code"
              value={signupCode}
              onChange={(e) => setSignupCode(e.target.value)}
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring focus:ring-red-600 text-xs sm:text-base mb-4"
            />
            <button
              onClick={handleConfirmSignupCode}
              className="w-full bg-blue-500 text-white font-bold py-2 rounded-full hover:bg-blue-600 text-xs sm:text-base mb-4"
            >
              Confirm Signup Code
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring focus:ring-green-600 text-xs sm:text-base mb-4"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring focus:ring-green-600 text-xs sm:text-base mb-4"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring focus:ring-green-600 text-xs sm:text-base mb-4"
            />
            <button
              onClick={handleSignup}
              className="w-full bg-green-500 font-bold text-white py-2 rounded-full hover:bg-green-600 text-xs sm:text-base mb-4"
            >
              Student Signup
            </button>
          </>
        )}

        <button
          onClick={onClose}
          className="w-full bg-red-600 font-bold text-white py-2 rounded-full hover:bg-black text-xs sm:text-base"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Signup;
