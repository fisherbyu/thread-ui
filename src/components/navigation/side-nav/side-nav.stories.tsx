import type { Meta, StoryObj } from '@storybook/react';
import { SideNav } from './side-nav';

const meta: Meta<typeof SideNav> = {
	title: 'Navigation/SideNav',
	component: SideNav,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SideNav>;

export const Default: Story = {
	args: {
		basePath: '/dashboard',
		links: [
			{ title: 'Home', path: '', icon: 'House' },
			{ title: 'Documents', path: '', icon: 'File' },
			{ title: 'Controls', path: '', icon: 'Gear' },
		],
	},
};
