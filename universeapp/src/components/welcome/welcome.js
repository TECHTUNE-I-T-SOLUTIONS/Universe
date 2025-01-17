import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
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


  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const openPersonalPage = () => {
    setActivePage("personal"); // Set the active page to 'personal'
  };

  const openAcademicProgress = () => {
    setActivePage("academicProgress"); // Set the active page to 'personal'
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
    setActivePage(null); // Close the active page
  };


  const handleLogout = () => {
    setShowLogoutDialog(true); // Show the logout confirmation dialog
  };

  const confirmLogout = () => {
    setShowLogoutDialog(false); // Close the dialog
    navigate("/auth");
  };

  const cancelLogout = () => {
    setShowLogoutDialog(false); // Close the dialog and stay on the current page
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } transition-width duration-300 text-blue-900 font-bold uppercase rounded-lg flex flex-col fixed top-0 left-0 h-full`}
        style={{
          backgroundColor: "#9B9BA6",
        }}
      >
        {/* Toggle Icon */}
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
            title="Personal" // Tooltip text
            className="flex items-center space-x-3 p-2 rounded hover:bg-blue-800 hover:text-white"
          >
            <img src={personal_icon} alt="Personal" className="w-6 h-6 rounded-full" />
            {isSidebarOpen && <span>Personal</span>}
          </a>
          <a
            href="#academics"
            onClick={openAcademicProgress}
            title="Academics" // Tooltip text
            className="flex items-center space-x-3 p-2 rounded hover:bg-blue-800 hover:text-white"
          >
            <img src={academics} alt="Academics" className="w-6 h-6 rounded-full" />
            {isSidebarOpen && <span>Academics</span>}
          </a>
          <a
            href="#community"
            onClick={openSocialAndCommunity}
            title="Community" // Tooltip text
            className="flex items-center space-x-3 p-2 rounded hover:bg-blue-800 hover:text-white"
          >
            <img src={community} alt="Community" className="w-6 h-6 rounded-full" />
            {isSidebarOpen && <span>Community</span>}
          </a>
          <a
            href="#wellness"
            onClick={openHealthAndWellness}
            title="Wellness" // Tooltip text
            className="flex items-center space-x-3 p-2 rounded hover:bg-blue-800 hover:text-white"
          >
            <img src={wellness} alt="Wellness" className="w-6 h-6 rounded-full" />
            {isSidebarOpen && <span>Wellness</span>}
          </a>
          <a
            href="#finance"
            onClick={openFinancialManagement}
            title="Finance" // Tooltip text
            className="flex items-center space-x-3 p-2 rounded hover:bg-blue-800 hover:text-white"
          >
            <img src={finance} alt="Finance" className="w-6 h-6 rounded-full" />
            {isSidebarOpen && <span>Finance</span>}
          </a>
          <a
            href="#career"
            onClick={openCareerDevelopment}
            title="Career" // Tooltip text
            className="flex items-center space-x-3 p-2 rounded hover:bg-blue-800 hover:text-white"
          >
            <img src={career} alt="Career" className="w-6 h-6 rounded-full" />
            {isSidebarOpen && <span>Career</span>}
          </a>
        </nav>

        {/* Logout */}
        <a href="#logout" onClick={handleLogout} className="flex items-center justify-center p-4 bg-gray-200 rounded hover:bg-blue-800 hover:text-white">
          <img src={log_out} alt="Logout" className="w-6 h-6 rounded-full mr-2" />
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
          className={`flex-1 p-6 bg-gradient-to-br from-[#5753F4] to-[#A1A1AD] rounded-lg transition-all duration-300 mt-16 h-full overflow-y-auto ${
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
            className={`flex justify-between items-center bg-blue-300 p-4 rounded mb-6 fixed top-0 transition-all duration-300 z-10 ${
              isSidebarOpen ? "left-64" : "left-20"
            } right-0`}
          >          
          <div>
                <h1 className="text-xl font-bold">WELCOME</h1>
                <p className="text-sm text-white">Today is: {formatDate()}</p>
              </div>
              <div className="flex items-center space-x-4">
                <button onClick={openSettingsPage} className="w-10 h-10 bg-transparent rounded-full flex items-center justify-center">
                  <img src={settings} alt="Settings" className="w-full h-full" />
                </button>
                <button onClick={openPersonalPage} className="w-10 h-10 bg-transparent rounded-full flex items-center justify-center">
                  <img src={profile} alt="Profile" className="w-full h-full" />
                </button>
              </div>
            </header>

            {/* Academic Progress Section */}
            <section className="mt-6">
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
            <section className="mt-6">
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
            <section className="mt-6">
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
            <section className="mt-6">
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
            <section className="mt-6">
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
