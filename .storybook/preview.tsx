import React from 'react';
import type { Preview } from '@storybook/react';
import '../src/styles/thread.css';
import { createTheme, ThemeProvider } from '../src/utils';

const threadConfig = {} as const;

// Initialize Theme
export const TestConfig = createTheme(threadConfig);

const preview: Preview = {
	decorators: [
		(Story, context) => {
			// Get the current theme mode from toolbar
			const themeMode = context.globals.theme || 'light';

			return (
				<ThemeProvider initialTheme={TestConfig} initialMode={themeMode}>
					<Story />
				</ThemeProvider>
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
