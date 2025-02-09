import React, { useState } from "react";
import CloseIcon from "../../icons/close.png";
import { Nutritionix, LiveHealthilyWidget, api_ninjas } from "../../apiKeys"; // Import API details from apiKeys.js

const HealthAndWellness = ({ onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [iframeError, setIframeError] = useState(null);
  const [showWidget, setShowWidget] = useState(false);

  const [foodName, setFoodName] = useState("");
  const [timeEaten, setTimeEaten] = useState("");
  const [dietLogs, setDietLogs] = useState([]);
  const [calorieInfo, setCalorieInfo] = useState(null);

  const API_URL = Nutritionix.API_URL;
  const APP_ID = Nutritionix.APP_ID;
  const API_KEY = Nutritionix.API_KEY;
  const WIDGET_SRC = LiveHealthilyWidget.WIDGET_SRC;

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

  const handleAddLog = async () => {
    if (!foodName || !timeEaten) {
      alert("Please fill out both fields.");
      return;
    }

    try {
      const response = await fetch(
        `https://api.calorieninjas.com/v1/nutrition?query=${foodName}`,
        {
          headers: { "X-Api-Key": api_ninjas.API_KEY },
        }
      );
      const data = await response.json();

      if (data.items && data.items.length > 0) {
        const calories = data.items[0].calories;
        const log = {
          foodName,
          timeEaten,
          calories,
        };
        setDietLogs((prevLogs) => [...prevLogs, log]);
        setCalorieInfo({
          total: dietLogs.reduce((sum, log) => sum + log.calories, 0) + calories,
        });
        setFoodName("");
        setTimeEaten("");
      } else {
        alert("Unable to fetch calorie details. Please check the food name.");
      }
    } catch (error) {
      alert("Error fetching food details. Please try again.");
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
          {loading && <p className="text-center">Loading...</p>}
          {results.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Search Results</h3>
              <ul className="mt-2 space-y-2">
                {results.map((item, index) => (
                  <li key={index} className="p-2 border rounded shadow">
                    <p><strong>Food:</strong> {item.food_name}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </header>

      <div className="mt-1 p-2 space-y-8">
        {/* Close Icon */}
        <div className="flex justify-end">
          <button className="w-5 h-5 bg-transparent flex items-center justify-center">
            <img
              src={CloseIcon}
              alt="Close"
              className="w-full h-full"
              onClick={onClose}
            />
          </button>
        </div>

        {/* Food Search Section */}
        <div className="border p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-center mb-4">
            Search for Food Related Information
          </h2>
          <div className="flex w-full max-w-md mx-auto">
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
          {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
        </div>

        {/* Diet Tracking Section */}
        <div className="border p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-center mb-4">Diet Tracker</h2>
          <div className="flex flex-col items-center space-y-4">
            <input
              type="text"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              placeholder="Enter food name"
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded"
            />
            <input
              type="time"
              value={timeEaten}
              onChange={(e) => setTimeEaten(e.target.value)}
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded"
            />
            <button
              onClick={handleAddLog}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Log
            </button>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Diet Logs</h3>
            {dietLogs.length === 0 ? (
              <p className="text-gray-500">No logs added yet.</p>
            ) : (
              <ul className="mt-2 space-y-2">
                {dietLogs.map((log, index) => (
                  <li key={index} className="p-2 border rounded shadow">
                    <p>
                      <strong>Food:</strong> {log.foodName}
                    </p>
                    <p>
                      <strong>Time:</strong> {log.timeEaten}
                    </p>
                    <p>
                      <strong>Calories:</strong> {log.calories} kcal
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {calorieInfo && (
            <p className="mt-4 text-center">
              <strong>Total Calories:</strong> {calorieInfo.total} kcal
            </p>
          )}
        </div>

        {/* Healthily Widget Section */}
        <div className="border p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-center mb-4">
            Get Consultation About Your Health
          </h2>
          <div className="text-center">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-4"
              onClick={() => setShowWidget(!showWidget)}
            >
              {showWidget ? "Hide Widget" : "Show Widget"}
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
