import React from 'react';
import { Button } from '../ui';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { TextInput } from './text-input';
import { NumberInput } from './number-input';

type CollectionArgs = {
	size: 'sm' | 'md' | 'lg';
	disabled: boolean;
	divider: boolean;
};

const meta = {
	title: 'Form Elements/Collection',
	tags: ['autodocs'],
	args: {
		size: 'lg',
		disabled: false,
		divider: false,
	},
	argTypes: {
		size: {
			control: 'radio',
			options: ['sm', 'md', 'lg'],
		},
		disabled: {
			control: 'boolean',
		},
		divider: {
			control: 'boolean',
		},
	},
} satisfies Meta<CollectionArgs>;

export default meta;

type Story = StoryObj<CollectionArgs>;

export const FormElements: Story = {
	render: ({ size, disabled, divider }) => (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				margin: 'auto',
				width: '75%',
				gap: '12px',
			}}
		>
			<TextInput
				name="text"
				title="Full Name"
				placeholder="Enter your name"
				size={size}
				disabled={disabled}
				divider={divider}
			/>
			<TextInput
				name="notes"
				title="Notes"
				placeholder="Write something…"
				multiline
				size={size}
				disabled={disabled}
				divider={divider}
			/>
			<NumberInput
				name="count"
				title="Quantity"
				defaultValue={5}
				min={1}
				max={10}
				size={size}
				disabled={disabled}
				divider={divider}
			/>
		</div>
	),
};

const ValidationForm = ({ size, disabled, divider }: CollectionArgs) => {
	const [username, setUsername] = React.useState('');
	const usernameError = username === 'admin' ? 'That username is taken' : undefined;

	return (
		<form
			noValidate={false}
			onSubmit={(e) => {
				e.preventDefault();
				alert('Submitted');
			}}
			style={{
				display: 'flex',
				flexDirection: 'column',
				margin: 'auto',
				width: '75%',
				gap: '12px',
			}}
		>
			<TextInput
				name="fullName"
				title="Full Name (required)"
				placeholder="Enter your name"
				required
				size={size}
				disabled={disabled}
				divider={divider}
			/>
			<TextInput
				name="email"
				title="Email (native type check)"
				type="email"
				placeholder="you@example.com"
				required
				size={size}
				disabled={disabled}
				divider={divider}
			/>
			<TextInput
				name="username"
				title="Username (custom error on `admin`)"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				error={usernameError}
				size={size}
				disabled={disabled}
				divider={divider}
			/>
			<NumberInput
				name="quantity"
				title="Quantity (required, 1–10)"
				min={1}
				max={10}
				required
				size={size}
				disabled={disabled}
				divider={divider}
			/>
			<div style={{ alignSelf: 'flex-end' }}>
				<Button type="submit">Submit</Button>
			</div>
		</form>
	);
};

export const Validation: Story = {
	render: (args) => <ValidationForm {...args} />,
};
