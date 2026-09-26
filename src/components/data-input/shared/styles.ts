import { cva } from '@/styled-system/css';
import type { IconSizes } from '@/components';
import { UtilitySizeOptions } from '@/types';

/** Size scale shared by every input element. */
export type InputSize = UtilitySizeOptions;

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

// Border shared by standalone fields and composite segments
const border = {
	borderWidth: 'md',
	borderStyle: 'solid',
	borderColor: 'structure.default',
} as const;

// Surface and focus/invalid states for anything the user types into
const fieldSurface = {
	color: 'text.standard',
	backgroundColor: 'inset',
	transition: 'colors',
	_focus: {
		outline: 'none',
		borderColor: 'info.main',
		boxShadow: '0 0 0 2px {colors.info.main}',
	},
	// Keyed off `aria-invalid`, not `:invalid`, so untouched required fields don't render as errors
	'&[aria-invalid=true]': {
		borderColor: 'error.main',
		_focus: {
			borderColor: 'error.main',
			boxShadow: '0 0 0 2px {colors.error.main}',
		},
	},
} as const;

const disabledState = {
	_disabled: {
		opacity: '0.5',
		cursor: 'not-allowed',
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
		...border,
		...fieldSurface,
		...disabledState,
		borderRadius: 'md',
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

/** Sizing for pieces of composite controls, like the `NumberInput` stepper buttons and center field. */
export const inputSegmentStyles = cva({
	base: {
		...border,
		...disabledState,
	},
	variants: {
		// `true` for the segment the user types into
		field: {
			true: {
				...fieldSurface,
				// Lift the focus ring above neighbouring segments
				position: 'relative',
				_focus: {
					...fieldSurface._focus,
					zIndex: 1,
				},
			},
			false: {},
		},
		size: sizeVariants,
	},
	defaultVariants: {
		field: false,
		size: 'md',
	},
});
