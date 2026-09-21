import { cva } from '@/styled-system/css';
import type { IconSizes } from '@/components';

/** Size scale shared by every form element. */
export type InputSize = 'sm' | 'md' | 'lg';

// Single source of truth for size-driven spacing and type
const sizeVariants = {
	sm: {
		paddingX: '2',
		paddingY: '1',
		fontSize: 'xs',
	},
	md: {
		paddingX: '3',
		paddingY: '1.5',
		fontSize: 'sm',
	},
	lg: {
		paddingX: '4',
		paddingY: '2',
		fontSize: 'md',
	},
} as const;

/** Icon size to pair with each `InputSize`. */
export const inputIconSizes: Record<InputSize, IconSizes> = {
	sm: 8,
	md: 12,
	lg: 16,
};

export const baseInputStyles = cva({
	base: {
		color: 'text.standard',
		backgroundColor: 'inset',
		borderWidth: 'md',
		borderStyle: 'solid',
		borderColor: 'structure.default',
		borderRadius: 'md',
		transition: 'colors',
		_focus: {
			outline: 'none',
			borderColor: 'info.main',
			boxShadow: '0 0 0 2px {colors.info.main}',
		},
	},
	variants: {
		alt: {
			true: {
				width: 'auto',
			},
			false: {
				width: '100%',
			},
		},
		size: sizeVariants,
	},
	defaultVariants: {
		alt: false,
		size: 'md',
	},
});

/** Sizing for non-input pieces of composite controls, like the `NumberInput` stepper buttons. */
export const inputSegmentStyles = cva({
	base: {
		borderWidth: 'md',
		borderColor: 'structure.default',
	},
	variants: {
		size: sizeVariants,
	},
	defaultVariants: {
		size: 'md',
	},
});
