import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './dropdown';

const meta: Meta<typeof Dropdown> = {
	title: 'Components/Dropdown',
	component: Dropdown,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
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

export const Default: Story = {
	render: (args) => <ControlledDropdown {...args} />,
	args: {
		label: 'Fruit',
		options,
		placeholder: 'Select a fruit...',
	},
};
