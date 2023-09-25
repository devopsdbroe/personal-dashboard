import React, { useState } from "react";
import "./RandomQuote.css";

const quotes = [
	"Life is what happens when you're busy making other plans.",
	"The way to get started is to quit talking and begin doing.",
	"The future belongs to those who believe in the beauty of their dreams.",
	"It always seems impossible until it's done.",
	"The only way to do great work is to love what you do.",
];

const RandomQuote = () => {
	const [quote, setQuote] = useState("");

	const pickRandomQuote = () => {
		const randomIndex = Math.floor(Math.random() * quotes.length);
		setQuote(quotes[randomIndex]);
	};

	return (
		<div className='quote-container'>
			<button onClick={pickRandomQuote}>Generate Random Quote</button>
			<p>{quote}</p>
		</div>
	);
};

export default RandomQuote;
