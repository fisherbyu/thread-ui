import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './dropdown/dropdown';
import { MultiDropdown } from './multi-dropdown/multi-dropdown';

const meta: Meta<typeof Dropdown> = {
	title: 'Form Elements/Dropdown',
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
	return <Dropdown {...args} value={value} onSelect={setValue} />;
};

const ControlledMultiDropdown = (args: any) => {
	const [values, setValues] = useState<(string | number)[]>([]);
	const handleToggle = (val: string | number) =>
		setValues((prev) => (prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]));
	return (
		<MultiDropdown
			{...args}
			values={values}
			onToggle={handleToggle}
			onClear={() => setValues([])}
		/>
	);
};

export const Default: Story = {
	render: (args) => <ControlledDropdown {...args} />,
	args: {
		title: 'Fruit',
		options,
		placeholder: 'Select a fruit...',
		size: 'md',
	},
};

export const Multi: Story = {
	render: (args) => <ControlledMultiDropdown {...args} />,
	args: {
		title: 'Fruits',
		options,
		placeholder: 'Select fruits...',
		size: 'md',
	},
};
