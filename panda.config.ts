import { defineConfig } from '@pandacss/dev';
import { CONTAINER_STYLES } from './src/defaults';

export default defineConfig({
	// File Intake and Output
	include: ['./src/**/*.{ts,tsx,js,jsx}'],
	outdir: 'src/styled-system',

	// Patterns (Default Styles)
	patterns: {
		container: {
			description: 'Standard Container',
			properties: {},
			transform(props) {
				return CONTAINER_STYLES as any;
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
