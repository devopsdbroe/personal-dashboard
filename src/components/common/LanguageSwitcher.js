import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
	const { i18n } = useTranslation();

	const changeLanguage = (language) => {
		i18n.changeLanguage(language);
	};

	return (
		<select
			onChange={(e) => changeLanguage(e.target.value)}
			defaultValue={i18n.language}
		>
			<option value='en'>English</option>
			<option value='de'>German</option>
		</select>
	);
};

export default LanguageSwitcher;
