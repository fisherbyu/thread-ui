import type { Meta, StoryObj } from '@storybook/react';
import { ColumnLayout } from './column-layout';

// Sample items for demonstration
const SampleCard = ({ height, color }: { height: number; color: string }) => (
	<div
		className="thread-w-full thread-rounded-lg"
		style={{
			height: `${height}px`,
			backgroundColor: color,
		}}
	/>
);

const meta: Meta<typeof ColumnLayout> = {
	title: 'Layouts/ColumnLayout',
	component: ColumnLayout,
	parameters: {
		layout: 'fullscreen',
	},
	tags: ['autodocs'],
	argTypes: {
		container: {
			control: 'boolean',
		},
	},
};

export default meta;
type Story = StoryObj<typeof ColumnLayout>;

// Helper function to generate colored cards
const ColorCard = ({ color }: { color: string }) => (
	<div
		className="thread-w-full thread-aspect-video thread-rounded"
		style={{ backgroundColor: color }}
	/>
);

export const Basic: Story = {
	args: {
		title: 'Our Services',
		description: 'Explore our range of solutions',
		mdcol: 2,
		lgcol: 4,
		container: true,
		items: [
			{
				title: 'Web Development',
				description: 'Building responsive and modern web applications',
				content: <ColorCard color="#60A5FA" />,
			},
			{
				title: 'Mobile Apps',
				description: 'Native and cross-platform mobile solutions',
				content: <ColorCard color="#34D399" />,
			},
			{
				title: 'Cloud Services',
				description: 'Scalable cloud infrastructure and deployment',
				content: <ColorCard color="#F87171" />,
			},
			{
				title: 'UI/UX Design',
				description: 'User-centered design and prototyping',
				content: <ColorCard color="#A78BFA" />,
			},
		],
	},
};

export const WithImages: Story = {
	args: {
		title: 'About Me',
		description: "Some of the places I've lived!",
		mdcol: 2,
		lgcol: 4,
		container: true,
		items: [
			{
				title: 'Title',
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
				content: <SampleCard height={180} color="#60A5FA" />,
			},
			{
				title: 'Title',
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
				content: <SampleCard height={180} color="#F472B6" />,
			},
			{
				title: 'Title',
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
				content: <SampleCard height={180} color="#A78BFA" />,
			},
			{
				title: 'Title',
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
				content: <SampleCard height={180} color="#34D399" />,
			},
		],
	},
};
