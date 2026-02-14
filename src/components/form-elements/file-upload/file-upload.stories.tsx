import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FileUpload } from './file-upload';

const meta = {
	title: 'Components/FileUpload',
	component: FileUpload,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		// Add your prop controls here
	},
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {
	args: {
		// Add your default props here
	},
};
