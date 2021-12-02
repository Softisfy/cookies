import * as React from 'react';
import './styles.css';

interface Props {
	text: string;
}

export const ExampleComponent = ({ text }: Props) => {
	return <span>{text}</span>;
};
