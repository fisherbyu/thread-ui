import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta = {
	title: 'Components/Button',
	component: Button,
	parameters: {
		layout: 'centered',
	},
	decorators: [
		(Story) => (
			<div style={{ width: '300px' }}>
				<Story />
			</div>
		),
	],
	argTypes: {
		onClick: { action: 'clicked' },
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

// Default story with primary color
export const Default: Story = {
	args: {
		children: 'Default Button',
		color: 'primary',
		fullWidth: false,
	},
};

// Width variations
export const FullWidth: Story = {
	args: {
		children: 'Full Width Button',
		fullWidth: true,
	},
};

// Interactive example
export const WithClickHandler: Story = {
	args: {
		children: 'Click Me!',
		color: 'success',
		onClick: () => alert('Button clicked!'),
	},
};

// Color variations
export const Primary: Story = {
	args: {
		children: 'Primary Button',
		color: 'primary',
	},
};

export const Secondary: Story = {
	args: {
		children: 'Secondary Button',
		color: 'secondary',
	},
};

export const Tertiary: Story = {
	args: {
		children: 'Tertiary Button',
		color: 'tertiary',
	},
};

export const Black: Story = {
	args: {
		children: 'Black Button',
		color: 'black',
	},
};

export const Grey: Story = {
	args: {
		children: 'Grey Button',
		color: 'grey',
	},
};

export const Success: Story = {
	args: {
		children: 'Success Button',
		color: 'success',
	},
};

export const Error: Story = {
	args: {
		children: 'Error Button',
		color: 'error',
	},
};

export const Info: Story = {
	args: {
		children: 'Info Button',
		color: 'info',
	},
};
