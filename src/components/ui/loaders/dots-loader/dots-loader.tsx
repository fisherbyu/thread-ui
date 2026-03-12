import type { DotsLoaderProps } from './dots-loader.types';
import { cva } from '../../../../styled-system/css';

/**
 * Three-dot pulsing loader with configurable label, size and color.
 *
 * @example
 * <DotsLoader size="md" color="primary" />
 */
export const DotsLoader = ({ size = 'md', color, label = 'Loading...' }: DotsLoaderProps) => {
	const styles = {
		container: cva({
			base: {
				display: 'inline-flex',
			},
			variants: {
				size: {
					sm: {
						gap: '1.5',
					},
					md: {
						gap: '1.5',
					},
					lg: {
						gap: '3',
					},
				},
			},
		}),
		dot: cva({
			base: {
				borderRadius: 'full',
				display: 'inline-block',
				animation: 'pulse 1.2s ease-in-out infinite',
			},
			variants: {
				size: {
					sm: { w: '2', h: '2' },
					md: { w: '4', h: '4' },
					lg: { w: '8', h: '8' },
				},
				color: {
					primary: { bg: 'primary.light' },
					secondary: { bg: 'secondary.light' },
					tertiary: { bg: 'tertiary.light' },
					black: { bg: 'black' },
					gray: { bg: 'gray.main' },
					text: { bg: 'text.standard' },
				},
			},
			defaultVariants: {
				size: 'md',
				color: 'primary',
			},
		}),
	};

	const dotClass = styles.dot({ size, color });

	return (
		<div role="status" aria-label={label} className={styles.container({ size })}>
			<span className={dotClass} style={{ animationDelay: '0s' }} />
			<span className={dotClass} style={{ animationDelay: '0.2s' }} />
			<span className={dotClass} style={{ animationDelay: '0.4s' }} />
		</div>
	);
};
