import React from "react";
import styled from "styled-components";
import { useDarkMode } from "../../contexts/DarkModeContext";

const ToggleButton = styled.button`
	background-color: ${(props) => (props.$isDarkMode ? "white" : "black")};
	color: ${(props) => (props.$isDarkMode ? "black" : "white")};
`;

const DarkModeToggle = () => {
	const { isDarkMode, setIsDarkMode } = useDarkMode();

	return (
		<ToggleButton
			$isDarkMode={isDarkMode}
			onClick={() => setIsDarkMode(!isDarkMode)}
		>
			Toggle Dark Mode
		</ToggleButton>
	);
};

export default DarkModeToggle;
