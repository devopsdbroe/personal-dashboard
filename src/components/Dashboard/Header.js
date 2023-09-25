import React from "react";
import styled from "styled-components";
import { useDarkMode } from "../../contexts/DarkModeContext";

const StyledHeader = styled.div`
	background-color: ${(props) => (props.$isDarkMode ? "#333" : "#f9f9f9")};
	color: ${(props) => (props.$isDarkMode ? "#f9f9f9" : "#333")};
	padding: 20px;
`;

const Header = () => {
	const { isDarkMode } = useDarkMode();

	return (
		<StyledHeader $isDarkMode={isDarkMode}>
			Using this to demo dark mode
		</StyledHeader>
	);
};

export default Header;
