import React, { useState } from "react";
import { Alert } from "@nextui-org/alert";
// Import React Icons for edit and save:
import { FiEdit, FiCheckCircle } from "react-icons/fi";
import { FaUpload } from "react-icons/fa";

const formatDate = () => {
  const date = new Date();
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
};

  const PersonalPage = ({ onClose }) => {
    // Existing state variables
    const [image, setImage] = useState(null);
    const [nickname, setNickname] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [department, setDepartment] = useState("");
    const [courseOffered, setCourseOffered] = useState("");
    const [facultyOfStudy, setFacultyOfStudy] = useState("");
    const [favoriteCourses, setFavoriteCourses] = useState("");
  
    // Editable flags
    const [isNicknameEditable, setIsNicknameEditable] = useState(false);
    const [isPhoneNumberEditable, setIsPhoneNumberEditable] = useState(false);
    const [isDepartmentEditable, setIsDepartmentEditable] = useState(false);
    const [isCourseOfferedEditable, setIsCourseOfferedEditable] = useState(false);
    const [isFacultyOfStudyEditable, setIsFacultyOfStudyEditable] = useState(false);
    const [isFavoriteCoursesEditable, setIsFavoriteCoursesEditable] = useState(false);
  
    const [showAlert, setShowAlert] = useState(false);
  
    // New: Handler to update profile in the database
    const handleUpdateProfile = async () => {
      // Prepare the payload for update
      const payload = {
        nickname,
        phoneNumber,
        department,
        courseOffered,
        facultyOfStudy,
        favoriteCourses,
        image, // This could be a base64 string or URL
      };
  
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/update-profile`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Profile update failed");
        }
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    };
  

  const toggleEdit = (field) => {
    switch (field) {
      case "nickname":
        setIsNicknameEditable(!isNicknameEditable);
        break;
      case "phoneNumber":
        setIsPhoneNumberEditable(!isPhoneNumberEditable);
        break;
      case "department":
        setIsDepartmentEditable(!isDepartmentEditable);
        break;
      case "courseOffered":
        setIsCourseOfferedEditable(!isCourseOfferedEditable);
        break;
      case "facultyOfStudy":
        setIsFacultyOfStudyEditable(!isFacultyOfStudyEditable);
        break;
      case "favoriteCourses":
        setIsFavoriteCoursesEditable(!isFavoriteCoursesEditable);
        break;
      default:
        break;
    }
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
            borderColor:  "#DC3545",
            color: "#155724" ,
            boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.5)", // Extra shadow for visibility
          }}
        >
          Data saved successfully!
        </Alert>
      )}

      <header className="flex flex-row bg-blue-400 w-full p-2 rounded mb-6 fixed top-0 z-10 overflow-y-auto">
        <div>
          <h1 className="text-xl font-bold">PERSONAL</h1>
          <p className="text-sm text-white">Today is: {formatDate()}</p>
        </div>
      </header>

      <div className="flex flex-col w-full h-full bg-white p-4 overflow-y-auto">

        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={handleUpdateProfile}
            className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 flex items-center space-x-2"
          >
            <FiCheckCircle size={20} />
            <span>Save</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 flex items-center space-x-2"
          >
            <span>Close</span>
          </button>
        </div>


        <h2 className="text-2xl font-bold mb-4">Personal Profile Settings</h2>
        <form className="space-y-4">
          {/* Profile Image Section */}
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
              {image ? (
                <img src={image} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-500">No Image</span>
              )}
            </div>
            <div className="flex flex-col">
              <label 
                htmlFor="profilePicInput"  // Associate the label with the input
                className="mb-1 text-gray-700 flex items-center space-x-1 cursor-pointer"
              >
                <FaUpload className="text-blue-500" size={20} />
                <span>Change Photo</span>
              </label>
              <input
                id="profilePicInput" // Added id attribute
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setImage(reader.result);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </div>
          </div>

          {/* Nickname Field */}
          <div className="flex items-center justify-between">
            <label className="block text-gray-700">Nickname</label>
            <button
              type="button"
              onClick={() => setIsNicknameEditable(!isNicknameEditable)}
              className="text-blue-500 focus:outline-none"
            >
              {isNicknameEditable ? <FiCheckCircle size={20} /> : <FiEdit size={20} />}
            </button>
          </div>
          <input
            type="text"
            placeholder="Enter your nickname"
            className={`w-full border rounded p-2 focus:outline-none focus:ring ${isNicknameEditable ? "border-blue-500" : "border-gray-300"}`}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            disabled={!isNicknameEditable}
          />

          {/* Phone Number */}
          <div className="flex items-center justify-between">
            <label className="block text-gray-700">Phone Number</label>
            <button
              type="button"
              onClick={() => toggleEdit("phoneNumber")}
              className="ml-4 text-blue-500 focus:outline-none"
            >
              {isPhoneNumberEditable ? <FiCheckCircle size={20} /> : <FiEdit size={20} />}
            </button>
          </div>
          <input
            type="text"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            disabled={!isPhoneNumberEditable}
            className={`w-full border rounded p-2 focus:outline-none focus:ring ${
              isPhoneNumberEditable ? "border-blue-500" : "border-gray-300"
            } mb-4`}
          />

          {/* Department */}
          <div className="flex items-center justify-between">
            <label className="block text-gray-700">Department</label>
            <button
              type="button"
              onClick={() => toggleEdit("department")}
              className="ml-4 text-blue-500 focus:outline-none"
            >
              {isDepartmentEditable ? <FiCheckCircle size={20} /> : <FiEdit size={20} />}
            </button>
          </div>
          <input
            type="text"
            placeholder="Enter your department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            disabled={!isDepartmentEditable}
            className={`w-full border rounded p-2 focus:outline-none focus:ring ${
              isDepartmentEditable ? "border-blue-500" : "border-gray-300"
            } mb-4`}
          />

          {/* Course Offered */}
          <div className="flex items-center justify-between">
            <label className="block text-gray-700">Course Offered</label>
            <button
              type="button"
              onClick={() => toggleEdit("courseOffered")}
              className="ml-4 text-blue-500 focus:outline-none"
            >
              {isCourseOfferedEditable ? <FiCheckCircle size={20} /> : <FiEdit size={20} />}
            </button>
          </div>
          <input
            type="text"
            placeholder="Enter your course offered"
            value={courseOffered}
            onChange={(e) => setCourseOffered(e.target.value)}
            disabled={!isCourseOfferedEditable}
            className={`w-full border rounded p-2 focus:outline-none focus:ring ${
              isCourseOfferedEditable ? "border-blue-500" : "border-gray-300"
            } mb-4`}
          />

          {/* Faculty of Study */}
          <div className="flex items-center justify-between">
            <label className="block text-gray-700">Faculty of Study</label>
            <button
              type="button"
              onClick={() => toggleEdit("facultyOfStudy")}
              className="ml-4 text-blue-500 focus:outline-none"
            >
              {isFacultyOfStudyEditable ? <FiCheckCircle size={20} /> : <FiEdit size={20} />}
            </button>
          </div>
          <input
            type="text"
            placeholder="Enter your faculty of study"
            value={facultyOfStudy}
            onChange={(e) => setFacultyOfStudy(e.target.value)}
            disabled={!isFacultyOfStudyEditable}
            className={`w-full border rounded p-2 focus:outline-none focus:ring ${
              isFacultyOfStudyEditable ? "border-blue-500" : "border-gray-300"
            } mb-4`}
          />

          {/* Favorite Courses */}
          <div className="flex items-center justify-between">
            <label className="block text-gray-700">Favorite Courses</label>
            <button
              type="button"
              onClick={() => toggleEdit("favoriteCourses")}
              className="ml-4 text-blue-500 focus:outline-none"
            >
              {isFavoriteCoursesEditable ? <FiCheckCircle size={20} /> : <FiEdit size={20} />}
            </button>
          </div>
          <textarea
            placeholder="Enter your favorite courses"
            value={favoriteCourses}
            onChange={(e) => setFavoriteCourses(e.target.value)}
            disabled={!isFavoriteCoursesEditable}
            className={`w-full border rounded p-2 focus:outline-none focus:ring ${
              isFavoriteCoursesEditable ? "border-blue-500" : "border-gray-300"
            } mb-4`}
          />
        </form>
      </div>
    </>
  );
};

export default PersonalPage;
