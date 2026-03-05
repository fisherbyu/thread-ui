import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { GridLayout } from './grid-layout';

const meta: Meta<typeof GridLayout> = {
	title: 'Layouts/GridLayout',
	component: GridLayout,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		cols: { control: 'number' },
		gap: { control: 'text' },
		align: { control: 'select', options: ['start', 'center', 'end', 'stretch'] },
		justify: { control: 'select', options: ['start', 'center', 'end', 'stretch'] },
	},
};

export default meta;
type Story = StoryObj<typeof GridLayout>;

const Box = ({ children }: { children: React.ReactNode }) => (
	<div
		style={{ background: '#e2e8f0', padding: '16px', borderRadius: '4px', textAlign: 'center' }}
	>
		{children}
	</div>
);

export const Default: Story = {
	args: {
		cols: 3,
		gap: 'md',
	},
	render: (args) => (
		<GridLayout {...args}>
			<Box>1</Box>
			<Box>2</Box>
			<Box>3</Box>
			<Box>4</Box>
			<Box>5</Box>
			<Box>6</Box>
		</GridLayout>
	),
};

export const ResponsiveCols: Story = {
	args: {
		cols: { base: 1, md: 2, lg: 3 },
		gap: 'lg',
	},
	render: (args) => (
		<GridLayout {...args}>
			<Box>A</Box>
			<Box>B</Box>
			<Box>C</Box>
			<Box>D</Box>
			<Box>E</Box>
			<Box>F</Box>
		</GridLayout>
	),
};
