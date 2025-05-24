'use client';
import { ThreadTheme, useThreadStyles } from '@/functions';
import { DividerProps } from './divider.types';

export const Divider = ({ width, marginY, weight }: DividerProps) => {
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

	const styles = useThreadStyles({
		width: width || '75%',
		marginTop: marginY || '16px',
		marginBottom: marginY || '16px',
		marginLeft: 'auto',
		marginRight: 'auto',
		height: `${dividerWeight}px`,
		backgroundColor: ThreadTheme.structure,
	});

	return <div className={styles}></div>;
};
