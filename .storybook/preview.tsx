import React from 'react';
import type { Preview } from '@storybook/react';
import '../src/styles/thread.css'; // Thread Theme Variables
import '../src/styles/styles.css'; // Tailwind Output
import '../src/styles/panda.css'; // Panda Compiled Code
import { ThreadTheme } from '../src';

const threadConfig = {} as const;

// Initialize Theme
// export const TestConfig = createTheme(threadConfig);

const preview: Preview = {
	decorators: [
		(Story, context) => {
			// Get the current theme mode from toolbar
			const themeMode = context.globals.theme || 'light';

			return (
				<div style={{ backgroundColor: ThreadTheme.background }}>
					<Story />
				</div>
			);
		},
	],
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		options: {
			storySort: {
				order: [
					'UI Components',
					'Media',
					'Typography',
					'Navigation',
					'Layouts',
					'Form Elements',
					'*',
				],
			},
		},
	},

	// Add global toolbar item for theme switching
	globalTypes: {
		theme: {
			name: 'Theme',
			description: 'Global theme for components',
			defaultValue: 'light',
			toolbar: {
				icon: 'circlehollow',
				items: [
					{ value: 'light', icon: 'sun', title: 'Light' },
					{ value: 'dark', icon: 'moon', title: 'Dark' },
				],
				// Show tool tip with current theme
				showName: true,
				// Change toolbar icon based on selected theme
				dynamicTitle: true,
			},
		},
	},
};

export default preview;
