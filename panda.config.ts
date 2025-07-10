import { defineConfig } from '@pandacss/dev';

export default defineConfig({
	// Whether to use css reset
	preflight: true,

	// Build Declarations
	include: ['./src/**/*.{ts,tsx,js,jsx}'],

	// The output directory for your css system
	outdir: 'src/styled-system',
});
