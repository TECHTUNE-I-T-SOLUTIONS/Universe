import React, { useState, useEffect } from "react";
import CloseIcon from "../../icons/close.png";
import { Jooble } from "../../apiKeys"; // Import Jooble API details from apiKeys.js 

const CareerDevelopment = ({ onClose }) => {
  const [currentDate, setCurrentDate] = useState("");
  const [jobs, setJobs] = useState([]);
  const [searchParams, setSearchParams] = useState({ keywords: "", location: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Set the current date
  useEffect(() => {
    const today = new Date();
    const dateString = today.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(dateString);
  }, []);

  // Function to fetch jobs from the API
  const fetchJobs = async () => {
    const url = Jooble.API_URL; // Use URL from apiKeys.js
    const apiKey = Jooble.API_KEY; // Use API Key from apiKeys.js
    const params = JSON.stringify({
      keywords: searchParams.keywords,
      location: searchParams.location,
    });

    try {
      setLoading(true);
      setError("");

      const response = await fetch(url + apiKey, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: params,
      });

      if (response.ok) {
        const data = await response.json();
        setJobs(data.jobs || []);
      } else {
        setError("Failed to fetch jobs. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  return (
    <div className="career-development flex flex-col h-full w-full bg-white">
      {/* Header */}
      <header className="flex justify-between items-center bg-blue-400 p-2 rounded mb-6 fixed top-0 w-full z-10">
        <div>
          <h1 className="text-xl font-bold text-black">CAREER DEVELOPMENT</h1>
          <p className="text-sm text-white">Today is: {currentDate}</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="mt-1 p-4">
        {/* Close Icon */}
        <div className="flex justify-end mb-4">
          <button
            className="w-10 h-10 bg-transparent flex items-center justify-center"
            onClick={onClose}
          >
            <img
              src={CloseIcon}
              alt="Close"
              className="w-full h-full"
            />
          </button>
        </div>

        {/* Job Search Form */}
        <form onSubmit={handleSearch} className="search-form mb-6">
          <div className="mb-4">
            <label htmlFor="keywords" className="block text-sm font-medium text-gray-700">
              Keywords
            </label>
            <input
              type="text"
              id="keywords"
              name="keywords"
              value={searchParams.keywords}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded"
              placeholder="e.g., IT, Developer, Engineer"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={searchParams.location}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded"
              placeholder="e.g., New York, Remote"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 items-center text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Search Jobs
          </button>
        </form>

        {/* Job Results */}
        {loading && <p className="text-gray-600">Loading jobs...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && jobs.length > 0 && (
          <div className="job-results">
            <h2 className="text-lg font-bold mb-4">Job Results:</h2>
            <ul className="space-y-4">
              {jobs.map((job, index) => (
                <li key={index} className="p-4 border border-gray-300 rounded shadow">
                  <h3 className="font-bold text-lg">{job.title}</h3>
                  <p className="text-gray-600">{job.company}</p>
                  <p className="text-gray-500">{job.location}</p>
                  <a
                    href={job.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Details
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        {!loading && jobs.length === 0 && !error && (
          <p className="text-gray-600">No jobs found. Try a different search.</p>
        )}
      </div>
    </div>
  );
};

export default CareerDevelopment;
