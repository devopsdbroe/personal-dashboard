import { useState, useEffect } from "react";
import "./CountdownTimer.css";

const CountdownTimer = () => {
	const [time, setTime] = useState(0);
	const [isActive, setIsActive] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		let interval;

		if (isActive && time > 0) {
			interval = setInterval(() => {
				setTime((prevTime) => prevTime - 1);
			}, 1000);
		} else {
			clearInterval(interval);
			setIsActive(false);
		}

		return () => clearInterval(interval);
	}, [isActive, time]);

	// Sole purpose is to start timer. Will throw error if no input found
	const handleStart = (e) => {
		e.preventDefault();

		// If input value is empty or zero, set error message and return
		if (!inputValue || parseInt(inputValue) === 0) {
			setErrorMessage("Please enter a valid time before starting the timer.");
			return;
		} else {
			setTime(inputValue * 60);
			setIsActive(true);
			setInputValue(""); // Clear input only after setting the timer
		}

		setErrorMessage(""); // Clear error message if there's a valid input
	};

	const handlePauseResume = () => {
		setIsActive(!isActive);
	};

	return (
		<div className='timer-container'>
			<div className='timer'>
				<span>
					{Math.floor(time / 60)
						.toString()
						.padStart(2, "0")}
					:
				</span>
				<span>{(time % 60).toString().padStart(2, "0")}</span>
			</div>
			<div className='controls'>
				{/* If error message has a value, show the error */}
				{errorMessage && <div className='error-message'>{errorMessage}</div>}
				<form onSubmit={handleStart}>
					<input
						type='number'
						placeholder='Minutes'
						value={inputValue}
						onChange={(e) => {
							setInputValue(e.target.value);
							setErrorMessage("");
						}}
					/>
					<button type='submit'>Start</button>
				</form>
				{time > 0 && (
					<button onClick={handlePauseResume}>
						{isActive ? "Pause" : "Resume"}
					</button>
				)}
				<button onClick={(e) => setTime(0)}>Reset</button>
			</div>
		</div>
	);
};

export default CountdownTimer;
