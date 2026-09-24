'use client';
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { FileUpload } from './file-upload';
import { FileUploadItem, RemoteFile } from './file-upload.types';
import { Button } from '../../ui';

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
		editMode: {
			control: 'radio',
			options: ['none', 'on-demand', 'on-add'],
		},
		maxFiles: {
			control: 'number',
		},
		maxSize: {
			control: 'number',
		},
	},
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof FileUpload>;

const existingFiles: RemoteFile[] = [
	{
		id: 'img_1015',
		src: 'https://picsum.photos/id/1015/400/300',
		name: 'river.jpg',
		alt: 'River running through a valley',
	},
	{
		id: 'doc_42',
		src: 'https://example.com/files/brief.pdf',
		name: 'brief.pdf',
		type: 'application/pdf',
		size: 245760,
	},
];

export const Default: Story = {
	render: (args: any) => {
		const [files, onChange] = useState<FileUploadItem[]>([]);
		return <FileUpload {...args} value={files} onChange={onChange} />;
	},
	args: {
		name: 'file-upload',
		title: 'Upload a File',
		size: 'md',
	},
};

export const ImageOnly: Story = {
	render: (args: any) => {
		const [files, onChange] = useState<FileUploadItem[]>([]);
		return <FileUpload {...args} value={files} onChange={onChange} />;
	},
	args: {
		name: 'image-upload',
		title: 'Image',
		emptyTitle: 'Upload an Image',
		size: 'lg',
		accept: 'image/*',
		maxSize: 5 * 1024 * 1024, // 5MB
		maxFiles: 1,
		required: true,
	},
};

export const EditForm: Story = {
	render: (args: any) => (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				const data = new FormData(e.currentTarget);
				const files = data
					.getAll('attachments')
					.map((entry) =>
						entry instanceof File ? `new: ${entry.name}` : `kept: ${entry}`
					);
				alert(`${files.join('\n')}\n\nmeta: ${data.get('attachmentsMeta')}`);
			}}
			style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '480px' }}
		>
			<FileUpload {...args} />
			<div style={{ display: 'flex', gap: '8px', alignSelf: 'flex-end' }}>
				<Button type="reset" color="neutral">
					Reset
				</Button>
				<Button type="submit">Save</Button>
			</div>
		</form>
	),
	args: {
		name: 'attachments',
		title: 'Attachments',
		defaultValue: existingFiles,
		accept: 'image/*,.pdf',
		maxSize: 5 * 1024 * 1024,
		maxFiles: 4,
		editMode: 'on-add',
		required: true,
		size: 'md',
	},
};
