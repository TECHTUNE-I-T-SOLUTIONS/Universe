import React, { useState } from "react";
import Assignments from "./Assignments";
import Exams from "./Exams";
import PerformanceAnalysis from "./PerformanceAnalysis";

const Dashboard = () => {
  const [assignments, setAssignments] = useState([]);
  const [examSchedule, setExamSchedule] = useState([]);

  const addAssignment = (newAssignment) => {
    setAssignments([...assignments, newAssignment]);
  };

  const addExam = (newExam) => {
    setExamSchedule([...examSchedule, newExam]);
  };

  return (
    <div>
      <Assignments
        assignments={assignments}
        addAssignment={(assignment) =>
          addAssignment({ ...assignment, grade: parseInt(assignment.grade, 10) })
        }
        editAssignment={() => {}}
        removeAssignment={() => {}}
        newAssignment={{ title: "", deadline: "", grade: 0 }}
        handleAssignmentChange={() => {}}
        isEditing={false}
      />
      <Exams
        examSchedule={examSchedule}
        addExam={addExam}
        editExam={() => {}}
        removeExam={() => {}}
        newExam={{ title: "", date: "", location: "" }}
        handleExamChange={() => {}}
        isEditing={false}
      />
      <PerformanceAnalysis assignments={assignments} examSchedule={examSchedule} />
    </div>
  );
};

export default Dashboard;
