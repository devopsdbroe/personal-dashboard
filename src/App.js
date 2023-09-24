import React, { useState } from "react";
import "./config/firebase";
import { getAuth, signOut } from "firebase/auth";
import "./App.css";
import LoginForm from "./components/Auth/LoginForm";
import useLogoutTimer from "./components/hooks/useLogoutTimer";
import ToDoList from "./components/Dashboard/ToDoList";
import RandomQuote from "./components/Dashboard/RandomQuote";
import WeatherDashboard from "./components/Dashboard/WeatherDashboard";
import ExpenseTracker from "./components/Dashboard/ExpenseTracker";
import ChatRoom from "./components/Dashboard/ChatRoom";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import DarkModeToggle from "./components/Dashboard/DarkModeToggle";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./components/common/LanguageSwitcher";
import CountdownTimer from "./components/Dashboard/CountdownTimer";

function App() {
	const { t } = useTranslation();
	const [email, setEmail] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const handleLogout = () => {
		const auth = getAuth();
		signOut(auth);
		setIsLoggedIn(false);
	};

	// Custom hook that logs the user out after 5 minutes
	useLogoutTimer(isLoggedIn, setIsLoggedIn, handleLogout);

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
						<CountdownTimer />
					</DarkModeProvider>
					<button onClick={handleLogout}>Sign Out</button>
				</div>
			)}
		</div>
	);
}

export default App;
