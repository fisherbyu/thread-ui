import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../../ui';
import { Dropdown } from './dropdown/dropdown';
import { MultiDropdown } from './multi-dropdown/multi-dropdown';

const meta: Meta<typeof Dropdown> = {
	title: 'Data Input/Dropdown',
	component: Dropdown,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: { type: 'select' },
			options: ['sm', 'md', 'lg'],
			description: 'Size applied to all filter dropdowns',
		},
		variant: {
			control: { type: 'radio' },
			options: ['field', 'button'],
		},
		color: {
			control: { type: 'select' },
			options: ['neutral', 'primary'],
		},
	},
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

const options = [
	{ label: 'Apple', value: 'apple' },
	{ label: 'Banana', value: 'banana' },
	{ label: 'Cherry', value: 'cherry' },
];

const ControlledDropdown = (args: any) => {
	const [value, setValue] = useState<string | number | null>(null);
	return <Dropdown {...args} value={value} onChange={setValue} />;
};

const ControlledMultiDropdown = (args: any) => {
	const [value, setValue] = useState<(string | number)[]>([]);
	return <MultiDropdown {...args} value={value} onChange={setValue} />;
};

export const Default: Story = {
	render: (args) => <ControlledDropdown {...args} />,
	args: {
		name: 'fruit',
		title: 'Fruit',
		options,
		placeholder: 'Select a fruit...',
		size: 'md',
	},
};

export const Multi: Story = {
	render: (args) => <ControlledMultiDropdown {...args} />,
	args: {
		name: 'fruits',
		title: 'Fruits',
		options,
		placeholder: 'Select fruits...',
		size: 'md',
	},
};

export const ButtonVariant: Story = {
	render: (args) => <ControlledMultiDropdown {...args} />,
	args: {
		name: 'fruitFilter',
		title: 'Fruits',
		options,
		variant: 'button',
		showLabel: false,
		size: 'md',
	},
};

export const Validation: Story = {
	render: (args) => (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				alert(JSON.stringify(Object.fromEntries(new FormData(e.currentTarget))));
			}}
			style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '320px' }}
		>
			<Dropdown {...args} name="fruit" title="Fruit (required)" options={options} required />
			<MultiDropdown
				size={args.size}
				variant={args.variant}
				name="fruits"
				title="Fruits (required)"
				options={options}
				required
			/>
			<div style={{ alignSelf: 'flex-end' }}>
				<Button type="submit">Submit</Button>
			</div>
		</form>
	),
	args: {
		size: 'md',
	},
};
