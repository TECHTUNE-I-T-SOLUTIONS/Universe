import React, { useState, useEffect } from "react";
import CloseIcon from "../../icons/close.png";

const UserManagement = ({ setActivePage }) => {
  // State to store users
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5; // Pagination limit


  const formatDate = () => {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    return new Date().toLocaleDateString(undefined, options);
  };

  // Fetch users from API or local storage
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Replace this with an actual API call
        const response = [
          { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
          { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor", status: "Inactive" },
          { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "User", status: "Active" },
          { id: 4, name: "Sarah Lee", email: "sarah@example.com", role: "Admin", status: "Inactive" },
          { id: 5, name: "Robert Brown", email: "robert@example.com", role: "User", status: "Active" },
          { id: 6, name: "Emily White", email: "emily@example.com", role: "Editor", status: "Active" },
        ];
        setUsers(response);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Filter users based on search
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Function to toggle user status
  const toggleUserStatus = (id) => {
    setUsers(users.map(user => user.id === id ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" } : user));
  };

  // Function to delete a user
  const deleteUser = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  // Open edit modal
  const openEditModal = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  // Handle user edit submission
  const handleEditSubmit = (e) => {
    e.preventDefault();
    setUsers(users.map(user => user.id === selectedUser.id ? selectedUser : user));
    setShowEditModal(false);
  };

  return (
    <div className="p-0 bg-white rounded-lg shadow-md">
      {/* Header */}
        <header className="flex justify-between items-center bg-blue-400 p-2 transtition-all rounded mb-6 fixed top-0 w-full z-30">
          <div>
            <h1 className="text-xl font-bold text-black">User Management</h1>
            <p className="text-sm text-white">Today is: {formatDate()}</p>
          </div>
        </header>

      {/* Close Button */}
      <button
        className="absolute top-5 right-10 w-5 h-5 bg-transparent rounded-full flex items-center justify-center z-30"
        onClick={() => setActivePage("AdminMainContent")}
      >
        <img src={CloseIcon} alt="Close" className="w-full h-full" />
      </button>

      <div className="p-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search users..."
          className="w-full p-2 border rounded mb-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* User Table */}
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr key={user.id} className="border">
                  <td className="border p-2">{user.id}</td>
                  <td className="border p-2">{user.name}</td>
                  <td className="border p-2">{user.email}</td>
                  <td className="border p-2">{user.role}</td>
                  <td className={`border p-2 ${user.status === "Active" ? "text-green-600" : "text-red-600"}`}>
                    {user.status}
                  </td>
                  <td className="border p-2">
                    <button
                      className="px-2 py-1 bg-blue-500 text-white rounded mr-2"
                      onClick={() => openEditModal(user)}
                    >
                      Edit
                    </button>
                    <button
                      className={`px-2 py-1 ${user.status === "Active" ? "bg-yellow-500" : "bg-green-500"} text-white rounded mr-2`}
                      onClick={() => toggleUserStatus(user.id)}
                    >
                      {user.status === "Active" ? "Deactivate" : "Activate"}
                    </button>
                    <button
                      className="px-2 py-1 bg-red-500 text-white rounded"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4">No users found</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="mt-4 flex justify-center">
          {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }, (_, i) => (
            <button
              key={i}
              className={`px-3 py-1 mx-1 border ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Edit Modal */}
        {showEditModal && selectedUser && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Edit User</h3>
              <form onSubmit={handleEditSubmit}>
                <input
                  type="text"
                  className="w-full p-2 border rounded mb-2"
                  value={selectedUser.name}
                  onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                />
                <input
                  type="email"
                  className="w-full p-2 border rounded mb-2"
                  value={selectedUser.email}
                  onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                />
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

export default UserManagement;
