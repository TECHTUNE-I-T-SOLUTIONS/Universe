import React, { useState } from "react";

const VolunteerOpportunities = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [volunteerResults, setVolunteerResults] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    setVolunteerResults([]);

    if (!searchQuery.trim()) {
      setError("Please enter a valid city, location, or postal code.");
      return;
    }

    try {
      const url = `https://www.volunteermatch.org/search?location=${encodeURIComponent(searchQuery)}`;
      const response = await fetch(url, { mode: "cors" });
      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const htmlContent = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, "text/html");

      const results = Array.from(doc.querySelectorAll(".result-title")).map((result) => ({
        title: result.textContent.trim(),
        link: result.href,
      }));

      if (results.length === 0) {
        setError("No opportunities found for this location. Please try another.");
      } else {
        setVolunteerResults(results);
      }
    } catch (err) {
      setError("Failed to fetch results. Please check your internet connection or try again.");
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Volunteer Opportunities</h2>
      <div className="flex flex-col sm:flex-row items-center sm:space-x-2 space-y-2 sm:space-y-0">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter city or postal code"
          className="w-full sm:flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition"
        >
          Search
        </button>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <ul className="mt-6 space-y-4">
        {volunteerResults.map((result, index) => (
          <li key={index} className="p-4 bg-white rounded-lg shadow hover:shadow-md transition">
            <a
              href={result.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {result.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VolunteerOpportunities;
