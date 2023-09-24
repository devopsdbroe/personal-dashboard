import React, { useState } from "react";
import {
	getAuth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} from "firebase/auth";

const LoginForm = ({ email, setEmail, onLogin }) => {
	const [password, setPassword] = useState("");
	const [registerEmail, setRegisterEmail] = useState("");
	const [registerPassword, setRegisterPassword] = useState("");

	const handleLogin = async (e) => {
		e.preventDefault();
		const auth = getAuth();

		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;
			console.log("User logged in:", user);
			onLogin(true);
		} catch (error) {
			console.error("Error signing in:", error);
			alert(error.message);
		}
	};

	const handleRegistration = async (e) => {
		e.preventDefault();
		const auth = getAuth();
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				registerEmail,
				registerPassword
			);
			const user = userCredential.user;
			console.log("User registered:", user);
		} catch (error) {
			console.error("Error during registration:", error);
			alert(error.message);
		}
	};

	return (
		<div>
			<form onSubmit={handleLogin}>
				<input
					type='email'
					placeholder='Email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type='password'
					placeholder='Password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type='submit'>Sign In</button>
			</form>
			<form onSubmit={handleRegistration}>
				<input
					type='email'
					placeholder='Register Email'
					value={registerEmail}
					onChange={(e) => setRegisterEmail(e.target.value)}
				/>
				<input
					type='password'
					placeholder='Register Password'
					value={registerPassword}
					onChange={(e) => setRegisterPassword(e.target.value)}
				/>
				<button type='submit'>Register</button>
			</form>
		</div>
	);
};

export default LoginForm;
