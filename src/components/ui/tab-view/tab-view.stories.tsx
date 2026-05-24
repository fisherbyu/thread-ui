import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TabView } from './tab-view';
import { Text } from '../../typography';
import { Container } from '../../layouts/container/container';

const meta: Meta<typeof TabView> = {
	title: 'Components/TabView',
	component: TabView,
	parameters: {
		layout: 'fullscreen',
	},
	tags: ['autodocs'],
	argTypes: {
		defaultValueId: {
			control: 'text',
		},
		layer: {
			control: 'select',
			options: ['surface', 'raised', 'sunken'],
		},
		items: {
			control: false,
		},
	},
};

export default meta;
type Story = StoryObj<typeof TabView>;

export const Default: Story = {
	args: {
		items: [
			{
				id: 'overview',
				icon: 'House',
				title: 'Overview',
				content: <Text>This is the overview tab content.</Text>,
			},
			{
				id: 'details',
				icon: 'FileText',
				title: 'Details',
				content: <Text>Here are the details for this item.</Text>,
			},
			{
				id: 'settings',
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
