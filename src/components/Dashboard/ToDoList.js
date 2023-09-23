import React, { useState } from "react";

const ToDoList = () => {
	const [input, setInput] = useState("");
	const [todos, setTodos] = useState([]);
	const [filter, setFilter] = useState("");

	const addTodo = () => {
		if (input.trim() === "") return;
		setTodos([...todos, { text: input, completed: false }]);
		setInput("");
	};

	const toggleTodo = (index) => {
		const newTodos = [...todos];
		newTodos[index].completed = !newTodos[index].completed;
		setTodos(newTodos);
	};

	const removeTodo = (index) => {
		const newTodos = todos.filter((_, i) => i !== index);
		setTodos(newTodos);
	};

	return (
		<div>
			<input
				type='text'
				placeholder='Search'
				value={filter}
				onChange={(e) => setFilter(e.target.value)}
			/>
			<input
				type='text'
				placeholder='Add Items Here'
				value={input}
				onChange={(e) => setInput(e.target.value)}
			/>
			<button onClick={addTodo}>Add</button>
			<ul>
				{todos
					.filter((todo) => todo.text.includes(filter))
					.map((filteredTodo, index) => (
						<li key={index}>
							<span
								style={{
									textDecoration: filteredTodo.completed
										? "line-through"
										: "none",
								}}
							>
								{filteredTodo.text}
								{""}
							</span>
							<button onClick={() => toggleTodo(index)}>Toggle</button>
							<button onClick={() => removeTodo(index)}>Remove</button>
						</li>
					))}
			</ul>
		</div>
	);
};

export default ToDoList;
