import React from "react";
import styled from "styled-components";
import { useDarkMode } from "../../../contexts/DarkModeContext/DarkModeProvider";

const ToggleButton = styled.button`
	background-color: ${(props) => (props.$isDarkMode ? "black" : "white")};
	color: ${(props) => (props.$isDarkMode ? "white" : "black")};
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
