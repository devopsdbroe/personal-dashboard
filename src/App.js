import React, { useState, useEffect } from "react";
import "./config/firebase";
import {
	getAuth,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
} from "firebase/auth";
import "./App.css";
import ToDoList from "./components/Dashboard/ToDoList";
import WeatherDashboard from "./components/Dashboard/WeatherDashboard";
import ExpenseTracker from "./components/Dashboard/ExpenseTracker";
import ChatRoom from "./components/Dashboard/ChatRoom";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import DarkModeToggle from "./components/Dashboard/DarkModeToggle";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./components/common/LanguageSwitcher";

function App() {
	const { t } = useTranslation();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [logoutTimer, setLogoutTimer] = useState(null);

	useEffect(() => {
		const auth = getAuth();

		onAuthStateChanged(auth, (user) => {
			if (user) {
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
			}
		});

		const resetTimer = () => {
			if (logoutTimer) clearTimeout(logoutTimer);
			setLogoutTimer(
				setTimeout(() => {
					handleLogout();
				}, 5 * 60 * 1000)
			);
		};

		window.addEventListener("mousemove", resetTimer);
		window.addEventListener("keypress", resetTimer);

		return () => {
			window.removeEventListener("mousemove", resetTimer);
			window.removeEventListener("keypress", resetTimer);
			if (logoutTimer) clearTimeout(logoutTimer);
		};
	}, [logoutTimer]);

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

	const handleLogout = () => {
		const auth = getAuth();
		signOut(auth);
		setIsLoggedIn(false);
	};

	return (
		<div className='App'>
			<h1>{t("personalDashboard")}</h1>
			{!isLoggedIn ? (
				<div>
					<input
						type='email'
						placeholder='Email'
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type='password'
						placeholder='Password'
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
						<LanguageSwitcher />
					</DarkModeProvider>
					<button onClick={handleLogout}>Sign Out</button>
				</div>
			)}
		</div>
	);
}

export default App;
