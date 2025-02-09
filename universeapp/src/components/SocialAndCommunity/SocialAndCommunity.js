import React, { useState } from "react";
import ClubAndOrganization from "./ClubAndOrganization";
import EventCalendar from "./EventCalendar";
import SocialNetworking from "./SocialNetworking";
import { Alert } from "@nextui-org/alert";
import CloseIcon from "../../icons/close.png";

const formatDate = () => {
  const date = new Date();
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const SocialAndCommunity = ({ onClose }) => {
  const [activeSection, setActiveSection] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000); // Dismiss alert after 3 seconds
  };

  return (
    <>
      {/* Success Alert */}
      {showAlert && (
        <Alert
          color="success"
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 1000,
            width: "auto",
            backgroundColor: "#F8D7DA",
            borderColor: "#DC3545",
            color: "#155724",
            boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.5)", // Extra shadow for visibility
          }}
        >
          Section loaded successfully!
        </Alert>
      )}

      {/* Header */}
      <header className="flex justify-between items-center bg-blue-400 w-full p-2 rounded mb-6 fixed top-0 z-10">
        <div>
          <h1 className="text-xl font-bold text-black">SOCIAL AND COMMUNITY</h1>
          <p className="text-sm text-gray-100">Today is: {formatDate()}</p>
        </div>
      </header>


      {/* Content */}
      <div className="relative flex flex-col w-full h-full bg-white p-1 mt-1 rounded">
        {/* Close Button in Content */}
        <div className="flex mt-0 justify-end">
          <button
            className="absolute top-0 mt-1 right-4 w-5 h-5 bg-transparent rounded-full flex items-center justify-center"
            onClick={onClose}
          >
            <img src={CloseIcon} alt="Close" className="w-full h-full" />
          </button>
        </div>
        <div className="flex justify-around mb-2 mt-6">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => handleSectionChange("clubs")}
          >
            Clubs & Organizations
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={() => handleSectionChange("events")}
          >
            Event Calendar
          </button>
          <button
            className="px-4 py-2 bg-purple-500 text-white rounded"
            onClick={() => handleSectionChange("social")}
          >
            Social Networking
          </button>
        </div>

        <div className="flex-grow">
          {activeSection === "clubs" && <ClubAndOrganization />}
          {activeSection === "events" && <EventCalendar />}
          {activeSection === "social" && <SocialNetworking />}
        </div>
      </div>
    </>
  );
};

export default SocialAndCommunity;
