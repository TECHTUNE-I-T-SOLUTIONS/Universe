import React, { useState } from "react";
import { Alert } from "@nextui-org/alert";

const formatDate = () => {
  const date = new Date();
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
};

const PersonalPage = ({ onClose }) => {
  const [image, setImage] = useState(null);
  const [nickname, setNickname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [department, setDepartment] = useState("");
  const [courseOffered, setCourseOffered] = useState("");
  const [facultyOfStudy, setFacultyOfStudy] = useState("");
  const [favoriteCourses, setFavoriteCourses] = useState("");
  const [isNicknameEditable, setIsNicknameEditable] = useState(false);
  const [isPhoneNumberEditable, setIsPhoneNumberEditable] = useState(false);
  const [isDepartmentEditable, setIsDepartmentEditable] = useState(false);
  const [isCourseOfferedEditable, setIsCourseOfferedEditable] = useState(false);
  const [isFacultyOfStudyEditable, setIsFacultyOfStudyEditable] = useState(false);
  const [isFavoriteCoursesEditable, setIsFavoriteCoursesEditable] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
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

  const onSave = () => {
    // Logic for saving the data
    console.log("Data saved!");
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000); // Hide alert after 3 seconds
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
        <button
          className="self-end px-3 py-1 bg-green-500 text-white rounded mb-4"
          onClick={onSave}
        >
          Save
        </button>
        <button
          className="self-end px-3 py-1 bg-red-500 text-white rounded mb-4"
          onClick={onClose}
        >
          Close
        </button>
        <h2 className="text-2xl font-bold mb-4">Personal Profile Settings</h2>
        <form className="space-y-4">
          {/* Profile Image Section */}
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
              {/* Image holder */}
              {image ? (
                <img src={image} alt="Profile" className="w-full h-full rounded-full object-cover" />
              ) : (
                <span className="text-gray-500">No Image</span>
              )}
            </div>
            <div>
              <label className="block text-gray-700">Profile Image</label>
              <input
                type="file"
                className="w-full border border-gray-300 rounded p-2"
                onChange={handleImageChange}
              />
            </div>
          </div>

          {/* Nickname */}
          <div className="flex items-center">
            <label className="block text-gray-700">Nickname</label>
            <button
              type="button"
              className="ml-4 text-blue-500"
              onClick={() => toggleEdit("nickname")}
            >
              Edit
            </button>
          </div>
          <input
            type="text"
            placeholder="Enter your nickname"
            className="w-full border border-gray-300 rounded p-2"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            disabled={!isNicknameEditable}
          />

          {/* Phone Number */}
          <div className="flex items-center">
            <label className="block text-gray-700">Phone Number</label>
            <button
              type="button"
              className="ml-4 text-blue-500"
              onClick={() => toggleEdit("phoneNumber")}
            >
              Edit
            </button>
          </div>
          <input
            type="text"
            placeholder="Enter your phone number"
            className="w-full border border-gray-300 rounded p-2"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            disabled={!isPhoneNumberEditable}
          />

          {/* Department */}
          <div className="flex items-center">
            <label className="block text-gray-700">Department</label>
            <button
              type="button"
              className="ml-4 text-blue-500"
              onClick={() => toggleEdit("department")}
            >
              Edit
            </button>
          </div>
          <input
            type="text"
            placeholder="Enter your department"
            className="w-full border border-gray-300 rounded p-2"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            disabled={!isDepartmentEditable}
          />

          {/* Course Offered */}
          <div className="flex items-center">
            <label className="block text-gray-700">Course Offered</label>
            <button
              type="button"
              className="ml-4 text-blue-500"
              onClick={() => toggleEdit("courseOffered")}
            >
              Edit
            </button>
          </div>
          <input
            type="text"
            placeholder="Enter your course offered"
            className="w-full border border-gray-300 rounded p-2"
            value={courseOffered}
            onChange={(e) => setCourseOffered(e.target.value)}
            disabled={!isCourseOfferedEditable}
          />

          {/* Faculty of Study */}
          <div className="flex items-center">
            <label className="block text-gray-700">Faculty of Study</label>
            <button
              type="button"
              className="ml-4 text-blue-500"
              onClick={() => toggleEdit("facultyOfStudy")}
            >
              Edit
            </button>
          </div>
          <input
            type="text"
            placeholder="Enter your faculty of study"
            className="w-full border border-gray-300 rounded p-2"
            value={facultyOfStudy}
            onChange={(e) => setFacultyOfStudy(e.target.value)}
            disabled={!isFacultyOfStudyEditable}
          />

          {/* Favorite Courses */}
          <div className="flex items-center">
            <label className="block text-gray-700">Favorite Courses</label>
            <button
              type="button"
              className="ml-4 text-blue-500"
              onClick={() => toggleEdit("favoriteCourses")}
            >
              Edit
            </button>
          </div>
          <textarea
            placeholder="Enter your favorite courses"
            className="w-full border border-gray-300 rounded p-2"
            value={favoriteCourses}
            onChange={(e) => setFavoriteCourses(e.target.value)}
            disabled={!isFavoriteCoursesEditable}
          />
        </form>
      </div>
    </>
  );
};

export default PersonalPage;
