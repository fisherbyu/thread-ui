import { cva } from '@/styled-system/css';
import { ColoredTextOptions } from '@/types';

const styles = cva({
	variants: {
		color: {
			standard: { color: 'text.standard' },
			'text-secondary': { color: 'text.secondary' },
			'text-tertiary': { color: 'text.tertiary' },
			disabled: { color: 'text.disabled' },
			accent: { color: 'text.accent' },
			inverted: { color: 'text.inverted' },
			black: { color: 'black' },
			primary: { color: 'primary.main' },
			secondary: { color: 'secondary.main' },
			tertiary: { color: 'tertiary.main' },
			gray: { color: 'gray.main' },
			success: { color: 'success.main' },
			info: { color: 'info.main' },
			error: { color: 'error.main' },
			warning: { color: 'warning.main' },
			white: { color: 'white' },
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
export const getTextColorStyles = (color: ColoredTextOptions) => {
	return styles({ color });
};
