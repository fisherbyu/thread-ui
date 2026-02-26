import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DotsLoader } from './dots-loader';

const meta: Meta<typeof DotsLoader> = {
	title: 'UI Components/Loaders/DotsLoader',
	component: DotsLoader,
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
			options: ['primary', 'secondary', 'tertiary', 'black', 'gray', 'text'],
		},
		label: {
			control: 'text',
		},
	},
};

export default meta;
type Story = StoryObj<typeof DotsLoader>;

export const Default: Story = {
	args: {
		size: 'md',
		color: 'primary',
	},
};
