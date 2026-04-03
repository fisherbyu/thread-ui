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
		whiteSpace: 'nowrap',
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
			warning: {
				backgroundColor: 'warning.main',
				borderColor: 'warning.main',
				_hover: {
					backgroundColor: 'background',
					color: 'warning.main',
					borderColor: 'warning.main',
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
				color: 'text.inverted',
				borderColor: 'text.standard',
				_hover: {
					backgroundColor: 'background',
					color: 'text.standard',
					borderColor: 'text.standard',
				},
			},
			neutral: {
				backgroundColor: 'background',
				borderColor: 'text.standard',
				color: 'text.standard',
				_hover: {
					backgroundColor: 'background',
					color: 'text.standard',
					borderColor: 'text.standard',
					borderWidth: 'lg',
				},
			},
		},
		size: {
			sm: {
				gap: '1', // 4px
				fontSize: '0.5rem', // 8px
				padding: '1', // 4px
			},
			md: {
				gap: '2', // 8px
				fontSize: '1rem', // 16px
				padding: '2', // 8px
			},
			lg: {
				gap: '3', // 12px
				fontSize: '1.5rem', // 24px
				padding: '3', // 12px
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
		textVariant: {
			true: {
				backgroundColor: 'background',
				borderColor: 'transparent',
				border: 'none',
				_hover: {
					textDecoration: 'underline',
				},
			},
		},
		highlightOnHover: {
			true: {},
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
			color: 'warning',
			disabled: true,
			css: {
				_hover: {
					backgroundColor: 'warning.main',
					color: 'background',
					borderColor: 'warning.main',
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
		{
			color: 'neutral',
			disabled: true,
			css: {
				_hover: {
					backgroundColor: 'background',
					color: 'text.standard',
					borderColor: 'text.standard',
					borderWidth: 'md',
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
		{
			textVariant: true,
			disabled: true,
			css: {
				_hover: {
					textDecoration: 'none',
					backgroundColor: 'transparent',
				},
			},
		},
		// textVariant color overrides — inherit the color's main value as text color
		{
			textVariant: true,
			color: 'primary',
			css: { color: 'primary.main', _hover: { color: 'primary.main' } },
		},
		{
			textVariant: true,
			color: 'secondary',
			css: { color: 'secondary.main', _hover: { color: 'secondary.main' } },
		},
		{
			textVariant: true,
			color: 'tertiary',
			css: { color: 'tertiary.main', _hover: { color: 'tertiary.main' } },
		},
		{
			textVariant: true,
			color: 'gray',
			css: { color: 'gray.main', _hover: { color: 'gray.main' } },
		},
		{
			textVariant: true,
			color: 'success',
			css: { color: 'success.main', _hover: { color: 'success.main' } },
		},
		{
			textVariant: true,
			color: 'warning',
			css: { color: 'warning.main', _hover: { color: 'warning.main' } },
		},
		{
			textVariant: true,
			color: 'error',
			css: { color: 'error.main', _hover: { color: 'error.main' } },
		},
		{
			textVariant: true,
			color: 'info',
			css: { color: 'info.main', _hover: { color: 'info.main' } },
		},
		{
			textVariant: true,
			color: 'neutral',
			css: { color: 'text.standard', _hover: { color: 'text.standard' } },
		},
		{
			textVariant: true,
			color: 'black',
			css: { color: 'black', _hover: { color: 'black' } },
		},
		{
			textVariant: true,
			color: 'text',
			css: { color: 'text.standard', _hover: { color: 'text.standard' } },
		},
		// highlightOnHover overrides
		{
			highlightOnHover: true,
			disabled: false,
			textVariant: false,
			color: 'primary',
			css: { _hover: { backgroundColor: 'primary.light', borderColor: 'primary.main' } },
		},
		{
			highlightOnHover: true,
			disabled: false,
			textVariant: false,
			color: 'secondary',
			css: { _hover: { backgroundColor: 'secondary.light', borderColor: 'secondary.main' } },
		},
		{
			highlightOnHover: true,
			disabled: false,
			textVariant: false,
			color: 'tertiary',
			css: { _hover: { backgroundColor: 'tertiary.light', borderColor: 'tertiary.main' } },
		},
		{
			highlightOnHover: true,
			disabled: false,
			textVariant: false,
			color: 'gray',
			css: { _hover: { backgroundColor: 'gray.light', borderColor: 'gray.main' } },
		},
		{
			highlightOnHover: true,
			disabled: false,
			textVariant: false,
			color: 'success',
			css: { _hover: { backgroundColor: 'success.light', borderColor: 'success.main' } },
		},
		{
			highlightOnHover: true,
			disabled: false,
			textVariant: false,
			color: 'warning',
			css: { _hover: { backgroundColor: 'warning.light', borderColor: 'warning.main' } },
		},
		{
			highlightOnHover: true,
			disabled: false,
			textVariant: false,
			color: 'error',
			css: { _hover: { backgroundColor: 'error.light', borderColor: 'error.main' } },
		},
		{
			highlightOnHover: true,
			disabled: false,
			textVariant: false,
			color: 'info',
			css: { _hover: { backgroundColor: 'info.light', borderColor: 'info.main' } },
		},
		{
			highlightOnHover: true,
			disabled: false,
			textVariant: false,
			color: 'black',
			css: { _hover: { backgroundColor: 'gray.light', borderColor: 'white' } },
		},
		{
			highlightOnHover: true,
			disabled: false,
			textVariant: false,
			color: 'text',
			css: { _hover: { backgroundColor: 'surface', borderColor: 'text.standard' } },
		},
		{
			highlightOnHover: true,
			disabled: false,
			textVariant: false,
			color: 'neutral',
			css: { _hover: { backgroundColor: 'surface', borderColor: 'text.standard' } },
		},
	],
	defaultVariants: {
		color: 'primary',
		size: 'md',
		fullWidth: false,
		disabled: false,
	},
});
