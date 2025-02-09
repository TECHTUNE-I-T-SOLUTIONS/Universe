import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { FiArrowDown } from "react-icons/fi";

// import { useHistory } from "react-router-dom"; // Assuming you're using react-router for navigation
import logo from "../../icons/UniVerselog.svg";
import Nametext from "../../icons/UniVersetext.svg";
import personal_icon from "../../icons/personal_icon.png";
import academics from "../../icons/academics.png";
import community from "../../icons/community.png";
import wellness from "../../icons/wellness.png";
import finance from "../../icons/finance.png";
import career from "../../icons/career.png";
import log_out from "../../icons/log-out.png";
import openSidebarIcon from "../../icons/open_sidebar.png";
import closeSidebarIcon from "../../icons/close_sidebar.png";
import assignment_tracking from "../../icons/assignment_tracking.svg";
import club_management from "../../icons/club_management.svg";
import grade_tracking from "../../icons/grade_tracking.svg";
import performance_analysis from "../../icons/performance_analysis.svg";
import event_calendar from "../../icons/event_calendar.svg";
import volunteer_opportunities from "../../icons/volunteer_opportunities.svg";
import social_networking from "../../icons/social_networking.svg";
import settings from "../../icons/settings.png";
import profile from "../../icons/profile.png";
import mental_health_resources from "../../icons/mental_health_resources.svg";
import physical_health_tracking from "../../icons/physical_health_tracking.svg";
import goal_setting from "../../icons/goal_setting.svg";
import wellness_events from "../../icons/wellness_events.svg";
import budgeting from "../../icons/budgeting.svg";
import scholarship_search from "../../icons/scholarship_search.svg";
import fee_payment_tracking from "../../icons/fee_payment_tracking.svg";
import financial_literacy_resources from "../../icons/financial_literacy_resources.svg";
import internship_and_job_search from "../../icons/internship_and_job_search.svg";
import skill_building_resources from "../../icons/skill_building_resources.svg";
import mentorship_opportunities from "../../icons/mentorship_opportunities.svg";
import career_assessment_tools from "../../icons/career_assessment_tools.svg";
import PersonalPage from "../personal/personal_page.js"
import AcademicProgress from "../AcademicProgress/AcademicProgress.js"
import SocialAndCommunity from "../SocialAndCommunity/SocialAndCommunity.js"
import HealthAndWellness from "../HealthAndWellness/HealthAndWellness.js"
import FinancialManagement from "../FinancialManagement/FinancialManagement.js"
import CareerDevelopment from "../CareerDevelopment/CareerDevelopment.js"
import SettingsPage from "../SettingsPage/SettingsPage.js"


const formatDate = () => {
  const date = new Date();
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
};

