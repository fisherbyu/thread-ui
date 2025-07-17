import { defineRecipe } from '@pandacss/dev';

export const inputRecipe = defineRecipe({
	className: 'input',
	description: 'Input component with standard and alt variants',
	base: {
		// Layout
		px: '4',
		py: '2',

		// Border
		border: '1px solid',
		borderColor: 'gray.300',
		borderRadius: 'md',

		// Focus states
		outline: 'none',
		transition: 'colors',
		_focus: {
			outline: 'none',
			ringWidth: '2',
			ringColor: 'blue.500',
			borderColor: 'transparent',
		},
	},
	variants: {
		variant: {
			standard: {
				width: 'full',
			},
			alt: {
				// No width specified, inherits default width behavior
			},
		},
	},
	defaultVariants: {
		variant: 'standard',
	},
});
