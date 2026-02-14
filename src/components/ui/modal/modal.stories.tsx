import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './modal';
import { Button } from '../button';

const meta = {
	title: 'Components/Modal',
	component: Modal,
	parameters: {
		layout: 'centered',
	},
	decorators: [
		(Story) => (
			<div
				style={{
					background: '#f0f0f0',
					width: '740px',
					minHeight: '50vh',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
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
		<p style={{ margin: 0, color: '#666' }}>
			This is some placeholder content so you can see the modal shape and sizing as you build
			it out.
		</p>
	</div>
);

const ModalTrigger = ({ size, title }: { size?: 'sm' | 'md' | 'lg' | 'full'; title?: string }) => {
	const [open, setOpen] = useState(false);
	return (
		<>
			<Button onClick={() => setOpen(true)}>Open Modal</Button>
			<Modal open={open} onClose={() => setOpen(false)} size={size} title={title}>
				<ModalContent />
			</Modal>
		</>
	);
};

export const Default: Story = {
	render: () => <ModalTrigger size="md" title="Modal Title" />,
};

export const Small: Story = {
	render: () => <ModalTrigger size="sm" title="Small Modal" />,
};

export const Large: Story = {
	render: () => <ModalTrigger size="lg" title="Large Modal" />,
};

export const Full: Story = {
	render: () => <ModalTrigger size="full" title="Full Modal" />,
};
