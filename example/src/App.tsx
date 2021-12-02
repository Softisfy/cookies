import React from 'react';

import { ExampleComponent } from 'cookies';
import 'cookies/dist/index.css';

const App = () => {
	return (
		<React.Fragment>
			<img id="logo" src="/logo.svg" alt="_cookies" />
			<ExampleComponent text="Example" />
		</React.Fragment>
	);
};

export default App;
