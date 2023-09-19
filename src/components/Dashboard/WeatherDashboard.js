import React, { useState, useEffect } from "react";

const WeatherDashboard = () => {
	const [location, setLocation] = useState("");
	const [weatherData, setWeatherData] = useState(null);

	const API_KEY = "cedbeead1f514e098de0134e9809b8d2";

	useEffect(() => {
		const fetchWeather = async () => {
			if (location.trim() === "") return;

			try {
				const response = await fetch(
					`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${location}`
				);
				const data = await response.json();

				if (data.success !== false) {
					setWeatherData(data);
				}
			} catch (error) {
				console.error("Error fetching weather data:", error);
			}
		};

		fetchWeather();
	}, [location]);

	return (
		<div>
			<h2>Weather Dashboard</h2>
			<input
				type="text"
				placeholder="Enter Location"
				value={location}
				onChange={(e) => setLocation(e.target.value)}
			/>
			<button onClick={(e) => setLocation(location)}>Get Weather</button>

			{weatherData && (
				<div>
					<h3>
						{weatherData.location.name}, {weatherData.location.country}
					</h3>
					<p>Temperature: {weatherData.current.temperature}°C</p>
					<p>{weatherData.current.weather_descriptions[0]}</p>
				</div>
			)}
		</div>
	);
};

export default WeatherDashboard;
