import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./ToDoList.css";

const ToDoList = () => {
	const [input, setInput] = useState("");
	const [todos, setTodos] = useState([]);
	const [filter, setFilter] = useState("");
	const [viewFilter, setViewFilter] = useState("All"); // Possible values: All, Completed, Pending

	useEffect(() => {
		const storedTodos = localStorage.getItem("todos");
		if (storedTodos) {
			setTodos(JSON.parse(storedTodos));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	const addTodo = (e) => {
		e.preventDefault();
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

	const handleDragEnd = (result) => {
		if (!result.destination) return;
		const reorderedTodos = [...todos];
		const [removed] = reorderedTodos.splice(result.source.index, 1);
		reorderedTodos.splice(result.destination.index, 0, removed);
		setTodos(reorderedTodos);
	};

	return (
		<div className='todo-container'>
			<div>
				<label>Filter: </label>
				<select
					value={viewFilter}
					onChange={(e) => setViewFilter(e.target.value)}
				>
					<option value='All'>All</option>
					<option value='Completed'>Completed</option>
					<option value='Pending'>Pending</option>
				</select>
			</div>
			<input
				type='text'
				placeholder='Search'
				value={filter}
				onChange={(e) => setFilter(e.target.value)}
			/>
			<form onSubmit={addTodo}>
				<input
					type='text'
					placeholder='Add Items Here'
					value={input}
					onChange={(e) => setInput(e.target.value)}
				/>
				<button type='submit'>Add</button>
			</form>
			<DragDropContext onDragEnd={handleDragEnd}>
				<Droppable droppableId='todoList'>
					{(provided) => (
						<ul ref={provided.innerRef} {...provided.droppableProps}>
							{todos
								.filter((todo) => {
									if (viewFilter === "Completed") return todo.completed;
									if (viewFilter === "Pending") return !todo.completed;
									return true; // for "All"
								})
								.filter((todo) => todo.text.includes(filter))
								.map((filteredTodo, index) => (
									<Draggable
										key={index}
										draggableId={String(index)}
										index={index}
									>
										{(provided) => (
											<li
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
											>
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
												<button onClick={() => toggleTodo(index)}>
													Toggle
												</button>
												<button onClick={() => removeTodo(index)}>
													Remove
												</button>
											</li>
										)}
									</Draggable>
								))}
							{provided.placeholder}
						</ul>
					)}
				</Droppable>
			</DragDropContext>
		</div>
	);
};

export default ToDoList;
