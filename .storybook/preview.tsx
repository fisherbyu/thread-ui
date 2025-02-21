import type { Preview } from '@storybook/react';
import '../src/styles/thread.css';
import { createTheme, ThemeProvider } from '../src/utils';

const threadConfig = {} as const;

// Initialize Theme
export const TestConfig = createTheme(threadConfig);

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
