import React, { useState } from "react";
import CloseIcon from "../../icons/close.png";
import { Nutritionix } from "../../apiKeys"; // Import Nutritionix API details from apiKeys.js
import { LiveHealthilyWidget } from "../../apiKeys"; // Import LiveHealthilyWidget API details from apiKeys.js


const HealthAndWellness = ({ onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [iframeError, setIframeError] = useState(null);
  const [showWidget, setShowWidget] = useState(false);

  // Replace with actual values
  const API_URL = Nutritionix.API_URL; // Nutritionix API URL
  const APP_ID = Nutritionix.API_ID; // import Nutritionix App ID
  const API_KEY = Nutritionix.API_KEY; // import Nutritionix API Key
  const WIDGET_SRC = LiveHealthilyWidget.WIDGET_SRC; // import widget URL

  const handleIframeLoadError = () => {
    setIframeError("Failed to load the Healthily widget. Please try again.");
  };

  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Please enter a valid search term.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?query=${query}`, {
        headers: {
          "x-app-id": APP_ID,
          "x-app-key": API_KEY,
        },
      });
      const data = await response.json();
      setResults(data.common || []);
    } catch (err) {
      setError("Failed to fetch results. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = () => {
    const date = new Date();
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="flex flex-col h-full w-full bg-white">
      {/* Header */}
      <header className="flex justify-between items-center bg-blue-400 p-2 rounded mb-6 fixed top-0 w-full z-10">
        <div>
          <h1 className="text-xl font-bold text-black">HEALTH AND WELLNESS</h1>
          <p className="text-sm text-white">Today is: {formatDate()}</p>
        </div>
      </header>

      <div className="mt-1 p-2">
        {/* Close Icon */}
        <div className="flex justify-end">
          <button className="w-10 h-10 bg-transparent flex items-center justify-center">
            <img
              src={CloseIcon}
              alt="Close"
              className="w-full h-full"
              onClick={onClose}
            />
          </button>
        </div>

        {/* Food Search Section */}
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-lg font-semibold mb-4">
            Search for Food Related Information
          </h2>
          <div className="flex w-full max-w-md">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter a food-related keyword"
              className="w-full px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-green-500 text-white rounded-r hover:bg-green-600"
            >
              Search
            </button>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>

        {/* Search Results */}
        <div className="mt-6">
          {loading ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.map((item, index) => (
                <div
                  key={index}
                  className="border p-4 rounded shadow hover:shadow-lg transition-shadow"
                >
                  <h3 className="font-semibold">{item.food_name}</h3>
                  <p className="text-sm text-gray-600">
                    Serving Size: {item.serving_qty} {item.serving_unit}
                  </p>
                  <p className="text-sm text-gray-600">
                    Calories: {item.nf_calories}
                  </p>
                  <img
                    src={item.photo.thumb}
                    alt={item.food_name}
                    className="w-full h-24 object-cover mt-2 rounded"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Healthily Widget Section */}
        <div className="items-center mt-12">
          <h2 className="text-lg text-center font-semibold mb-4">
            Get Consultation About Your Health
          </h2>
          <div className="p-4 text-center border rounded shadow">
            <button
              className="px-4 text-center py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-4"
              onClick={() => setShowWidget(!showWidget)}
            >
              {showWidget ? "Hide Healthily Widget" : "Show Healthily Widget"}
            </button>
            {showWidget && (
              <div>
                <iframe
                  src={WIDGET_SRC}
                  title="Healthily Widget"
                  height="750px"
                  width="100%"
                  onError={handleIframeLoadError}
                  className="border rounded"
                />
                {iframeError && (
                  <p className="text-red-500 mt-2">{iframeError}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthAndWellness;
