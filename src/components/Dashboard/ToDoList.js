import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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

	const handleDragEnd = (result) => {
		if (!result.destination) return;
		const reorderedTodos = [...todos];
		const [removed] = reorderedTodos.splice(result.source.index, 1);
		reorderedTodos.splice(result.destination.index, 0, removed);
		setTodos(reorderedTodos);
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
			<DragDropContext onDragEnd={handleDragEnd}>
				<Droppable droppableId='todoList'>
					{(provided) => (
						<ul ref={provided.innerRef} {...provided.droppableProps}>
							{todos
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
