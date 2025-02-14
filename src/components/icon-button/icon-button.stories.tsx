import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './icon-button';

const meta: Meta<typeof IconButton> = {
	title: 'Components/IconButton',
	component: IconButton,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg'],
		},
		color: {
			control: 'select',
			options: ['primary', 'secondary', 'error'],
		},
		name: {
			control: 'select',
			options: ['search', 'close', 'menu'], // adjust based on your available icons
		},
		fullWidth: {
			control: 'boolean',
		},
	},
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const WithChildren: Story = {
	args: {
		name: 'MagnifyingGlass',
		size: 'md',
		color: 'primary',
		children: 'Search',
	},
};

export const Secondary: Story = {
	args: {
		name: 'List',
		size: 'md',
		color: 'secondary',
		children: 'Menu',
	},
};

export const FullWidth: Story = {
	args: {
		name: 'XSquare',
		size: 'md',
		color: 'primary',
		fullWidth: true,
		children: 'Close',
	},
};
