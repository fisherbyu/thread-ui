import { defineRecipe } from '@pandacss/dev';

export const buttonRecipe = defineRecipe({
	className: 'button',
	base: {
		borderRadius: 'md',
		borderStyle: 'solid',
		borderWidth: 'md',
		transition: 'background-color 0.2s ease',
		color: 'white',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		cursor: 'pointer',
		userSelect: 'none',
		height: 'fit-content',
	},
	variants: {
		color: {
			primary: {
				backgroundColor: 'primary.main',
				borderColor: 'primary.main',
				_hover: {
					backgroundColor: 'background',
					color: 'primary.main',
					borderColor: 'primary.main',
				},
			},
			secondary: {
				backgroundColor: 'secondary.main',
				borderColor: 'secondary.main',
				_hover: {
					backgroundColor: 'background',
					color: 'secondary.main',
					borderColor: 'secondary.main',
				},
			},
			tertiary: {
				backgroundColor: 'tertiary.main',
				borderColor: 'tertiary.main',
				_hover: {
					backgroundColor: 'background',
					color: 'tertiary.main',
					borderColor: 'tertiary.main',
				},
			},
			black: {
				backgroundColor: 'black',
				borderColor: 'white',
				_hover: {
					backgroundColor: 'white',
					color: 'black',
					borderColor: 'black',
				},
			},
			gray: {
				backgroundColor: 'gray.main',
				borderColor: 'gray.main',
				_hover: {
					backgroundColor: 'background',
					color: 'gray.main',
					borderColor: 'gray.main',
				},
			},
			success: {
				backgroundColor: 'success.main',
				borderColor: 'success.main',
				_hover: {
					backgroundColor: 'background',
					color: 'success.main',
					borderColor: 'success.main',
				},
			},
			error: {
				backgroundColor: 'error.main',
				borderColor: 'error.main',
				_hover: {
					backgroundColor: 'background',
					color: 'error.main',
					borderColor: 'error.main',
				},
			},
			info: {
				backgroundColor: 'info.main',
				borderColor: 'info.main',
				_hover: {
					backgroundColor: 'background',
					color: 'info.main',
					borderColor: 'info.main',
				},
			},
			text: {
				backgroundColor: 'text.standard',
				borderColor: 'text.standard',
				_hover: {
					backgroundColor: 'background',
					color: 'text.standard',
					borderColor: 'text.standard',
				},
			},
			neutral: {
				backgroundColor: 'background',
				borderColor: 'structure',
				color: 'text.standard',
				_hover: {
					backgroundColor: 'elevated',
					color: 'text.standard',
					borderColor: 'structure',
				},
			},
		},
		size: {
			sm: {
				fontSize: '0.75rem',
				padding: '4px',
			},
			md: {
				fontSize: '1rem',
				padding: '8px',
			},
			lg: {
				fontSize: '1.25rem',
				padding: '12px',
			},
		},
		fullWidth: {
			true: {
				width: '100%',
			},
			false: {
				width: 'fit-content',
			},
		},
		disabled: {
			true: {
				opacity: 0.6,
				cursor: 'not-allowed',
			},
			false: {},
		},
	},
	compoundVariants: [
		// Disabled state overrides for all colors except black
		{
			color: 'primary',
			disabled: true,
			css: {
				_hover: {
					backgroundColor: 'primary.main',
					color: 'background',
					borderColor: 'primary.main',
				},
			},
		},
		{
			color: 'secondary',
			disabled: true,
			css: {
				_hover: {
					backgroundColor: 'secondary.main',
					color: 'background',
					borderColor: 'secondary.main',
				},
			},
		},
		{
			color: 'tertiary',
			disabled: true,
			css: {
				_hover: {
					backgroundColor: 'tertiary.main',
					color: 'background',
					borderColor: 'tertiary.main',
				},
			},
		},
		{
			color: 'gray',
			disabled: true,
			css: {
				_hover: {
					backgroundColor: 'gray.main',
					color: 'background',
					borderColor: 'gray.main',
				},
			},
		},
		{
			color: 'success',
			disabled: true,
			css: {
				_hover: {
					backgroundColor: 'success.main',
					color: 'background',
					borderColor: 'success.main',
				},
			},
		},
		{
			color: 'error',
			disabled: true,
			css: {
				_hover: {
					backgroundColor: 'error.main',
					color: 'background',
					borderColor: 'error.main',
				},
			},
		},
		{
			color: 'info',
			disabled: true,
			css: {
				_hover: {
					backgroundColor: 'info.main',
					color: 'background',
					borderColor: 'info.main',
				},
			},
		},
		{
			color: 'text',
			disabled: true,
			css: {
				_hover: {
					backgroundColor: 'text.standard',
					color: 'background',
					borderColor: 'text.standard',
				},
			},
		},
		// Special case for black when disabled
		{
			color: 'black',
			disabled: true,
			css: {
				_hover: {
					backgroundColor: 'black',
					color: 'background',
					borderColor: 'white',
				},
			},
		},
	],
	defaultVariants: {
		color: 'primary',
		size: 'md',
		fullWidth: false,
		disabled: false,
	},
});
