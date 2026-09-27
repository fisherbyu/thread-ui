import { InputProps } from '../shared/input-props.types';

export type TextInputProps = InputProps<string> & {
	/** Native input type. Ignored when `multiline` @default `text` */
	type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url';
	/** Renders a resizable `textarea` instead of a single-line input @default `false` */
	multiline?: boolean;
};
