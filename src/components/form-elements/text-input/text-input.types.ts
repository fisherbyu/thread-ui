import { InputProps } from '../input-props.types';

export type TextInputProps = InputProps<string> & {
	/** Renders a resizable `textarea` instead of a single-line input @default `false` */
	multiline?: boolean;
};
