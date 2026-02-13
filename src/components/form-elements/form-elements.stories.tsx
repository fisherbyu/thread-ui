import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { TextInput } from './text-input';
import { NumberInput } from './number-input';

const meta = {
	title: 'Components/Form Elements',
	tags: ['autodocs'],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const FormElements: Story = {
	render: () => (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				margin: 'auto',
				width: '75%',
				gap: '16px',
			}}
		>
			<TextInput name="text" title="Full Name" placeholder="Enter your name" />
			<TextInput name="notes" title="Notes" placeholder="Write something…" multiline />
			<NumberInput name="count" title="Quantity" value={5} min={1} max={10} />
		</div>
	),
};
