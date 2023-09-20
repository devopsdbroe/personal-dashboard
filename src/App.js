import React, { useState } from "react";
import "./config/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "./App.css";
import ToDoList from "./components/Dashboard/ToDoList";
import WeatherDashboard from "./components/Dashboard/WeatherDashboard";
import ExpenseTracker from "./components/Dashboard/ExpenseTracker";
import ChatRoom from "./components/Dashboard/ChatRoom";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import DarkModeToggle from "./components/Dashboard/DarkModeToggle";

function App() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const handleLogin = async () => {
		const auth = getAuth();

		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;
			console.log("User logged in:", user);
			setIsLoggedIn(true);
		} catch (error) {
			console.error("Error signing in:", error);
		}
	};

	return (
		<div className="App">
			<h1>Personal Dashboard</h1>
			{!isLoggedIn ? (
				<div>
					<input
						type="email"
						placeholder="Email"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type="password"
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button onClick={handleLogin}>Login</button>
				</div>
			) : (
				<div>
					<DarkModeProvider>
						<ToDoList />
						<WeatherDashboard />
						<ExpenseTracker />
						<ChatRoom />
						<DarkModeToggle />
					</DarkModeProvider>
				</div>
			)}
		</div>
	);
}

export default App;
