import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TabView } from './tab-view';
import { Text } from '../../typography';
import { Container } from '../../layouts/container/container';

const meta: Meta<typeof TabView> = {
	title: 'UI Components/TabView',
	component: TabView,
	parameters: {
		layout: 'fullscreen',
	},
	tags: ['autodocs'],
	argTypes: {
		cardStyles: {
			control: 'select',
			options: ['surface', 'raised', 'sunken'],
		},
		items: {
			control: false,
		},
		showDivider: {
			control: 'boolean',
		},
	},
};

export default meta;
type Story = StoryObj<typeof TabView>;

export const Default: Story = {
	args: {
		items: [
			{
				icon: 'House',
				title: 'Overview',
				content: <Text>This is the overview tab content.</Text>,
			},
			{
				icon: 'FileText',
				title: 'Details',
				content: <Text>Here are the details for this item.</Text>,
			},
			{
				icon: 'Gear',
				title: 'Settings',
				content: <Text>Configure your settings here.</Text>,
			},
		],
	},
	render: (args) => {
		return (
			<Container>
				<TabView {...args} />
			</Container>
		);
	},
};
