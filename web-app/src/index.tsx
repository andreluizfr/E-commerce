
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import React from 'react';
import ReactDOM from 'react-dom/client';

import { QueryClientProvider } from 'react-query';
import { queryClient } from 'libs/reactQuery';

import { Provider } from 'react-redux';
import store from 'store';

import App from 'App';

const firebaseConfig = {
	apiKey: "AIzaSyBvsT3RVY-KgfM3BwtUSrDKLHowBKF5C8A",
	authDomain: "loja-dropshipping-7536d.firebaseapp.com",
	projectId: "loja-dropshipping-7536d",
	storageBucket: "loja-dropshipping-7536d.appspot.com",
	messagingSenderId: "500461665390",
	appId: "1:500461665390:web:3f853ca51efcd64a03ba7f",
	measurementId: "G-QP25G0ZLF0"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<Provider store={store}>
		<QueryClientProvider client={queryClient}>
			<React.StrictMode>
				<App />
			</React.StrictMode>
		</QueryClientProvider>
	</Provider>
);

/*
There is a built-in environment variable called NODE_ENV. You can read it from process.env.NODE_ENV.
When you run npm start, it is always equal to 'development', when you run npm test it is always equal to 'test',
and when you run npm run build to make a production bundle, it is always equal to 'production'.
You cannot override NODE_ENV manually!
*/