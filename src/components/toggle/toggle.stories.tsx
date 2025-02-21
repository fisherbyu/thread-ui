import { useState } from 'react';
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
	},
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
	render: () => {
		const [isOn, setIsOn] = useState(false);
		return <Toggle isOn={isOn} onToggle={() => setIsOn(!isOn)} />;
	},
};
