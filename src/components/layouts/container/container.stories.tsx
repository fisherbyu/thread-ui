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
		bg: {
			control: 'select',
			options: ['canvas', 'inset', 'surface', 'elevated', 'overlay', 'none'],
		},
	},
};

export default meta;
type Story = StoryObj<typeof Container>;

export const Default: Story = {
	args: {
		as: 'div',
		bg: 'none',
	},
	render: ({ as, bg }) => (
		<Container as={as} bg={bg}>
			<div
				style={{
					background: bg === 'none' ? '#bfdbfe' : 'transparent',
					height: '200px',
					borderRadius: '8px',
				}}
			/>
		</Container>
	),
};
