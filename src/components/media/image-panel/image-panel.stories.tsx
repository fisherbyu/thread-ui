import type { Meta, StoryObj } from '@storybook/react';
import { ImagePanel } from './image-panel';

const meta: Meta<typeof ImagePanel> = {
	title: 'Components/ImagePanel',
	component: ImagePanel,
	tags: ['autodocs'],
	argTypes: {
		titleColor: {
			control: 'select',
			options: ['standard', 'primary', 'secondary', 'inverse'],
		},
		contentBelow: { control: 'boolean' },
		contentLeft: { control: 'boolean' },
	},
};

export default meta;
type Story = StoryObj<typeof ImagePanel>;

export const Default: Story = {
	args: {
		title: 'A Compelling Headline',
		subtitle: 'An optional subtitle that adds more context',
		contents: [
			'This is the first paragraph of content. It can be as long or as short as needed to convey the message.',
			'This is a second paragraph. Multiple content blocks are supported.',
		],
		image: {
			src: 'https://placehold.co/800x600',
			alt: 'Placeholder image',
		},
		contentBelow: false,
		contentLeft: false,
		titleColor: 'standard',
	},
};
