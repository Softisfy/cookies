# @softisfy/cookies

> A GDPR compliant cookies component for React

[![NPM](https://img.shields.io/npm/v/@softisfy/cookies.svg)](https://www.npmjs.com/package/@softisfy/cookies) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
yarn add @softisfy/cookies
```

## Use

```jsx
import CookiesDialog from '@softisfy/cookies';
import '@softisfy/cookies/dist/index.css';

const App = () => {
	return (
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
	);
};
```

## Customize

For this part, you have three options:

1. Use the default stylesheet provided by the library. Example:

```jsx
import '@softisfy/cookies/dist/index.css';
```

2. Override the default stylesheet with your own. (Optional) Example:

```css
:root {
	--stf-cookies-primary-color: #444c56;
	--stf-cookies-border-color: #444c56;
	--stf-cookies-dark-color: #adbac7;
	--stf-cookies-light-color: #22272e;
	--stf-cookies-border-radius: 4px;
	--stf-cookies-font-size: 13px;
	--stf-cookies-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
		Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
}
```

3. Use your own stylesheet. (Optional)

## Demo

Live: [Netlify](https://softisfy-cookies.netlify.app).

Code: [Repo](https://github.com/softisfy/cookies/tree/main/example).

## License

MIT © [Softisfy](https://github.com/softisfy)
