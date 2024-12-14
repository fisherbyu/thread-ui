export type ButtonProps = {
	content: string;
	fullWidth?: boolean;
	color?: 'primary' | 'secondary' | 'tertiary' | 'black' | 'grey' | 'success' | 'error' | 'info';
	type?: 'button' | 'submit' | 'reset';
	onClick?: () => void;
};
