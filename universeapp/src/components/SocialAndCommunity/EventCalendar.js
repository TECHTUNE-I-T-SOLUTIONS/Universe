import React, { useEffect, useState } from "react";
import ApiCalendar from "react-google-calendar-api";
import { GoogleOAuth } from "../../apiKeys"; // Import GoogleOAuth API details from apiKeys.js

// Read values from apiKeys.js
const config = {
  clientId: GoogleOAuth.CLIENT_ID,
  apiKey: GoogleOAuth.API_KEY,
  scope: GoogleOAuth.SCOPE,
  discoveryDocs: [GoogleOAuth.DISCOVERY_DOCS],
};

const apiCalendar = new ApiCalendar(config);

const EventCalendar = () => {
  const [events, setEvents] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initializeGapi = async () => {
      try {
        // Ensure gapi script is loaded
        if (!window.gapi) {
          const script = document.createElement("script");
          script.src = "https://apis.google.com/js/api.js";
          script.async = true;
          script.onload = () => console.log("GAPI script loaded successfully");
          script.onerror = () => console.error("Error loading GAPI script");
          document.body.appendChild(script);

          // Wait for the script to load
          await new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = reject;
          });
        }

        // Initialize gapi client
        await new Promise((resolve, reject) => {
          window.gapi.load("client:auth2", {
            callback: resolve,
            onerror: reject,
          });
        });

        await window.gapi.client.init({
          apiKey: config.apiKey,
          clientId: config.clientId,
          discoveryDocs: config.discoveryDocs,
          scope: config.scope,
        });

        const authInstance = window.gapi.auth2.getAuthInstance();
        setIsAuthenticated(authInstance.isSignedIn.get());

        authInstance.isSignedIn.listen(setIsAuthenticated);
      } catch (err) {
        console.error("Error initializing gapi: ", err);
      }
    };

    initializeGapi();
  }, []);

  const handleSignIn = async () => {
    try {
      await apiCalendar.handleAuthClick();
      setIsAuthenticated(true);
    } catch (err) {
      console.error("Error signing in: ", err);
    }
  };

  const handleSignOut = async () => {
    try {
      await apiCalendar.handleSignoutClick();
      setIsAuthenticated(false);
    } catch (err) {
      console.error("Error signing out: ", err);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await window.gapi.client.calendar.events.list({
        calendarId: "primary",
        maxResults: 10,
        singleEvents: true,
        orderBy: "startTime",
      });
      setEvents(response.result.items);
    } catch (err) {
      console.error("Error fetching events: ", err);
    }
  };

  const createEvent = async () => {
    try {
      const event = {
        summary: "Sample Event",
        location: "800 Howard St., San Francisco, CA 94103",
        description: "A chance to hear more about Google's developer products.",
        start: {
          dateTime: "2025-01-15T09:00:00-07:00",
          timeZone: "America/Los_Angeles",
        },
        end: {
          dateTime: "2025-01-15T17:00:00-07:00",
          timeZone: "America/Los_Angeles",
        },
        attendees: [
          { email: "lpage@example.com" },
          { email: "sbrin@example.com" },
        ],
      };

      const response = await window.gapi.client.calendar.events.insert({
        calendarId: "primary",
        resource: event,
      });

      console.log("Event created: ", response.result);
      fetchEvents(); // Refresh events
    } catch (err) {
      console.error("Error creating event: ", err);
    }
  };

  return (
    <div className="bg-green-100 p-4 rounded shadow-md">
      <h2 className="text-lg font-bold mb-2">Event Calendar</h2>
      {isAuthenticated ? (
        <>
          <button onClick={handleSignOut} className="bg-red-500 text-white px-4 py-2 rounded">
            Sign Out
          </button>
          <button onClick={fetchEvents} className="bg-blue-500 text-white px-4 py-2 rounded ml-2">
            Fetch Events
          </button>
          <button onClick={createEvent} className="bg-green-500 text-white px-4 py-2 rounded ml-2">
            Create Event
          </button>
          <ul className="mt-4">
            {events.map((event) => (
              <li key={event.id}>
                <strong>{event.summary}</strong> - {event.start.dateTime || event.start.date}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <button onClick={handleSignIn} className="bg-green-500 text-white px-4 py-2 rounded">
          Sign In with Google
        </button>
      )}
    </div>
  );
};

export default EventCalendar;
