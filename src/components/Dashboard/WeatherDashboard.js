import React, { useState, useEffect } from "react";
import axios from "axios";

const WeatherDashboard = () => {
	const [location, setLocation] = useState("");
	const [weatherData, setWeatherData] = useState(null);

	const API_KEY = "09db29f92f681d390dc91696db57948a";

	const fetchWeather = async () => {
		if (location.trim() === "") return;

		try {
			const response = await axios.get(
				`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
			);
			console.log(response.data);
			setWeatherData(response.data);
		} catch (error) {
			console.error("Error fetching weather data:", error);
		}
	};

	return (
		<div>
			<h2>Weather Dashboard</h2>
			<input
				type="text"
				placeholder="Enter Location"
				value={location}
				onChange={(e) => setLocation(e.target.value)}
			/>
			<button onClick={fetchWeather}>Get Weather</button>

			{weatherData && (
				<div>
					<h3>
						{weatherData.name}, {weatherData.sys.country}
					</h3>
					<p>Temperature: {weatherData.main.temp}°C</p>
					<p>{weatherData.weather[0].description}</p>
				</div>
			)}
		</div>
	);
};

export default WeatherDashboard;
