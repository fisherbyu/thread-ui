import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './card';

const meta = {
	title: 'Components/Card',
	component: Card,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		surfaceColor: {
			control: 'select',
			options: ['background', 'surface', 'elevated'],
		},
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg'],
		},
		title: {
			control: 'text',
		},
	},
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
	args: {
		surfaceColor: 'background',
		size: 'md',
		children: <p>This is a card component with some content inside.</p>,
	},
};

export const WithTitle: Story = {
	args: {
		title: 'Card Title',
		children: <p>This card has a title and some content.</p>,
	},
};

export const Small: Story = {
	args: {
		size: 'sm',
		title: 'Small Card',
		children: <p>This is a smaller card.</p>,
	},
};

export const Large: Story = {
	args: {
		size: 'lg',
		title: 'Large Card',
		children: <p>This is a larger card with more padding.</p>,
	},
};
