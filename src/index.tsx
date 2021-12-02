import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Markdown from 'markdown-to-jsx';

import './styles.css';

interface IProps {
	title: string;
	description: string;
	toggle: string;
	controls: {
		all: string;
		selected: string;
	};
	types: IType[];
	cookieName?: string;
}

interface IScript {
	location: 'head' | 'body';
	src: string;
}
interface IType {
	id: string;
	label: string;
	scripts: IScript[];
	disabled?: boolean;
	checked?: boolean;
}

interface IButtonClickEvent
	extends React.MouseEvent<HTMLButtonElement, MouseEvent> {
	target: HTMLButtonElement;
}

interface ICheckboxChangeEvent extends React.ChangeEvent<HTMLInputElement> {}

const createScript = (source: string) => {
	const script = document.createElement('script');
	script.type = 'text/javascript';
	script.dataset.cookiesScript = '';
	script.src = source;
	script.async = true;
	return script;
};

const loadScripts = (types: IType[]) => {
	types.forEach((type) => {
		type.scripts.forEach(({ location, src }) => {
			const script = createScript(src);
			document[location] && document[location].appendChild(script);
		});
	});
};

const unloadScripts = () => {
	const scripts = document.querySelectorAll('script[data-cookies-script]');

	scripts.forEach((script) => {
		script?.parentElement!.removeChild(script);
	});
};

const CookiesDialog = ({
	cookieName = 'GDPR',
	title,
	description,
	toggle,
	types,
	controls
}: IProps) => {
	const [controlledTypes, setControlledTypes] = useState<IType[]>([]);
	const [isActive, setActive] = useState(false);

	const onToggleClick = () => setActive((state) => !state);

	const onCheckboxChange = ({ target }: ICheckboxChangeEvent) => {
		if (!target || !target.id) {
			return;
		}

		setControlledTypes((types) =>
			types.map((type) => ({
				...type,
				...(type.id === target.id && { checked: target.checked })
			}))
		);
	};

	const onSubmit = ({ target }: IButtonClickEvent) => {
		if (!target || !target.name) {
			return;
		}

		setActive(false);
		unloadScripts();

		let currentTypes;
		if (target.name === 'selected') {
			currentTypes = controlledTypes;
		} else if (target.name === 'all') {
			currentTypes = controlledTypes.map((type) => ({
				...type,
				checked: true
			}));

			setControlledTypes(currentTypes);
		}

		const activeTypes = currentTypes?.filter((type) => type.checked) || [];

		Cookies.set(
			cookieName,
			activeTypes.map((type) => type.id),
			{ expires: 365 }
		);

		loadScripts(activeTypes);
	};

	useEffect(() => {
		if (!types) {
			return;
		}

		const cookies = Cookies.get(cookieName)?.split(',');

		const currentTypes = types.map((type) => ({
			...type,
			checked: cookies?.includes(type.id) ? true : type.checked || false,
			disabled: type.disabled || false
		}));

		const activeTypes = currentTypes.filter((type) => type.checked);

		setActive(!cookies);
		setControlledTypes(currentTypes);
		loadScripts(activeTypes);
	}, []);

	return (
		<div className={`stf-cookies${isActive ? ' stf-cookies--active' : ''}`}>
			<button className="stf-cookies__toggle" onClick={onToggleClick}>
				<Markdown>{toggle}</Markdown>
			</button>

			{title && <h2 className="stf-cookies__title">{title}</h2>}
			<div className="stf-cookies__description">
				<Markdown>{description}</Markdown>
			</div>

			<form className="stf-cookies__form">
				<div className="stf-cookies__types">
					{controlledTypes.map(({ scripts, ...typeProps }) => (
						<div key={typeProps.id} className="stf-cookies__type">
							<input
								type="checkbox"
								{...typeProps}
								onChange={onCheckboxChange}
							/>
							<label htmlFor={typeProps.id}>{typeProps.label}</label>
						</div>
					))}
				</div>

				{controls && (
					<div className="stf-cookies__controls">
						<button name="selected" type="button" onClick={onSubmit}>
							{controls.selected}
						</button>
						<button name="all" type="button" onClick={onSubmit}>
							{controls.all}
						</button>
					</div>
				)}
			</form>
		</div>
	);
};

export default CookiesDialog;
