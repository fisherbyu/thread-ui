import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { TextInput } from './text-input';
import { NumberInput } from './number-input';

type CollectionArgs = {
	size: 'sm' | 'md' | 'lg';
};

const meta = {
	title: 'Form Elements/Collection',
	tags: ['autodocs'],
	args: {
		size: 'lg',
	},
	argTypes: {
		size: {
			control: 'radio',
			options: ['sm', 'md', 'lg'],
		},
	},
} satisfies Meta<CollectionArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FormElements: Story = {
	render: ({ size }) => (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				margin: 'auto',
				width: '75%',
				gap: '12px',
			}}
		>
			<TextInput name="text" title="Full Name" placeholder="Enter your name" size={size} />
			<TextInput
				name="notes"
				title="Notes"
				placeholder="Write something…"
				multiline
				size={size}
			/>
			<NumberInput name="count" title="Quantity" value={5} min={1} max={10} size={size} />
		</div>
	),
};
