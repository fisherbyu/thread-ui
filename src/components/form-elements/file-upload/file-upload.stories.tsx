'use client';
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FileUpload } from './file-upload';
import { UploadableFile } from './file-upload.types';

const meta = {
	title: 'Form Elements/FileUpload',
	component: FileUpload,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg'],
		},
		maxNumberFiles: {
			control: 'number',
		},
		maxFileSize: {
			control: 'number',
		},
	},
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {
	render: (args) => {
		const [files, onChange] = useState<UploadableFile[]>([]);
		return <FileUpload {...args} files={files} onChange={onChange} />;
	},
	args: {
		name: 'file-upload',
		title: 'Upload a File',
		size: 'md',
		allowedFileTypes: ['*/*'],
		supportedFormatsText: 'Supports all file types',
	},
};

export const ImageOnly: Story = {
	render: (args) => {
		const [files, onChange] = useState<UploadableFile[]>([]);
		return <FileUpload {...args} files={files} onChange={onChange} />;
	},
	args: {
		name: 'image-upload',
		title: 'Upload an Image',
		size: 'lg',
		allowedFileTypes: ['image/*'],
		maxFileSize: 5 * 1024 * 1024, // 5MB
		maxNumberFiles: 3,
		supportedFormatsText: 'PNG, JPG, GIF up to 5MB',
		required: true,
	},
};
