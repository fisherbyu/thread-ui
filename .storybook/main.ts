import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';

const config: StorybookConfig = {
	staticDirs: ['./assets'],
	stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],
	framework: {
		name: '@storybook/react-vite',
		options: {},
	},
	typescript: { check: true, reactDocgen: 'react-docgen-typescript' },
	async viteFinal(config) {
		const { mergeConfig } = await import('vite');
		return mergeConfig(config, {
			resolve: {
				alias: {
					'@': path.resolve(__dirname, '../src'),
				},
			},
			build: {
				rollupOptions: {
					output: {
						manualChunks(id: any) {
							// Keep all src modules in one chunk, let Rollup only split node_modules
							if (id.includes('/src/')) return 'components';
						},
					},
				},
			},
		});
	},
};
export default config;
