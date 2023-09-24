import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

const ChatRoom = ({ userEmail }) => {
	const [message, setMessage] = useState(""); // State for the current message input
	const [messages, setMessages] = useState([]); // State for storing messages

	// Listening to 'chat message' event from the server
	useEffect(() => {
		socket.on("chat message", (msg) => {
			setMessages([...messages, msg]);
		});

		return () => {
			socket.off("chat message");
		};
	}, [messages]);

	// Function to send a message
	const sendMessage = () => {
		socket.emit("chat message", { content: message, email: userEmail });
		setMessage("");
	};

	return (
		<div>
			<h2>Chat Room</h2>
			<div>
				<input
					type='text'
					placeholder='Your message'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button onClick={sendMessage}>Send</button>
			</div>
			<ul>
				{messages.map((msg, index) => (
					<li key={index}>
						<strong>{msg.email}:</strong> {msg.content}
					</li>
				))}
			</ul>
		</div>
	);
};

export default ChatRoom;
