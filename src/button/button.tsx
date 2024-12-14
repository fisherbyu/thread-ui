import { useTheme } from '../utils';
import { ButtonProps } from './button.types';

export const Button = ({ content, fullWidth, color }: ButtonProps) => {
	const theme = useTheme();
	const width = fullWidth ? 'w-full' : 'w-fit';

	return <div className={`p-2 ${fullWidth}`}>{content}</div>;
};
