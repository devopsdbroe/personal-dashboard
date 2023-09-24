import React, { useState } from "react";
import axios from "axios";

const WeatherDashboard = () => {
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [weatherData, setWeatherData] = useState(null);

	const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

	const fetchWeather = async (e) => {
		e.preventDefault();
		if (city.trim() === "" || state.trim() === "") return;

		try {
			const response = await axios.get(
				`https://api.openweathermap.org/data/2.5/weather?q=${city},${state}&appid=${apiKey}&units=imperial`
			);
			setWeatherData(response.data);
		} catch (error) {
			console.error("Error fetching weather data:", error);
		}
	};

	return (
		<div>
			<h2>Weather Dashboard</h2>
			<form onSubmit={fetchWeather}>
				<input
					type='text'
					placeholder='City'
					value={city}
					onChange={(e) => setCity(e.target.value)}
				/>
				<input
					type='text'
					placeholder='State'
					value={state}
					onChange={(e) => setState(e.target.value)}
				/>
				<button type='submit'>Get Weather</button>
			</form>

			{weatherData && (
				<div>
					<h3>
						{weatherData.name}, {state}
					</h3>
					<p>Temperature: {weatherData.main.temp}°F</p>
					<p>{weatherData.weather[0].description}</p>
				</div>
			)}
		</div>
	);
};

export default WeatherDashboard;
