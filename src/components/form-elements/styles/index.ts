import { cva } from '@/styled-system/css';

export const baseInputStyles = cva({
	base: {
		color: 'text.standard',
		backgroundColor: 'inset',
		paddingX: '4',
		paddingY: '2',
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
	},
	defaultVariants: {
		alt: false,
	},
});
