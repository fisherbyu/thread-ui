import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SpinLoader } from './spin-loader';

const meta: Meta<typeof SpinLoader> = {
	title: 'Components/SpinLoader',
	component: SpinLoader,
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
type Story = StoryObj<typeof SpinLoader>;

export const Default: Story = {
	args: {
		size: 'md',
		color: 'primary',
	},
};
