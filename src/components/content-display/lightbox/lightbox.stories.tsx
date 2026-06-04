import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Lightbox } from './lightbox';

const meta: Meta<typeof Lightbox> = {
	title: 'Components/Lightbox',
	component: Lightbox,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		// Add your prop controls here
	},
};

export default meta;

type Story = StoryObj<typeof Lightbox>;

export const Default: Story = {
	args: {},
};
