import React, { useState } from "react";
import Assignments from "../Assignments";
import Exams from "../Exams";
import VolunteerOpportunities from "../VolunteerOpportunities";
import PerformanceAnalysis from "../PerformanceAnalysis";
import { OPENAI_API_KEY } from "../../apiKeys"; // Import your API key
import { formatDate } from "../../utils/formatDate";

const AcademicProgress = ({ onClose }) => {
  // Existing states for assignments/exams
  const [assignments, setAssignments] = useState([]);
  const [examSchedule, setExamSchedule] = useState([]);
  const [newAssignment, setNewAssignment] = useState({ title: "", deadline: "", grade: "" });
  const [newExam, setNewExam] = useState({ title: "", date: "", location: "" });
  const [isEditing, setIsEditing] = useState(false);

  // -------------------------
  // Document Summarization States
  // -------------------------
  const [documentSummary, setDocumentSummary] = useState("");
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [uploadedText, setUploadedText] = useState(""); // For text input instead of file upload

  // -------------------------
  // Handlers for assignments/exams (unchanged)
  // -------------------------
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

  // -------------------------
  // Document Summarization Functions
  // -------------------------
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setIsSummarizing(true);

    let extractedText = "";

    // Placeholder logic: in a production app, use libraries like pdfjs-dist or mammoth
    if (file.type === "application/pdf") {
      extractedText = "Extracted text from PDF (placeholder)...";
    } else if (
      file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.type === "application/msword"
    ) {
      extractedText = "Extracted text from Word document (placeholder)...";
    } else {
      extractedText = await file.text();
    }

    // Use the extracted text for summarization
    try {
      const summary = await getDocumentSummary(extractedText);
      setDocumentSummary(summary);
    } catch (error) {
      setDocumentSummary("Error summarizing document: " + error.message);
      console.error("Error in summarization:", error);
    }
    setIsSummarizing(false);
  };

  const handleTextSummarization = async () => {
    if (!uploadedText.trim()) return;
    setIsSummarizing(true);
    try {
      const summary = await getDocumentSummary(uploadedText);
      setDocumentSummary(summary);
    } catch (error) {
      setDocumentSummary("Error summarizing text: " + error.message);
      console.error("Error in summarization:", error);
    }
    setIsSummarizing(false);
  };

  const getDocumentSummary = async (text) => {
    if (!text.trim()) throw new Error("No text provided for summarization.");
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that extracts key bullet-point summaries from documents."
          },
          {
            role: "user",
            content: `Extract the key bullet-point summary from the following document:\n\n${text}`
          }
        ],
        max_tokens: 150,
        temperature: 0.5,
      }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "OpenAI API request failed");
    }
  
    const data = await response.json();
    // The Chat API returns an array of choices; each choice has a message object.
    return data.choices[0].message.content.trim();
  };
  
  return (
    <div className="academic-progress h-full w-full p-0 sm:p-6 bg-gray-100 min-h-screen relative">
      <header className="flex justify-between items-center bg-blue-400 p-2 rounded mb-6 fixed top-0 w-full z-10">
        <div>
          <h1 className="text-xl font-bold text-black">ACADEMIC PROGRESS</h1>
          <p className="text-sm text-white">Today is: {formatDate()}</p>
        </div>
      </header>

      {/* Close Button */}
      <button
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 absolute top-4 right-4 z-10"
        onClick={onClose}
      >
        Close
      </button>

      {/* Main Content (Assignments, Exams, etc.) */}
      <div className="space-y-8 pt-20">
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

        {/* Document Summarizer Section with Chat-like Design */}
        <div className="mt-8 p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Document Summarizer</h2>

          {/* Chat-like Container */}
          <div className="border border-gray-200 rounded-lg p-4 mb-4 h-64 overflow-y-auto bg-gray-50">
            {documentSummary ? (
              <div className="flex flex-col space-y-2">
                {/* Model's Reply */}
                <div className="bg-blue-100 text-blue-900 p-3 rounded-lg max-w-md self-start">
                  {documentSummary.split("\n").map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No summary available yet.</p>
            )}
          </div>

          {/* Input & File Upload Controls */}
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Paste your notes here..."
              className="flex-1 p-2 border rounded-l-lg focus:outline-none"
              value={uploadedText}
              onChange={(e) => setUploadedText(e.target.value)}
            />
            <label
              htmlFor="fileUpload"
              className="p-2 bg-blue-500 text-white rounded-r-lg cursor-pointer"
              title="Upload Document"
            >
              +
            </label>
            <input
              id="fileUpload"
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={handleFileUpload}
            />
            <button
              onClick={handleTextSummarization}
              className="ml-2 p-2 bg-green-500 text-white rounded-lg"
            >
              Summarize
            </button>
          </div>
          {isSummarizing && <p className="mt-2 text-gray-600">Summarizing document...</p>}
        </div>
      </div>
    </div>
  );
};

export default AcademicProgress;
