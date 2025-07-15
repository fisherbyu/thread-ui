'use client';
import { ThreadTheme, generateStyles } from '@/functions';
import { DividerProps } from './divider.types';
import { css, cva } from '@/styled-system/css';

const dividerWeight = cva({
	variants: {
		weight: {
			light: { height: '0.5px' },
			standard: { height: '1px' },
			heavy: { height: '2px' },
		},
	},
	defaultVariants: {
		weight: 'standard',
	},
});

export const Divider = ({ width, marginY, weight }: DividerProps) => {
	const styles = css({
		marginLeft: 'auto',
		marginRight: 'auto',
		backgroundColor: 'structure',
	});

	const ostyles = generateStyles({
		width: width || '75%',
		marginTop: marginY || '16px',
		marginBottom: marginY || '16px',
		height: `${dividerWeight}px`,
	});

	return <div className={styles}></div>;
};
