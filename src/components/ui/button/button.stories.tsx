import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta = {
	title: 'UI Components/Button',
	component: Button,
	parameters: {
		layout: 'centered',
	},
	decorators: [(Story) => <Story />],
	argTypes: {
		onClick: { action: 'clicked' },
		disabled: {
			control: 'boolean',
		},
		text: {
			control: 'boolean',
			description: 'Renders the button as a text-only variant with no background or border',
		},
		highlightOnHover: {
			control: 'boolean',
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
	args: {
		children: 'Default Button',
		color: 'primary',
		fullWidth: false,
		onClick: () => alert('Button clicked!'),
		disabled: false,
	},
};

export const Text: Story = {
	args: {
		children: 'Text Button',
		color: 'primary',
		text: true,
		onClick: () => alert('Button clicked!'),
		disabled: false,
	},
};
