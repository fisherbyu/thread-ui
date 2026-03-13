import { DividerProps } from './divider.types';
import { css, cva, cx } from '@/styled-system/css';
import { CSSProperties } from 'react';

const styles = {
	core: {
		base: css({
			marginX: 'auto',
			backgroundColor: 'structure',
		}),
		marginY: css({
			marginY: '16px',
		}),
		width: css({
			width: '75%',
		}),
	},
	dividerWeight: cva({
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
	}),
};

/**
 * Horizontal rule with configurable width, vertical margin, and weight.
 *
 * @example
 * <Divider width="50%" marginY="12px" weight="light" />
 */
export const Divider = ({ width, marginY, weight }: DividerProps) => {
	const staticStyles: CSSProperties = {
		...(width && { width }),
		...(marginY && { marginTop: marginY, marginBottom: marginY }),
	};

	const className = cx(
		styles.core.base,
		styles.dividerWeight({ weight }),
		!marginY && styles.core.marginY,
		!width && styles.core.width
	);

	return <div style={staticStyles} className={className} />;
};
