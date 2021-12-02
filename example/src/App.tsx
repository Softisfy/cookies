import React from 'react';

import CookiesDialog from '@softisfy/cookies';
import '@softisfy/cookies/dist/index.css';

const App = () => {
	return (
		<React.Fragment>
			<img id="logo" src="/logo.svg" alt="_cookies" />

			<CookiesDialog
				toggle="![Cookie](/cookie.svg)"
				title="This website uses cookies"
				description="
					We use cookies to provide social media features and to analyse our traffic. 
					We also share information about your use of our site with our 
					social media and analytics partners who may combine it with other
					information that you've provided to them. [Learn more](/).
				"
				controls={{
					all: 'Accept all cookies',
					selected: 'Accept selected cookies'
				}}
				types={[
					{
						id: 'necessary',
						label: 'Necessary',
						disabled: true,
						checked: true,
						scripts: [
							{
								location: 'head',
								src: '/scripts/script-A.js'
							}
						]
					},
					{
						id: 'analytics',
						label: 'Analytics',
						scripts: [
							{
								location: 'body',
								src: '/scripts/script-B.js'
							}
						]
					},
					{
						id: 'marketing',
						label: 'Marketing',
						scripts: [
							{
								location: 'head',
								src: '/scripts/script-C.js'
							}
						]
					}
				]}
			/>
		</React.Fragment>
	);
};

export default App;
