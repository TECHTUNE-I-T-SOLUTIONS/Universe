import React, { useState } from "react";
import { FaUserCircle, FaLock, FaCamera, FaArrowLeft, FaEnvelope, FaGlobe, FaUser } from "react-icons/fa";

const Profile_Settings = ({ setActivePage }) => {
  // State for profile picture
  const [profilePic, setProfilePic] = useState(null);

  // State for profile details
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [profileMessage, setProfileMessage] = useState("");

  // State for password update
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  // Handle profile picture update
  const handlePictureChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePic(e.target.files[0]);
    }
  };

  // Handle profile details update (dummy logic)
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // Add your validation and API call here
    setProfileMessage("Profile updated successfully!");
  };

  // Handle password update (dummy logic)
  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordMessage("Passwords do not match");
      return;
    }
    // Add your password update logic here
    setPasswordMessage("Password updated successfully!");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    // Full-page container with a modern gradient background
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 flex flex-col items-center p-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-xl">
        {/* Back Button */}
        <button 
          className="mb-4 flex items-center text-blue-500 hover:text-blue-700"
          onClick={() => setActivePage("AdminMainContent")}
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Profile Settings</h2>

        {/* Profile Picture Section */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            {profilePic ? (
              <img
                src={URL.createObjectURL(profilePic)}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover"
              />
            ) : (
              <FaUserCircle className="w-32 h-32 text-gray-400" />
            )}
            <label
              htmlFor="profilePicInput"
              className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 cursor-pointer hover:bg-blue-600"
            >
              <FaCamera />
            </label>
            <input
              id="profilePicInput"
              type="file"
              accept="image/*"
              onChange={handlePictureChange}
              className="hidden"
            />
          </div>
        </div>

        {/* Profile Details Form */}
        <form onSubmit={handleProfileUpdate} className="space-y-4 mb-8">
          <div>
            <label className="block text-gray-700 mb-1">Full Name</label>
            <div className="flex items-center border rounded p-2">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full focus:outline-none"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Username</label>
            <div className="flex items-center border rounded p-2">
              <FaUserCircle className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Enter your username"
                className="w-full focus:outline-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <div className="flex items-center border rounded p-2">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Bio</label>
            <textarea
              placeholder="Tell us about yourself"
              className="w-full border rounded p-2 focus:outline-none"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows="3"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Website</label>
            <div className="flex items-center border rounded p-2">
              <FaGlobe className="text-gray-400 mr-2" />
              <input
                type="url"
                placeholder="Your website URL"
                className="w-full focus:outline-none"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
          </div>
          {profileMessage && <p className="text-center text-green-500">{profileMessage}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Update Profile
          </button>
        </form>

        {/* Password Update Form */}
        <form onSubmit={handlePasswordUpdate} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">New Password</label>
            <div className="flex items-center border rounded p-2">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full focus:outline-none"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Confirm Password</label>
            <div className="flex items-center border rounded p-2">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full focus:outline-none"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          {passwordMessage && <p className="text-center text-red-500">{passwordMessage}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile_Settings;
