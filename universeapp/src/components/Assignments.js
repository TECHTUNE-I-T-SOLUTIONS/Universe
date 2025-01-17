import React from "react";
import { Alert } from "@nextui-org/alert";

const Assignments = ({
  assignments,
  addAssignment,
  editAssignment,
  removeAssignment,
  newAssignment,
  handleAssignmentChange,
  isEditing,
}) => {
  return (
    <div className="assignments bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Assignments</h2>
      <Alert color="success" isVisible={assignments.length > 0}>
        Successfully added an assignment!
      </Alert>
      <div className="add-assignment grid grid-cols-1 sm:grid-cols-4 gap-4">
        <input
          type="text"
          name="title"
          placeholder="Assignment Title"
          value={newAssignment.title}
          onChange={handleAssignmentChange}
          className="border rounded px-2 py-2 w-full"
        />
        <input
          type="date"
          name="deadline"
          value={newAssignment.deadline}
          onChange={handleAssignmentChange}
          className="border rounded px-2 py-2 w-full"
        />
        <input
          type="number"
          name="grade"
          placeholder="Grade"
          value={newAssignment.grade}
          onChange={handleAssignmentChange}
          className="border rounded px-2 py-2 w-full"
        />
      <button
        onClick={() =>
          addAssignment({ title: newAssignment.title, deadline: newAssignment.deadline, grade: newAssignment.grade })
        }
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
      >
        {isEditing ? "Update Assignment" : "Add Assignment"}
      </button>
      </div>
      {assignments.length > 0 ? (
        <ul className="mt-4 space-y-4">
          {assignments.map((assignment, index) => (
            <li
              key={index}
              className="border p-4 rounded flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
            >
              <div>
                <strong>{assignment.title}</strong>
                <p>Deadline: {assignment.deadline}</p>
                <p>Grade: {assignment.grade}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => editAssignment(index)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => removeAssignment(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 mt-4">No assignments added yet.</p>
      )}
    </div>
  );
};

export default Assignments;
