import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./ChatRoom.css";

const socket = io("http://localhost:3001");

const ChatRoom = ({ userEmail }) => {
	const [message, setMessage] = useState(""); // State for the current message input
	const [messages, setMessages] = useState([]); // State for storing messages

	// Listening to 'chat message' event from the server
	useEffect(() => {
		socket.on("chat message", (msg) => {
			setMessages((prevMessages) => [...prevMessages, msg]);
		});

		return () => {
			socket.off("chat message");
		};
	}, []);

	// Function to send a message
	const sendMessage = (e) => {
		e.preventDefault();
		socket.emit("chat message", { content: message, email: userEmail });
		setMessage("");
	};

	return (
		<div className='chat-room'>
			<h2>Chat Room</h2>
			<div>
				<form onSubmit={sendMessage}>
					<input
						type='text'
						placeholder='Your message'
						value={message}
						onChange={(e) => setMessage(e.target.value)}
					/>
					<button type='submit'>Send</button>
				</form>
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
