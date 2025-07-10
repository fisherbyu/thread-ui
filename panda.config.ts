import { defineConfig } from '@pandacss/dev';

export default defineConfig({
	// Build Declarations
	include: ['./src/**/*.{ts,tsx,js,jsx}'],

	// The output directory for your css system
	outdir: 'src/styled-system',

	layers: {
		reset: 'thread-reset',
		base: 'thread-base',
		tokens: 'thread-tokens',
		recipes: 'thread-recipes',
		utilities: 'thread-utilities',
	},
});
