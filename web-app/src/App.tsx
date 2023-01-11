import React, { useState } from 'react';
import './assets/css/styles.css';

function App() {

	return (
		<div className="App">
			{process.env.NODE_ENV}
			{process.env.REACT_APP_BASE_URL}
		</div>	
	);
}

export default App;
