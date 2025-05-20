import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Toggle, ModeToggle } from './';
import { useTheme, useThemeMode } from '../../../functions';

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
			options: ['primary', 'secondary', 'tertiary', 'black', 'gray', 'success', 'error', 'info', 'text'],
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

const ThemeModeWrapper = () => {
	const [mode] = useThemeMode();
	const { theme } = useTheme();

	useEffect(() => {
		console.log('Current theme mode:', mode);
		console.log('Theme colors:', theme.colors);
	}, [mode, theme]);

	return (
		<div
			className="thread-space-y-4 thread-p-4 thread-h-16 thread-w-2/4 thread-border thread-flex thread-flex-row thread-justify-start thread-items-center thread-rounded"
			style={{ backgroundColor: theme.colors.background }}
		>
			<ModeToggle />
		</div>
	);
};

export const ThemeMode: Story = {
	render: () => <ThemeModeWrapper />,
};
