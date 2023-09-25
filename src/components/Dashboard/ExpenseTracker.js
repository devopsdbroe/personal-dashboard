import React, { useState } from "react";
import "./ExpenseTracker.css";

const ExpenseTracker = () => {
	const [expenses, setExpenses] = useState([]);
	const [newExpense, setNewExpense] = useState({ description: "", amount: "" });

	const addExpense = (e) => {
		e.preventDefault();
		if (newExpense.description.trim() === "" || newExpense.amount.trim() === "")
			return;
		setExpenses([...expenses, newExpense]);
		setNewExpense({ description: "", amount: "" });
	};

	return (
		<div className='expense-tracker'>
			<h2>Expense Tracking</h2>

			{/* Form for submitting a new expense */}
			<form onSubmit={addExpense}>
				<input
					type='text'
					placeholder='Description'
					value={newExpense.description}
					onChange={(e) =>
						setNewExpense({ ...newExpense, description: e.target.value })
					}
				/>
				<input
					type='text'
					placeholder='Amount'
					value={newExpense.amount}
					onChange={(e) =>
						setNewExpense({ ...newExpense, amount: e.target.value })
					}
				/>
				<button type='submit'>Add Expense</button>
			</form>

			{/* List of expenses */}
			<ul>
				{expenses.map((expense, index) => (
					<li key={index}>
						{expense.description}: ${expense.amount}
					</li>
				))}
			</ul>
		</div>
	);
};

export default ExpenseTracker;
