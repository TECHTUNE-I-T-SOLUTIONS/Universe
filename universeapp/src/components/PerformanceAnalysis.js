import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PerformanceAnalysis = ({ assignments = [], examSchedule = [] }) => {  // Default empty arrays
  // Check if the props are not undefined
  const assignmentGrades = assignments.map((assignment) => assignment.grade);
  const examLabels = examSchedule.map((exam) => exam.title);

  const data = {
    labels: ["Assignments", ...examLabels],
    datasets: [
      {
        label: "Performance",
        data: [
          assignmentGrades.reduce((a, b) => a + b, 0) / assignments.length || 0,
          ...examLabels.map(() => Math.floor(Math.random() * 100)), // Placeholder for exam grades
        ],
        backgroundColor: ["#4CAF50", "#FFC107", "#2196F3", "#FF5722"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="performance-analysis mt-8 p-4 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Performance Analysis</h2>
      <div style={{ height: "300px" }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default PerformanceAnalysis;
