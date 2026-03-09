import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Container } from './container';

const meta: Meta<typeof Container> = {
	title: 'Layouts/Container',
	component: Container,
	parameters: {
		layout: 'fullscreen',
	},
	tags: ['autodocs'],
	argTypes: {
		as: {
			control: 'select',
			options: ['div', 'section'],
		},
		bgColor: {
			control: 'select',
			options: ['background', 'surface', 'elevated'],
		},
	},
};

export default meta;
type Story = StoryObj<typeof Container>;

export const Default: Story = {
	args: {
		as: 'div',
		bgColor: 'background',
	},
	render: ({ as, bgColor }) => (
		<Container as={as} bgColor={bgColor}>
			<div style={{ background: '#bfdbfe', height: '200px', borderRadius: '8px' }} />
		</Container>
	),
};
