import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './skeleton';

const meta: Meta<typeof Skeleton> = {
	title: 'UI Components/Loaders/Skeleton',
	component: Skeleton,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		w: {
			control: 'text',
		},
		h: {
			control: 'text',
		},
		round: {
			control: 'boolean',
		},
	},
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
	args: {
		w: '200px',
		h: '3rem',
		round: false,
	},
};

export const Circle: Story = {
	args: {
		w: '3rem',
		h: '3rem',
		round: true,
	},
};

export const Card: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '300px' }}>
			<Skeleton w="100%" h="160px" />
			<Skeleton w="70%" h="1rem" />
			<Skeleton w="100%" h="0.75rem" />
			<Skeleton w="90%" h="0.75rem" />
		</div>
	),
};