const Welcome = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState(null); // Track the active page  
  const [showLogoutDialog, setShowLogoutDialog] = useState(false); // For showing the logout dialog  
  const navigate = useNavigate(); // Get the navigate function
  const [showProfilePrompt, setShowProfilePrompt] = useState(() => {
    return localStorage.getItem("profilePromptShown") !== "true";
  });
   
  // NEW: State variable for the username
  const [username, setUsername] = useState("");

  // NEW: useEffect to fetch the logged-in user's details
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${process.env.REACT_APP_API_URL}/api/user`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.username) {
            setUsername(data.username);
          }
        })
        .catch((err) => console.error("Error fetching user details:", err));
    }
  }, []);

  // Toggle sidebar open/close
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // Navigation functions that set the active page
  const openPersonalPage = () => {
    setActivePage("personal");
  };

  const openAcademicProgress = () => {
    setActivePage("academicProgress");
  };

  const openSocialAndCommunity = () => {
    setActivePage("SocialAndCommunity");
  };

  const openHealthAndWellness = () => {
    setActivePage("HealthAndWellness");
  };

  const openFinancialManagement = () => {
    setActivePage("FinancialManagement");
  };

  const openCareerDevelopment = () => {
    setActivePage("CareerDevelopment");
  };

  const openSettingsPage = () => {
    setActivePage("SettingsPage");
  };

  const closeActivePage = () => {
    setActivePage(null); // Close the active page (return to the default welcome view)
  };

  // Logout handlers
  const handleLogout = () => {
    setShowLogoutDialog(true);
  };

  const confirmLogout = () => {
    setShowLogoutDialog(false);
    navigate("/auth");
  };

  const cancelLogout = () => {
    setShowLogoutDialog(false);
  };

  // Helper function that returns classes based on active page
  const getLinkClasses = (pageName) => {
    return `flex items-center space-x-3 p-2 rounded ${
      activePage === pageName ? "bg-blue-800 text-white" : "hover:bg-blue-800 hover:text-white"
    }`;
  };


  return (
    <div className="flex h-screen bg-gray-100">
      {showProfilePrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-500">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Update Your Profile</h2>
            <p className="mb-4">
              Welcome to your portal, {username ? username : "User"}! We recommend updating your profile for a better experience.
            </p>
            <div className="flex justify-center mb-4 animate-bounce">
              <FiArrowDown className="text-blue-500 text-4xl" />
            </div>
            <button
              onClick={() => {
                setShowProfilePrompt(false);
                localStorage.setItem("profilePromptShown", "true");
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
            >
              Got it!
            </button>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } transition-width duration-300 text-blue-900 font-bold uppercase rounded-lg flex flex-col fixed top-0 left-0 h-full`}
        style={{
          backgroundColor: "#9B9BA6",
        }}
      >
        {/* Toggle Icon and Branding */}
        <div className="flex items-center justify-between p-4 border-b border-blue-800">
          <div className="flex items-center space-x-4">
            <img
              src={logo}
              className="h-[5vmin] pointer-events-none z-10 animate-spin-slow"
              alt="logo"
            />
            {isSidebarOpen && (
              <img
                src={Nametext}
                className="h-[3vmin] pointer-events-none z-10"
                alt="UniVerse"
              />
            )}
          </div>
          <button onClick={toggleSidebar} className="focus:outline-none">
            <img
              src={isSidebarOpen ? closeSidebarIcon : openSidebarIcon}
              alt="Toggle Sidebar"
              className="w-6 h-6"
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-4">
          <a
            href="#personal"
            onClick={openPersonalPage}
            title="Personal"
            className={getLinkClasses("personal")}
          >
            <img
              src={personal_icon}
              alt="Personal"
              className="w-6 h-6 rounded-full"
            />
            {isSidebarOpen && <span>Personal</span>}
          </a>
          <a
            href="#academics"
            onClick={openAcademicProgress}
            title="Academics"
            className={getLinkClasses("academicProgress")}
          >
            <img
              src={academics}
              alt="Academics"
              className="w-6 h-6 rounded-full"
            />
            {isSidebarOpen && <span>Academics</span>}
          </a>
          <a
            href="#community"
            onClick={openSocialAndCommunity}
            title="Community"
            className={getLinkClasses("SocialAndCommunity")}
          >
            <img
              src={community}
              alt="Community"
              className="w-6 h-6 rounded-full"
            />
            {isSidebarOpen && <span>Community</span>}
          </a>
          <a
            href="#wellness"
            onClick={openHealthAndWellness}
            title="Wellness"
            className={getLinkClasses("HealthAndWellness")}
          >
            <img
              src={wellness}
              alt="Wellness"
              className="w-6 h-6 rounded-full"
            />
            {isSidebarOpen && <span>Wellness</span>}
          </a>
          <a
            href="#finance"
            onClick={openFinancialManagement}
            title="Finance"
            className={getLinkClasses("FinancialManagement")}
          >
            <img
              src={finance}
              alt="Finance"
              className="w-6 h-6 rounded-full"
            />
            {isSidebarOpen && <span>Finance</span>}
          </a>
          <a
            href="#career"
            onClick={openCareerDevelopment}
            title="Career"
            className={getLinkClasses("CareerDevelopment")}
          >
            <img
              src={career}
              alt="Career"
              className="w-6 h-6 rounded-full"
            />
            {isSidebarOpen && <span>Career</span>}
          </a>
        </nav>

        {/* Logout */}
        <a
          href="#logout"
          onClick={handleLogout}
          className="flex items-center justify-center p-4 bg-gray-200 rounded hover:bg-blue-800 hover:text-white"
          title="Logout"
        >
          <img
            src={log_out}
            alt="Logout"
            className="w-6 h-6 rounded-full mr-2"
          />
          {isSidebarOpen && <span>Logout</span>}
        </a>
      </aside>

      {/* Custom Logout Dialog */}
      {showLogoutDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">Logout Confirmation</h3>
            <p>Are you sure you want to log out?</p>
            <div className="flex justify-between mt-4">
              <button onClick={cancelLogout} className="px-4 py-2 bg-gray-500 text-white rounded-lg">
                Cancel
              </button>
              <button onClick={confirmLogout} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Main Content */}
      <main   
          className={`flex-1 p-0 bg-gradient-to-br from-[#5753F4] to-[#A1A1AD] rounded-lg transition-all duration-300 mt-16 h-full overflow-y-auto ${
            isSidebarOpen ? "ml-64" : "ml-20"
          }`}
      >
        {["personal", "academicProgress", "SocialAndCommunity", "HealthAndWellness", "FinancialManagement", "CareerDevelopment", "SettingsPage"].includes(activePage) ? (
          <div>
            {/* Render the selected page component based on activePage */}
            {activePage === "personal" && <PersonalPage onClose={closeActivePage} />}
            {activePage === "academicProgress" && <AcademicProgress onClose={closeActivePage} />}
            {activePage === "SocialAndCommunity" && <SocialAndCommunity onClose={closeActivePage} />}
            {activePage === "HealthAndWellness" && <HealthAndWellness onClose={closeActivePage} />}
            {activePage === "FinancialManagement" && <FinancialManagement onClose={closeActivePage} />}
            {activePage === "CareerDevelopment" && <CareerDevelopment onClose={closeActivePage} />}
            {activePage === "SettingsPage" && <SettingsPage onClose={closeActivePage} />}
          </div>
        ) : (
          <>
            <header
            className={`flex justify-between items-center bg-blue-300 p-2 rounded mb-6 fixed top-0 transition-all duration-300 z-10 ${
              isSidebarOpen ? "left-64" : "left-20"
            } right-0`}
          >          
          <div> 
                <h1 className="text-xl font-bold">
                {username ? `Welcome, ${username}` : "WELCOME"}
                </h1>
                <p className="text-sm text-white">Today is: {formatDate()}</p>
              </div>
              <div className="flex items-center space-x-4">
                <button onClick={openSettingsPage} className="w-10 h-10 bg-transparent rounded-full flex items-center justify-center"
                  title="Settings">
                  <img src={settings} alt="Settings" className="w-full h-full" />
                </button>
                <button onClick={openPersonalPage} className="w-10 h-10 bg-transparent rounded-full flex items-center justify-center"
                title="Profile">
                  <img src={profile} alt="Profile" className="w-full h-full" />

                </button>
              </div>
            </header>

            {/* Academic Progress Section */}
            <section className="mt-6 p-2">
              <h2 className="text-lg font-bold mb-4">Academic Progress</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col items-center bg-gray-200 p-4 rounded">
                  <img src={assignment_tracking} alt="Assignment Tracking" className="w-16 h-16" />
                  <span className="mt-2">Assignment Tracking</span>
                </div>
                <div className="flex flex-col items-center bg-gray-200 p-4 rounded">
                  <img src={grade_tracking} alt="Grade Tracking" className="w-16 h-16" />
                  <span className="mt-2">Grade Tracking</span>
                </div>
                <div className="flex flex-col items-center bg-gray-200 p-4 rounded">
                  <img src={performance_analysis} alt="Performance Analytics" className="w-16 h-16" />
                  <span className="mt-2">Performance Analytics</span>
                </div>
                {/* New Subsections */}
                <div className="flex flex-col items-center bg-gray-200 p-4 rounded">
                  <img src={volunteer_opportunities} alt="Volunteer Opportunities" className="w-16 h-16" />
                  <span className="mt-2">Volunteer Opportunities</span>
                </div>
              </div>          
            </section>

            {/* Social and Community Engagement Section */}
            <section className="mt-6 p-2">
              <h2 className="text-lg font-bold mb-4">Social and Community Engagement</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col items-center bg-gray-200 p-4 rounded">
                  <img src={club_management} alt="Club Management" className="w-16 h-16" />
                  <span className="mt-2">Club Management</span>
                </div>
                <div className="flex flex-col items-center bg-gray-200 p-4 rounded">
                  <img src={event_calendar} alt="Event Calendar" className="w-16 h-16" />
                  <span className="mt-2">Event Calendar</span>
                </div>
                {/* New Subsection */}
                <div className="flex flex-col items-center bg-gray-200 p-4 rounded">
                  <img src={volunteer_opportunities} alt="Volunteer Opportunities" className="w-16 h-16" />
                  <span className="mt-2">Volunteer Opportunities</span>
                </div>
                <div className="flex flex-col items-center bg-gray-200 p-4 rounded">
                  <img src={social_networking} alt="Social Networking" className="w-16 h-16" />
                  <span className="mt-2">Social Networking</span>
                </div>
              </div>
            </section>

            {/* Health and Wellness Section */}
            <section className="mt-6 p-2">
              <h2 className="text-lg font-bold mb-4">Health and Wellness</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col items-center bg-gray-200 p-4 rounded">
                  <img src={mental_health_resources} alt="Mental Health Resources" className="w-16 h-16" />
                  <span className="mt-2">Mental Health Resources</span>
                </div>
                <div className="flex flex-col items-center bg-gray-200 p-4 rounded">
                  <img src={goal_setting} alt="Goal Setting" className="w-16 h-16" />
                  <span className="mt-2">Goal Setting</span>
                </div>
                {/* New Subsections */}
                <div className="flex flex-col items-center bg-gray-200 p-4 rounded">
                  <img src={physical_health_tracking} alt="Physical Health Tracking" className="w-16 h-16" />
                  <span className="mt-2">Physical Health Tracking</span>
                </div>
                <div className="flex flex-col items-center bg-gray-200 p-4 rounded">
                  <img src={wellness_events} alt="Wellness Events" className="w-16 h-16" />
                  <span className="mt-2">Wellness Events</span>
                </div>
              </div>
            </section>

            {/* Financial Management Section */}
            <section className="mt-6 p-2">
              <h2 className="text-lg font-bold mb-4">Financial Management</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col items-center bg-gray-200 p-4 rounded">
                  <img src={budgeting} alt="Budgeting" className="w-16 h-16" />
                  <span className="mt-2">Budgeting</span>
                </div>
                <div className="flex flex-col items-center bg-gray-200 p-4 rounded">
                  <img src={scholarship_search} alt="Scholarship Search" className="w-16 h-16" />
                  <span className="mt-2">Scholarship Search</span>
                </div>
                {/* New Subsections */}
                <div className="flex flex-col items-center bg-gray-200 p-4 rounded">
                  <img src={fee_payment_tracking} alt="Fee Payment Tracking" className="w-16 h-16" />
                  <span className="mt-2">Fee Payment Tracking</span>
                </div>
                <div className="flex flex-col items-center bg-gray-200 p-4 rounded">
                  <img src={financial_literacy_resources} alt="Financial Literacy Resources" className="w-16 h-16" />
                  <span className="mt-2">Financial Literacy Resources</span>
                </div>
              </div>
            </section>

            {/* Career Development Section */}
            <section className="mt-6 p-2">
              <h2 className="text-lg font-bold mb-4">Career Development</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col items-center bg-gray-200 p-4 rounded">
                  <img src={internship_and_job_search} alt="Internship and Job Search" className="w-16 h-16" />
                  <span className="mt-2">Internship & Job Search</span>
                </div>
                <div className="flex flex-col items-center bg-gray-200 p-4 rounded">
                  <img src={mentorship_opportunities} alt="Mentorship Opportunities" className="w-16 h-16" />
                  <span className="mt-2">Mentorship Opportunities</span>
                </div>
                {/* New Subsections */}
                <div className="flex flex-col items-center bg-gray-200 p-4 rounded">
                  <img src={skill_building_resources} alt="Skill Building Resources" className="w-16 h-16" />
                  <span className="mt-2">Skill Building Resources</span>
                </div>
                <div className="flex flex-col items-center bg-gray-200 p-4 rounded">
                  <img src={career_assessment_tools} alt="Career Assessment Tools" className="w-16 h-16" />
                  <span className="mt-2">Career Assessment Tools</span>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
};
export default Welcome;
