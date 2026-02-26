import type { SpinLoaderProps } from './spin-loader.types';
import { cva } from '../../../../styled-system/css';

export const SpinLoader = ({ size = 'md', color, label = 'Loading...' }: SpinLoaderProps) => {
	const styles = cva({
		base: {
			borderRadius: 'full',
			borderStyle: 'solid',
			borderColor: 'gray.light',
			display: 'inline-block',
			animation: 'spin 0.75s linear infinite',
		},
		variants: {
			size: {
				sm: { w: '4', h: '4', borderWidth: '2px' },
				md: { w: '12', h: '12', borderWidth: '4px' },
				lg: { w: '20', h: '20', borderWidth: '8px' },
			},
			color: {
				primary: { borderTopColor: 'primary.light' },
				secondary: { borderTopColor: 'secondary.light' },
				tertiary: { borderTopColor: 'tertiary.light' },
				black: { borderTopColor: 'black' },
				gray: { borderTopColor: 'gray.main' },
				text: { borderTopColor: 'text.standard' },
			},
		},
		defaultVariants: {
			size: 'md',
			color: 'primary',
		},
	});

	return <div role="status" aria-label={label} className={styles({ size, color })} />;
};
