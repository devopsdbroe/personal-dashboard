import { initializeApp } from "firebase/app";

const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;

const firebaseConfig = {
	apiKey: apiKey,
	authDomain: "react-chat-app-79450.firebaseapp.com",
	projectId: "react-chat-app-79450",
	storageBucket: "react-chat-app-79450.appspot.com",
	messagingSenderId: "128472369292",
	appId: "1:128472369292:web:d8e57c45dc2a3f8a1fd3a9",
};

const app = initializeApp(firebaseConfig);

export default app;
