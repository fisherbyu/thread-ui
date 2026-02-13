import { defineConfig } from '@pandacss/dev';
import { buttonRecipe } from './src/components/ui/button/button-recipe';
import { ThreadTheme } from './src/theme/thread-theme';

export default defineConfig({
	// File Intake and Output
	include: ['./src/**/*.{ts,tsx,js,jsx}'],
	outdir: 'src/styled-system',

	// Prefix
	prefix: 'thread-ui',
	preflight: true,

	// Define Access to Theme Variables
	theme: {
		extend: {
			recipes: {
				button: buttonRecipe,
			},
			tokens: {
				colors: {
					// Primary colors
					primary: {
						light: { value: ThreadTheme.primary.light },
						main: { value: ThreadTheme.primary.main },
						dark: { value: ThreadTheme.primary.dark },
					},
					// Secondary colors
					secondary: {
						light: { value: ThreadTheme.secondary.light },
						main: { value: ThreadTheme.secondary.main },
						dark: { value: ThreadTheme.secondary.dark },
					},
					// Tertiary colors
					tertiary: {
						light: { value: ThreadTheme.tertiary.light },
						main: { value: ThreadTheme.tertiary.main },
						dark: { value: ThreadTheme.tertiary.dark },
					},
					// Neutral colors
					white: { value: ThreadTheme.white },
					black: { value: ThreadTheme.black },
					gray: {
						light: { value: ThreadTheme.gray.light },
						main: { value: ThreadTheme.gray.main },
						dark: { value: ThreadTheme.gray.dark },
					},
					// Status colors
					success: {
						light: { value: ThreadTheme.success.light },
						main: { value: ThreadTheme.success.main },
						dark: { value: ThreadTheme.success.dark },
					},
					warning: {
						light: { value: ThreadTheme.warning.light },
						main: { value: ThreadTheme.warning.main },
						dark: { value: ThreadTheme.warning.dark },
					},
					error: {
						light: { value: ThreadTheme.error.light },
						main: { value: ThreadTheme.error.main },
						dark: { value: ThreadTheme.error.dark },
					},
					info: {
						light: { value: ThreadTheme.info.light },
						main: { value: ThreadTheme.info.main },
						dark: { value: ThreadTheme.info.dark },
					},
				},
				// Border radius tokens
				radii: {
					sm: { value: ThreadTheme.borderRadius.sm },
					md: { value: ThreadTheme.borderRadius.md },
					lg: { value: ThreadTheme.borderRadius.lg },
				},
				// Border size tokens
				borderWidths: {
					sm: { value: ThreadTheme.borderSize.sm },
					md: { value: ThreadTheme.borderSize.md },
					lg: { value: ThreadTheme.borderSize.lg },
				},
			},
			semanticTokens: {
				colors: {
					// Surface colors — active variable already handles light/dark switching
					background: { value: ThreadTheme.background },
					surface: { value: ThreadTheme.surface },
					elevated: { value: ThreadTheme.elevated },
					structure: { value: ThreadTheme.structure },
					// Text colors — active variable already handles light/dark switching
					text: {
						standard: { value: ThreadTheme.text.standard },
						secondary: { value: ThreadTheme.text.secondary },
						disabled: { value: ThreadTheme.text.disabled },
						accent: { value: ThreadTheme.text.accent },
						inverted: { value: ThreadTheme.text.inverted },
					},
				},
			},
		},
	},

	// Patterns (Default Styles)
	patterns: {
		container: {
			description: 'Standard Container',
			properties: {},
			transform(props) {
				return {
					width: '100%',
					marginRight: 'auto',
					marginLeft: 'auto',
					maxWidth: '1400px',
					paddingRight: '2rem',
					paddingLeft: '2rem',
				} as any;
			},
		},
	},
	// CSS Layering
	layers: {
		reset: 'thread-reset',
		base: 'thread-base',
		tokens: 'thread-tokens',
		recipes: 'thread-recipes',
		utilities: 'thread-utilities',
	},
});
