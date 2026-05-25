import { DividerProps } from './divider.types';
import { css, cva, cx } from '@/styled-system/css';
import { CSSProperties } from 'react';

const styles = {
	core: {
		base: cva({
			base: {
				marginX: 'auto',
				borderRadius: '9999px',
			},
			variants: {
				color: {
					subtle: {
						backgroundColor: 'structure.subtle',
					},
					default: {
						backgroundColor: 'structure.default',
					},
					strong: {
						backgroundColor: 'structure.strong',
					},
				},
			},
		}),
		marginY: css({
			marginY: '4',
		}),
		width: css({
			width: '75%',
		}),
	},
	dividerWeight: cva({
		variants: {
			weight: {
				light: { height: '0.125' },
				standard: { height: '0.25' },
				heavy: { height: '0.5' },
			},
		},
		defaultVariants: {
			weight: 'standard',
		},
	}),
};

/**
 * Horizontal rule with configurable width, vertical margin, and weight.
 *
 * @example
 * <Divider width="50%" marginY="12px" weight="light" />
 */
export const Divider = ({ width, marginY, weight, color = 'default' }: DividerProps) => {
	const staticStyles: CSSProperties = {
		...(width && { width }),
		...(marginY && { marginTop: marginY, marginBottom: marginY }),
	};

	const className = cx(
		styles.core.base({ color }),
		styles.dividerWeight({ weight }),
		!marginY && styles.core.marginY,
		!width && styles.core.width
	);

	return <div style={staticStyles} className={className} />;
};
