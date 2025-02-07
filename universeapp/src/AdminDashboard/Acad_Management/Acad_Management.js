import React, { useState, useEffect } from "react";
import CloseIcon from "../../icons/close.png";

const AcadManagement = ({ setActivePage }) => {
  // State for student data
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  const formatDate = () => {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    return new Date().toLocaleDateString(undefined, options);
  };


  // Fetch student records (Mock API Data)
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = [
          { id: 1, name: "Alice Johnson", grade: "A", department: "Science", status: "Active" },
          { id: 2, name: "Bob Smith", grade: "B", department: "Arts", status: "Inactive" },
          { id: 3, name: "Charlie Brown", grade: "C", department: "Engineering", status: "Active" },
          { id: 4, name: "Diana Prince", grade: "A", department: "Medical", status: "Active" },
          { id: 5, name: "Ethan Hunt", grade: "B", department: "Law", status: "Inactive" },
          { id: 6, name: "Fiona Adams", grade: "A", department: "Science", status: "Active" },
        ];
        setStudents(response);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);

  // Search functionality
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  // Toggle student status (Active/Inactive)
  const toggleStudentStatus = (id) => {
    setStudents(
      students.map((student) =>
        student.id === id ? { ...student, status: student.status === "Active" ? "Inactive" : "Active" } : student
      )
    );
  };

  // Delete a student
  const deleteStudent = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to remove this student?");
    if (confirmDelete) {
      setStudents(students.filter((student) => student.id !== id));
    }
  };

  // Open edit modal
  const openEditModal = (student) => {
    setSelectedStudent(student);
    setShowEditModal(true);
  };

  // Handle edit form submission
  const handleEditSubmit = (e) => {
    e.preventDefault();
    setStudents(
      students.map((student) => (student.id === selectedStudent.id ? selectedStudent : student))
    );
    setShowEditModal(false);
  };

  return (
    <div className="p-0 bg-white rounded-lg shadow-md">
      {/* Header */}
      <header className="flex justify-between items-center bg-blue-400 p-2 rounded mb-6 fixed top-0 w-full z-30">
        <div>
          <h1 className="text-xl font-bold text-black">Academic Management</h1>
          <p className="text-sm text-white">Today is: {formatDate()}</p>
        </div>
      </header>

      {/* Close Button */}
      <button
        className="fixed top-5 right-10 w-5 h-5 bg-transparent rounded-full flex items-center justify-center z-30"
        onClick={() => setActivePage("AdminMainContent")}
      >
        <img src={CloseIcon} alt="Close" className="w-full h-full" />
      </button>

      <div className="p-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search students..."
          className="w-full p-2 border rounded mb-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Student Table */}
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Grade</th>
              <th className="border p-2">Department</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.length > 0 ? (
              currentStudents.map((student) => (
                <tr key={student.id} className="border">
                  <td className="border p-2">{student.id}</td>
                  <td className="border p-2">{student.name}</td>
                  <td className="border p-2">{student.grade}</td>
                  <td className="border p-2">{student.department}</td>
                  <td className={`border p-2 ${student.status === "Active" ? "text-green-600" : "text-red-600"}`}>
                    {student.status}
                  </td>
                  <td className="border p-2">
                    <button
                      className="px-2 py-1 bg-blue-500 text-white rounded mr-2"
                      onClick={() => openEditModal(student)}
                    >
                      Edit
                    </button>
                    <button
                      className={`px-2 py-1 ${student.status === "Active" ? "bg-yellow-500" : "bg-green-500"} text-white rounded mr-2`}
                      onClick={() => toggleStudentStatus(student.id)}
                    >
                      {student.status === "Active" ? "Deactivate" : "Activate"}
                    </button>
                    <button
                      className="px-2 py-1 bg-red-500 text-white rounded"
                      onClick={() => deleteStudent(student.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4">No students found</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="mt-4 flex justify-center">
          {Array.from({ length: Math.ceil(filteredStudents.length / studentsPerPage) }, (_, i) => (
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
        {showEditModal && selectedStudent && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Edit Student</h3>
              <form onSubmit={handleEditSubmit}>
                <input
                  type="text"
                  className="w-full p-2 border rounded mb-2"
                  value={selectedStudent.name}
                  onChange={(e) => setSelectedStudent({ ...selectedStudent, name: e.target.value })}
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

export default AcadManagement;
