import { cva } from '@/styled-system/css';

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
		size: {
			sm: {
				paddingX: '2',
				paddingY: '1',
			},
			md: {
				paddingX: '3',
				paddingY: '1.5',
			},
			lg: {
				paddingX: '4',
				paddingY: '2',
			},
		},
	},
	defaultVariants: {
		alt: false,
		size: 'md',
	},
});
