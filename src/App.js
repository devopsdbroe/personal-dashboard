import React, { useState, useEffect, useRef, useCallback } from "react";
import "./config/firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import "./App.css";
import LoginForm from "./components/Auth/LoginForm";
import ToDoList from "./components/Dashboard/ToDoList";
import RandomQuote from "./components/Dashboard/RandomQuote";
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
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const logoutTimerRef = useRef(null);

	const resetTimer = useCallback(() => {
		if (logoutTimerRef.current) {
			clearTimeout(logoutTimerRef.current);
		}

		logoutTimerRef.current = setTimeout(handleLogout, 5 * 60 * 1000);
	}, []);

	useEffect(() => {
		const auth = getAuth();

		const unsubscribeFromAuth = onAuthStateChanged(auth, (user) => {
			if (user) {
				setIsLoggedIn(true);
				resetTimer();
			} else {
				setIsLoggedIn(false);
			}
		});

		window.addEventListener("mousemove", resetTimer);
		window.addEventListener("keypress", resetTimer);

		return () => {
			unsubscribeFromAuth();

			window.removeEventListener("mousemove", resetTimer);
			window.removeEventListener("keypress", resetTimer);
			if (logoutTimerRef.current) {
				clearTimeout(logoutTimerRef.current);
			}
		};
	}, [resetTimer]);

	const handleLogout = () => {
		const auth = getAuth();
		signOut(auth);
		setIsLoggedIn(false);
	};

	return (
		<div className='App'>
			<h1>{t("personalDashboard")}</h1>
			{!isLoggedIn ? (
				<LoginForm email={email} setEmail={setEmail} onLogin={setIsLoggedIn} />
			) : (
				<div>
					<DarkModeProvider>
						<ToDoList />
						<RandomQuote />
						<WeatherDashboard />
						<ExpenseTracker />
						<ChatRoom userEmail={isLoggedIn ? email : null} />
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
