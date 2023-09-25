import { useState, useEffect } from "react";
import "./CountdownTimer.css";

const CountdownTimer = () => {
	const [time, setTime] = useState(0);
	const [isActive, setIsActive] = useState(false);
	const [inputValue, setInputValue] = useState("");

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

	const handleStart = (e) => {
		e.preventDefault();
		setIsActive(!isActive);

		if (!isActive) {
			setTime(inputValue * 60);
		}

		setInputValue("");
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
				<form onSubmit={handleStart}>
					<input
						type='number'
						placeholder='Minutes'
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
					/>
					<button type='submit'>{isActive ? "Pause" : "Play"}</button>
				</form>
				<button onClick={(e) => setTime(0)}>Reset</button>
			</div>
		</div>
	);
};

export default CountdownTimer;
