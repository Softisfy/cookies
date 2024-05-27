import * as React from 'react';
import CookiesDialog from '@softisfy/cookies';

import '@softisfy/cookies/dist/index.css';
import '../globals.css';

const IndexPage: React.FC<PageProps> = () => {
	return (
		<main>
			<img id="logo" src="./logo.svg" alt="_cookies" height="96" width="400" />

			<CookiesDialog
				toggle="![Cookie](./cookie.svg)"
				title="This website uses cookies"
				description="
					We use cookies to provide social media features and to analyze our traffic. 
					We also share information about your use of our site with our 
					social media and analytics partners who may combine it with other
					information that you've provided to them. [Learn more](/).
				"
				controls={{
					all: 'Accept all cookies',
					selected: 'Accept selected cookies'
				}}
				onClickAll={() => {
					console.log('User opted for All Cookies');
				}}
				onClickSelected={() => {
					console.log('User opted for Selected Cookies');
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
								src: './scripts/script-A.js'
							}
						]
					},
					{
						id: 'analytics',
						label: 'Analytics',
						scripts: [
							{
								location: 'body',
								src: './scripts/script-B.js'
							}
						]
					},
					{
						id: 'marketing',
						label: 'Marketing',
						scripts: [
							{
								location: 'head',
								src: './scripts/script-C.js'
							}
						]
					}
				]}
			/>
		</main>
	);
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
