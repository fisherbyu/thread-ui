import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import useClientRule from './.eslint-rules/use-client.js';

export default [
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			parser: tseslint.parser,
		},
		plugins: {
			local: {
				rules: {
					'use-client': useClientRule,
				},
			},
		},
		rules: {
			'local/use-client': 'error',
		},
	},
	{
		ignores: ['dist/**', 'storybook-static/**', 'node_modules/**', '**/*.stories.{ts,tsx}'],
	},
];
