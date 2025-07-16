import { DividerProps } from './divider.types';
import { css, cva, cx } from '@/styled-system/css';
import { CSSProperties } from 'react';

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
	const styles = {
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
	};

	const staticStyles: CSSProperties = {
		...(width && { width }),
		...(marginY && { marginTop: marginY, marginBottom: marginY }),
	};

	const className = cx(styles.base, dividerWeight({ weight }), !marginY && styles.marginY, !width && styles.width);

	return <div style={staticStyles} className={className} />;
};
