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
	],
	defaultVariants: {
		color: 'primary',
		size: 'md',
		fullWidth: false,
		disabled: false,
	},
});
