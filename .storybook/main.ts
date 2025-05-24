import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';

const config: StorybookConfig = {
	stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: [
		'@storybook/addon-webpack5-compiler-swc',
		'@storybook/addon-onboarding',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
	],
	framework: {
		name: '@storybook/react-webpack5',
		options: {},
	},
	typescript: { check: true, reactDocgen: 'react-docgen-typescript' },
	webpackFinal: async (config) => {
		// Add alias configuration
		config.resolve = config.resolve || {};
		config.resolve.alias = {
			...config.resolve.alias,
			'@': path.resolve(__dirname, '../src'),
		};
		if (!config.module?.rules) return config;

		// Add TypeScript handling
		config.module.rules.push({
			test: /\.(ts|tsx)$/,
			exclude: /node_modules/,
			use: [
				{
					loader: 'ts-loader',
					options: {
						transpileOnly: true,
					},
				},
			],
		});
		return config;
	},
};

export default config;
