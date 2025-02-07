import React, { useState, useEffect } from "react";
import CloseIcon from "../../icons/close.png";

const EventManagement = ({ setActivePage }) => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({ title: "", date: "", status: "Upcoming" });

  const formatDate = () => {
    return new Date().toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  };

  useEffect(() => {
    // Simulated event fetching
    setEvents([
      { id: 1, title: "Tech Conference 2024", date: "2024-06-15", status: "Upcoming" },
      { id: 2, title: "Student Hackathon", date: "2024-07-10", status: "Upcoming" },
      { id: 3, title: "AI Workshop", date: "2024-05-20", status: "Completed" },
    ]);
  }, []);

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteEvent = (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter(event => event.id !== id));
    }
  };

  const openEditModal = (event) => {
    setSelectedEvent({ ...event });
    setShowEditModal(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setEvents(events.map(event => (event.id === selectedEvent.id ? selectedEvent : event)));
    setShowEditModal(false);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    setEvents([...events, { id: events.length + 1, ...newEvent }]);
    setShowAddModal(false);
    setNewEvent({ title: "", date: "", status: "Upcoming" });
  };

  return (
    <div className="p-0 bg-white rounded-lg shadow-md">
      {/* Header */}
      <header className="flex justify-between items-center bg-blue-400 p-2 rounded mb-6 fixed top-0 w-full z-30">
        <div>
          <h1 className="text-xl font-bold text-black">Event Management</h1>
          <p className="text-sm text-white">Today is: {formatDate()}</p>
        </div>
      </header>

      {/* Close Button */}
      <button className="fixed top-5 right-4 w-5 h-5 bg-transparent rounded-full z-30" onClick={() => setActivePage("AdminMainContent")}>
        <img src={CloseIcon} alt="Close" className="w-full h-full" />
      </button>

      <div className="p-4">  
        {/* Add Event Button */}
        <button className="px-4 py-2 bg-green-500 text-white rounded mb-4" onClick={() => setShowAddModal(true)}>
          Add Event
        </button>

        {/* Search Input */}
        <input type="text" placeholder="Search events..." className="w-full p-2 border rounded mb-4" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

        {/* Events Table */}
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Title</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <tr key={event.id} className="border">
                  <td className="border p-2">{event.id}</td>
                  <td className="border p-2">{event.title}</td>
                  <td className="border p-2">{event.date}</td>
                  <td className="border p-2 text-blue-600">{event.status}</td>
                  <td className="border p-2">
                    <button className="px-2 py-1 bg-blue-500 text-white rounded mr-2" onClick={() => openEditModal(event)}>Edit</button>
                    <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => deleteEvent(event.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4">No events found</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Add Event Modal */}
        {showAddModal && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Add Event</h3>
              <form onSubmit={handleAddSubmit}>
                <input type="text" className="w-full p-2 border rounded mb-2" placeholder="Title" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                <input type="date" className="w-full p-2 border rounded mb-2" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} />
                <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded mr-2">Add</button>
                <button type="button" className="px-4 py-2 bg-gray-300 rounded" onClick={() => setShowAddModal(false)}>Cancel</button>
              </form>
            </div>
          </div>
        )}

        {/* Edit Event Modal */}
        {showEditModal && selectedEvent && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Edit Event</h3>
              <form onSubmit={handleEditSubmit}>
                <input type="text" className="w-full p-2 border rounded mb-2" value={selectedEvent.title} onChange={(e) => setSelectedEvent({ ...selectedEvent, title: e.target.value })} />
                <input type="date" className="w-full p-2 border rounded mb-2" value={selectedEvent.date} onChange={(e) => setSelectedEvent({ ...selectedEvent, date: e.target.value })} />
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded mr-2">Save</button>
                <button type="button" className="px-4 py-2 bg-gray-300 rounded" onClick={() => setShowEditModal(false)}>Cancel</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventManagement;
