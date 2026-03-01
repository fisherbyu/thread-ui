import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './icon-button';
import * as PhosphorIcons from '@phosphor-icons/react';

const iconNames = Object.keys(PhosphorIcons).filter(
	(key) =>
		typeof PhosphorIcons[key as keyof typeof PhosphorIcons] === 'function' &&
		!['Icon', 'IconBase', 'IconContext', 'IconWeight'].includes(key)
);

const meta: Meta<typeof IconButton> = {
	title: 'UI Components/IconButton',
	component: IconButton,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
	argTypes: {
		name: {
			control: 'select',
			options: iconNames,
			description: 'Icon name from Phosphor Icons library',
		},
		color: {
			control: 'select',
			options: ['primary', 'secondary', 'success', 'warning', 'danger', 'neutral'],
			description: 'Button color theme',
		},
		fullWidth: {
			control: 'boolean',
			description: 'Whether button should take full width',
		},
		disabled: {
			control: 'boolean',
			description: 'Disabled state',
		},
		type: {
			control: 'radio',
			options: ['button', 'submit', 'reset'],
			description: 'HTML button type',
		},
		margin: {
			control: 'text',
			description: 'CSS margin value',
		},
		onClick: {
			action: 'clicked',
			description: 'Click handler',
		},
	},
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		name: 'Heart',
		color: 'primary',
		type: 'button',
		children: 'Love',
	},
};
