'use client';
import { useTheme } from '../../../utils';
import { DividerProps } from './divider.types';

export const Divider = ({ width, marginY, weight }: DividerProps) => {
	const { theme } = useTheme();

	let dividerWeight: number;
	switch (weight) {
		case 'light':
			dividerWeight = 0.5;
			break;
		case 'standard':
			dividerWeight = 1;
			break;
		case 'bold':
			dividerWeight = 2;
			break;
		default:
			dividerWeight = 1;
	}

	const styles: React.CSSProperties = {
		width: width || '75%',
		marginTop: marginY || '16px',
		marginBottom: marginY || '16px',
		marginLeft: 'auto',
		marginRight: 'auto',
		height: `${dividerWeight}px`,
		backgroundColor: theme.colors.structure,
	};

	return <div style={styles}></div>;
};
