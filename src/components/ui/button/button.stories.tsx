import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta = {
	title: 'UI Components/Button',
	component: Button,
	parameters: {
		layout: 'centered',
	},
	decorators: [
		(Story) => (
			<div style={{ width: '300px', height: '150px', display: 'flex', alignItems: 'center' }}>
				<Story />
			</div>
		),
	],
	argTypes: {
		onClick: { action: 'clicked' },
		disabled: {
			control: 'boolean',
		},
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
		onClick: () => alert('Button clicked!'),
		disabled: false,
	},
};
