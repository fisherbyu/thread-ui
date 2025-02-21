import type { Preview } from '@storybook/react';
import '../src/styles/thread.css';
import { createTheme, ThemeProvider } from '../src/utils';

const threadConfig = {
	colors: {
		primary: {
			light: '#4f46e5',
			main: '#4338ca',
			dark: '#3730a3',
		},
	},
} as const;

// Initialize Theme
export const TestConfig = createTheme({});

const preview: Preview = {
	decorators: [
		(Story) => (
			<ThemeProvider initialTheme={TestConfig} initialMode="light">
				{/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
				<Story />
			</ThemeProvider>
		),
	],
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
};

export default preview;
