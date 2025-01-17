import React, { useState } from "react";
import Header from "../Header";
import Assignments from "../Assignments";
import Exams from "../Exams";
import VolunteerOpportunities from "../VolunteerOpportunities";
import PerformanceAnalysis from "../PerformanceAnalysis";

const AcademicProgress = ({ onClose }) => {
  const [assignments, setAssignments] = useState([]);
  const [examSchedule, setExamSchedule] = useState([]);
  const [newAssignment, setNewAssignment] = useState({ title: "", deadline: "", grade: "" });
  const [newExam, setNewExam] = useState({ title: "", date: "", location: "" });
  const [isEditing, setIsEditing] = useState(false);

  const handleAssignmentChange = (e) =>
    setNewAssignment({ ...newAssignment, [e.target.name]: e.target.value });
  const handleExamChange = (e) =>
    setNewExam({ ...newExam, [e.target.name]: e.target.value });

  const addAssignment = () => {
    if (newAssignment.title && newAssignment.deadline && newAssignment.grade) {
      setAssignments([...assignments, newAssignment]);
      setNewAssignment({ title: "", deadline: "", grade: "" });
    }
  };

  const editAssignment = (index) => {
    setNewAssignment(assignments[index]);
    setIsEditing(true);
  };

  const removeAssignment = (index) =>
    setAssignments(assignments.filter((_, i) => i !== index));

  const addExam = () => {
    if (newExam.title && newExam.date && newExam.location) {
      setExamSchedule([...examSchedule, newExam]);
      setNewExam({ title: "", date: "", location: "" });
    }
  };

  const editExam = (index) => {
    setNewExam(examSchedule[index]);
    setIsEditing(true);
  };

  const removeExam = (index) =>
    setExamSchedule(examSchedule.filter((_, i) => i !== index));

  return (
    <div className="academic-progress h-full w-full p-4 sm:p-6 bg-gray-100 min-h-screen relative">
      {/* Close Button */}
      <button
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 absolute top-4 right-4 z-10"
        onClick={onClose}
      >
        Close
      </button>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="space-y-8">
        <Assignments
          assignments={assignments}
          addAssignment={addAssignment}
          editAssignment={editAssignment}
          removeAssignment={removeAssignment}
          newAssignment={newAssignment}
          handleAssignmentChange={handleAssignmentChange}
          isEditing={isEditing}
        />
        <Exams
          examSchedule={examSchedule}
          addExam={addExam}
          editExam={editExam}
          removeExam={removeExam}
          newExam={newExam}
          handleExamChange={handleExamChange}
          isEditing={isEditing}
        />
        <PerformanceAnalysis assignments={assignments} examSchedule={examSchedule} />
        <VolunteerOpportunities />
      </div>
    </div>
  );
};

export default AcademicProgress;
