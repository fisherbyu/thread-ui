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
	managerHead: (head) => `
        ${head}
        <script>
            // Title override
            new MutationObserver(function() {
                if (document.title !== 'Thread UI') {
                    document.title = 'Thread UI';
                }
            }).observe(document.querySelector('title'), {
                childList: true,
                subtree: true,
                characterData: true
            });
            // Favicon override
            new MutationObserver(function() {
                var icons = document.querySelectorAll("link[rel='icon'], link[rel*='icon']");
                icons.forEach(function(icon) {
                    if (icon.href.indexOf('icon.ico') === -1) {
                        icon.href = '/icon.ico';
                        icon.type = 'image/x-icon';
                    }
                });
            }).observe(document.head, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['href']
            });
        </script>
    `,
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
