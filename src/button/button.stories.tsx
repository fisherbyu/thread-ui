import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta = {
	title: 'Components/Button',
	component: Button,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

// Default story with primary color
export const Default: Story = {
	args: {
		content: 'Default Button',
		color: 'primary',
		fullWidth: false,
	},
};

// Width variations
export const FullWidth: Story = {
	args: {
		content: 'Full Width Button',
		fullWidth: true,
	},
};

export const FitContent: Story = {
	args: {
		content: 'Fit Content Button',
		fullWidth: false,
	},
};

// Color variations
export const Primary: Story = {
	args: {
		content: 'Primary Button',
		color: 'primary',
	},
};

export const Secondary: Story = {
	args: {
		content: 'Secondary Button',
		color: 'secondary',
	},
};

export const Tertiary: Story = {
	args: {
		content: 'Tertiary Button',
		color: 'tertiary',
	},
};

export const Black: Story = {
	args: {
		content: 'Black Button',
		color: 'black',
	},
};

export const Grey: Story = {
	args: {
		content: 'Grey Button',
		color: 'grey',
	},
};

export const Success: Story = {
	args: {
		content: 'Success Button',
		color: 'success',
	},
};

export const Error: Story = {
	args: {
		content: 'Error Button',
		color: 'error',
	},
};

export const Info: Story = {
	args: {
		content: 'Info Button',
		color: 'info',
	},
};
