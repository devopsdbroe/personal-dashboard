import React, { useState } from "react";

const ToDoList = () => {
	const [input, setInput] = useState("");
	const [todos, setTodos] = useState([]);

	const addTodo = () => {
		if (input.trim() === "") return;
		setTodos([...todos, input]);
		setInput("");
	};

	const removeTodo = (input) => {
		const newTodos = todos.filter((_, i) => i !== index);
		setTodos(newTodos);
	};

	return (
		<div>
			<input
				type="text"
				value={input}
				onChange={(e) => setInput(e.target.value)}
			/>
			<button onClick={addTodo}>Add</button>
			<ul>
				{todos.map((todo, index) => (
					<li key={index}>
						{todo}
						<button onClick={() => removeTodo(index)}>Remove</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ToDoList;
