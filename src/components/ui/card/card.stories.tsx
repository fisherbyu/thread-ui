import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './card';
import { Text } from '../../typography';

const meta = {
	title: 'UI Components/Card',
	component: Card,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg'],
		},
		layer: {
			control: 'select',
			options: ['none', 'canvas', 'inset', 'surface', 'elevated', 'overlay'],
		},

		bg: {
			control: 'select',
			options: ['none', 'canvas', 'inset', 'surface', 'elevated', 'overlay'],
		},
		shadow: {
			control: 'select',
			options: ['none', 'sm', 'md', 'lg'],
		},
		structure: {
			control: 'select',
			options: ['none', 'subtle', 'default', 'strong'],
		},
		fullWidth: {
			control: 'boolean',
		},
		flush: {
			control: 'boolean',
		},
	},
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
	args: {
		layer: 'surface',
		size: 'md',
		children: <Text>This is a card component with some content inside.</Text>,
	},
};

export const WithTitle: Story = {
	args: {
		layer: 'surface',
		title: {
			text: 'Card Title',
			align: 'left',
		},
		children: <Text>This card has a title and some content.</Text>,
	},
};

export const AllLevels: Story = {
	render: () => (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '2rem',
				width: '100%',
			}}
		>
			<Card layer="surface" size="sm" title={{ text: 'Surface layer', align: 'left' }}>
				<Text>Default card — sm shadow, subtle border</Text>
			</Card>

			<Card layer="elevated" size="md" title={{ text: 'Elevated layer', align: 'left' }}>
				<Text>Elevated card — md shadow, subtle border</Text>
			</Card>

			<Card layer="overlay" size="lg" title={{ text: 'Overlay layer', align: 'center' }}>
				<Text>Overlay card — lg shadow, no border (centered title)</Text>
			</Card>
		</div>
	),
};

export const WithOverrides: Story = {
	render: () => (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '2rem',
				width: '100%',
				maxWidth: '900px',
			}}
		>
			<Card
				layer="surface"
				shadow="none"
				title={{ text: 'Surface, No Shadow', align: 'left' }}
			>
				<Text>Surface layer with shadow overridden to none</Text>
			</Card>

			<Card
				layer="surface"
				structure="strong"
				title={{ text: 'Surface, Strong Border', align: 'left' }}
			>
				<Text>Surface layer with structure overridden to strong</Text>
			</Card>

			<Card
				layer="elevated"
				shadow="lg"
				structure="none"
				title={{ text: 'Elevated, Heavy Shadow', align: 'left' }}
			>
				<Text>Elevated layer with shadow bumped to lg and border removed</Text>
			</Card>
		</div>
	),
};

export const WithTitleDivider: Story = {
	args: {
		layer: 'surface',
		title: {
			text: 'Card with Divider',
			align: 'left',
			divider: true,
		},
		children: <Text>Title divider separates the heading from content</Text>,
	},
};
