import { cva } from '@/styled-system/css';
import { TextColorOptions } from '@/types';

const styles = cva({
	variants: {
		color: {
			standard: { color: 'text.standard' },
			secondary: { color: 'text.secondary' },
			disabled: { color: 'text.disabled' },
			accent: { color: 'text.accent' },
			inverted: { color: 'text.inverted' },
		},
	},
});

/**
 * Typography color CVA. Maps `ColoredTextOptions` values to Panda semantic text color tokens.
 *
 * Variant keys mirror the semantic text token names plus any color-shade aliases used
 * across the system. Update this when `ColoredTextOptions` changes.
 *
 * @example
 * <p className={getTextColorStyles({ color: 'secondary' })}>...</p>
 */
export const getTextColorStyles = (color: TextColorOptions) => {
	return styles({ color });
};
