import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './modal';

const meta = {
	title: 'Components/Modal',
	component: Modal,
	parameters: {
		layout: 'centered',
	},
	decorators: [
		(Story) => (
			<div style={{ background: '#f0f0f0', width: '740px', minHeight: '50vh' }}>
				<Story />
			</div>
		),
	],
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg', 'full'],
		},
		placement: {
			control: 'select',
			options: ['center', 'top'],
		},
	},
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof Modal>;

const ModalContent = () => (
	<div style={{ padding: '24px' }}>
		<h2 style={{ margin: '0 0 8px' }}>Modal Title</h2>
		<p style={{ margin: 0, color: '#666' }}>
			This is some placeholder content so you can see the modal shape and sizing as you build
			it out.
		</p>
	</div>
);

export const Default: Story = {
	args: {
		open: true,
		onClose: () => {},
		size: 'md',
		title: 'Modal Title',
		children: <ModalContent />,
	},
};

export const Small: Story = {
	args: {
		open: true,
		onClose: () => {},
		size: 'sm',
		children: <ModalContent />,
	},
};

export const Large: Story = {
	args: {
		open: true,
		onClose: () => {},
		size: 'lg',
		children: <ModalContent />,
	},
};

export const Full: Story = {
	args: {
		open: true,
		onClose: () => {},
		size: 'full',
		children: <ModalContent />,
	},
};
