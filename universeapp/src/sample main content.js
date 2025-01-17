// mainContent.js
import React from 'react';
import { formatDate } from './utils'; // Assuming you have a utility function to format the date
import close from "../../icons/close.png";
import assignment_tracking from "../../icons/assignment_tracking.svg";
import club_management from "../../icons/club_management.svg";
import grade_tracking from "../../icons/grade_tracking.svg";
import performance_analysis from "../../icons/performance_analysis.svg";
import event_calendar from "../../icons/event_calendar.svg";
import volunteer_opportunities from "../../icons/volunteer_opportunities.svg";
import social_networking from "../../icons/social_networking.svg";
import settings from "../../icons/settings.gif";
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


const MainContent = () => {
  return (
    <main className="flex-1 p-6 bg-gradient-to-br from-[#5753F4] to-[#A1A1AD] rounded-lg ml-64 mt-16 h-full overflow-y-auto">
      {/* Header */}
      <header className="flex justify-between items-center bg-blue-300 p-4 rounded mb-6 fixed top-0 left-64 right-0 z-10">
        <div>
          <h1 className="text-xl font-bold">Welcome</h1>
          <p className="text-sm text-gray-600">Today is: {formatDate()}</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center">
            <img src={settings} alt="Settings" className="w-full h-full" />
          </button>
          <button className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center">
            <img src={profile} alt="Profile" className="w-full h-full" />
          </button>
          <button className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center">
            <img src={close} alt="Close" className="w-full h-full" />
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
    </main>
  );
};

export default MainContent;
