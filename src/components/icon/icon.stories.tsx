// icon.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './icon';

const meta: Meta<typeof Icon> = {
	title: 'Components/Icon',
	component: Icon,
	tags: ['autodocs'],
	argTypes: {
		name: {
			control: 'select',
			options: ['Heart', 'House', 'User', 'Gear', 'Bell', 'ArrowRight', 'Check', 'Warning', 'CaretRight', 'Stack'],
		},
		size: {
			control: 'select',
			options: [8, 12, 16, 24, 32, 48, 64],
		},
		color: {
			control: 'select',
			options: ['primary', 'secondary', 'tertiary', 'black', 'grey', 'success', 'error', 'info'],
		},
		weight: {
			control: 'select',
			options: ['light', 'regular', 'bold'],
		},
		filled: {
			control: 'boolean',
		},
	},
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
	args: {
		name: 'Heart',
		size: 24,
		color: 'primary',
	},
};

export const WeightsAndFill: Story = {
	render: () => (
		<div className="thread-flex thread-gap-4 thread-items-center">
			<Icon name="Heart" size={24} color="primary" weight="light" />
			<Icon name="Heart" size={24} color="primary" weight="regular" />
			<Icon name="Heart" size={24} color="primary" weight="bold" />
			<Icon name="Heart" size={24} color="primary" filled />
		</div>
	),
};

export const Sizes: Story = {
	render: () => (
		<div className="thread-flex thread-items-center thread-gap-4">
			<Icon name="Bell" size={16} color="primary" />
			<Icon name="Bell" size={24} color="primary" />
			<Icon name="Bell" size={32} color="primary" />
			<Icon name="Bell" size={48} color="primary" />
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div className="thread-flex thread-gap-4">
			<Icon name="Heart" size={24} color="primary" />
			<Icon name="Heart" size={24} color="secondary" />
			<Icon name="Heart" size={24} color="success" />
			<Icon name="Heart" size={24} color="error" />
			<Icon name="Heart" size={24} color="info" />
		</div>
	),
};
