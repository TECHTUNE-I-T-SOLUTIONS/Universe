import React from "react";
import { Alert } from "@nextui-org/alert";

const Exams = ({
  examSchedule,
  addExam,
  editExam,
  removeExam,
  newExam,
  handleExamChange,
  isEditing,
}) => {
  return (
    <div className="exam-schedule mt-8 bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Exam Schedule</h2>
      <Alert color="info" isVisible={examSchedule.length > 0}>
        Exam added successfully!
      </Alert>
      <div className="add-exam grid grid-cols-1 sm:grid-cols-4 gap-4">
        <input
          type="text"
          name="title"
          placeholder="Exam Title"
          value={newExam.title}
          onChange={handleExamChange}
          className="border rounded px-2 py-2 w-full"
        />
        <input
          type="datetime-local"
          name="date"
          value={newExam.date}
          onChange={handleExamChange}
          className="border rounded px-2 py-2 w-full"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={newExam.location}
          onChange={handleExamChange}
          className="border rounded px-2 py-2 w-full"
        />
      <button
        onClick={() =>
          addExam({ title: newExam.title, date: newExam.date, location: newExam.location })
        }
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
      >
        {isEditing ? "Update Exam" : "Add Exam"}
      </button>
      </div>
      {examSchedule.length > 0 ? (
        <ul className="mt-4 space-y-4">
          {examSchedule.map((exam, index) => (
            <li
              key={index}
              className="border p-4 rounded flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
            >
              <div>
                <strong>{exam.title}</strong>
                <p>Date: {exam.date}</p>
                <p>Location: {exam.location}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => editExam(index)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => removeExam(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 mt-4">No exams scheduled yet.</p>
      )}
    </div>
  );
};

export default Exams;
