import React, { useState, useEffect } from "react";
import CloseIcon from "../../icons/close.png";

// Budget Section Component
const BudgetSection = ({ budget, onEditBudget }) => {
  const [newBudget, setNewBudget] = useState("");

  const handleEdit = () => {
    if (newBudget.trim()) {
      onEditBudget(Number(newBudget));
      setNewBudget("");
    }
  };

  return (
    <div className="p-4 bg-blue-100 rounded shadow">
      <h2 className="text-lg font-bold">Budget</h2>
      <p className="mt-2 text-gray-700">Current Budget: ₦{budget}</p>
      <div className="flex items-center mt-2">
        <input
          type="number"
          value={newBudget}
          onChange={(e) => setNewBudget(e.target.value)}
          placeholder="Enter new budget"
          className="border px-2 py-1 rounded w-32 mr-2"
        />
        <button
          onClick={handleEdit}
          className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
        >
          Add New Budget
        </button>
      </div>
    </div>
  );
};

// Expense Section Component
const ExpenseSection = ({ expenses, onAddExpense, onRemoveExpense }) => {
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");

  const handleAdd = () => {
    if (name.trim() && cost.trim()) {
      onAddExpense({ name, cost: Number(cost) });
      setName("");
      setCost("");
    }
  };

  return (
    <div className="p-4 bg-yellow-100 rounded shadow mt-4">
      <h2 className="text-lg font-bold">Expenses</h2>
      <div className="flex items-center mt-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Expense Name"
          className="border px-2 py-1 rounded w-32 mr-2"
        />
        <input
          type="number"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          placeholder="Cost"
          className="border px-2 py-1 rounded w-24 mr-2"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
        >
          Add Expense
        </button>
      </div>
      <ul className="mt-4">
        {expenses.map((expense, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-white p-2 rounded mb-2 shadow"
          >
            <span>{expense.name}</span>
            <span>₦{expense.cost}</span>
            <button
              onClick={() => onRemoveExpense(index)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Main Financial Management Component
const FinancialManagement = ({ onClose }) => {
  const [budget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [currentDate, setCurrentDate] = useState(""); // Initialize currentDate state

  useEffect(() => {
    // Set the current date
    const today = new Date();
    const dateString = today.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(dateString);
  }, []); // Run once when the component mounts

  const totalSpent = expenses.reduce((sum, expense) => sum + expense.cost, 0);
  const remainingBudget = budget - totalSpent;

  const handleEditBudget = (newBudget) => setBudget(newBudget);
  const handleAddExpense = (expense) =>
    setExpenses((prevExpenses) => [...prevExpenses, expense]);
  const handleRemoveExpense = (index) =>
    setExpenses((prevExpenses) =>
      prevExpenses.filter((_, expenseIndex) => expenseIndex !== index)
    );

  return (
    <div className="flex flex-col h-full w-full bg-white p-0">
      <header className="flex flex-row bg-blue-400 w-full p-2 rounded mb-6 fixed top-0 z-10 overflow-y-auto">
        <div className="w-full">
          <h1 className="text-xl font-bold text-black">FINANCIAL MANAGEMENT</h1>
          <p className="text-sm text-white">Today is: {currentDate}</p>
        </div>
      </header>

      <div className="mt-1 p-2 space-y-6">
        <div className="flex justify-end">
          <button className="w-5 h-5 bg-transparent flex items-center justify-center">
            <img
              src={CloseIcon}
              alt="Close"
              className="w-full h-full"
              onClick={onClose}
            />
          </button>
        </div>

        <BudgetSection budget={budget} onEditBudget={handleEditBudget} />
        <ExpenseSection
          expenses={expenses}
          onAddExpense={handleAddExpense}
          onRemoveExpense={handleRemoveExpense}
        />
        <div className="p-4 bg-gray-100 rounded shadow">
          <h2 className="text-lg font-bold">Summary</h2>
          <p className="mt-2 text-gray-700">Total Spent: ₦{totalSpent}</p>
          <p className="text-gray-700">
            Remaining Budget: ₦{remainingBudget < 0 ? 0 : remainingBudget}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinancialManagement;