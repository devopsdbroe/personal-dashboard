import { useEffect, useRef, useCallback } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const useLogoutTimer = ({ isLoggedIn, setIsLoggedIn, handleLogout }) => {
	const logoutTimerRef = useRef(null);

	const resetTimer = useCallback(() => {
		if (logoutTimerRef.current) {
			clearTimeout(logoutTimerRef.current);
		}

		logoutTimerRef.current = setTimeout(handleLogout, 5 * 60 * 1000);
	}, []);

	useEffect(() => {
		const auth = getAuth();

		const unsubscribeFromAuth = onAuthStateChanged(auth, (user) => {
			if (user) {
				setIsLoggedIn(true);
				resetTimer();
			} else {
				setIsLoggedIn(false);
			}
		});

		window.addEventListener("mousemove", resetTimer);
		window.addEventListener("keypress", resetTimer);

		return () => {
			unsubscribeFromAuth();

			window.removeEventListener("mousemove", resetTimer);
			window.removeEventListener("keypress", resetTimer);
			if (logoutTimerRef.current) {
				clearTimeout(logoutTimerRef.current);
			}
		};
	}, [isLoggedIn, resetTimer]);
};

export default useLogoutTimer;
