import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from './toggle';

const meta: Meta<typeof Toggle> = {
	component: Toggle,
	title: 'Components/Toggle',
	tags: ['autodocs'],
	argTypes: {
		isOn: {
			control: 'boolean',
			description: 'The current state of the toggle',
		},
		onToggle: {
			description: 'Callback function when toggle is clicked',
		},
		color: {
			control: 'select',
			options: ['primary', 'secondary', 'tertiary', 'black', 'grey', 'success', 'error', 'info', 'text'],
			description: 'Color theme for the toggle',
		},
	},
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
	args: {
		color: 'success',
		isOn: false,
	},
	render: (args) => {
		const [isOn, setIsOn] = useState(args.isOn);

		useEffect(() => {
			setIsOn(args.isOn);
		}, [args.isOn]);

		return <Toggle {...args} isOn={isOn} onToggle={() => setIsOn(!isOn)} />;
	},
};
