import { cva } from '@/styled-system/css';

const baseInputStyles = cva({
	base: {
		paddingX: '16px',
		paddingY: '8px',
		borderWidth: '1px',
		borderStyle: 'solid',
		borderColor: 'structure',
		transition: 'colors',
		_focus: {
			outline: 'none',
			borderColor: 'transparent',
			boxShadow: '0 0 0 2px {colors.blue.500}',
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
	},
	defaultVariants: {
		alt: true,
	},
});
