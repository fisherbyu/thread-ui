import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Lightbox } from './lightbox';
import { LightboxProps } from './lightbox.types';
import { Button } from '../../ui';
import { Text } from '../../typography';

const meta: Meta<typeof Lightbox> = {
	title: 'Content Display/Lightbox',
	component: Lightbox,
	parameters: {
		layout: 'fullscreen',
	},
	decorators: [
		(Story) => (
			<div style={{ height: '100vh' }}>
				<Story />
			</div>
		),
	],
	tags: ['autodocs'],
	argTypes: {
		title: {
			control: 'text',
			description: 'Optional title rendered above the lightbox',
		},
		items: {
			control: 'object',
			description: 'Items to render, in display order',
		},
		appearance: {
			control: 'radio',
			options: ['framed', 'bare'],
			description: 'Gallery content appearance',
		},
		variableWidths: {
			control: 'boolean',
			description: 'Control auto-width within track thumbnails',
		},
		startIndex: {
			control: 'number',
			description: 'Index of item gallery opens at start',
		},
	},
};

export default meta;
type Story = StoryObj<typeof Lightbox>;

const swatchColors = [
	'#1982c4',
	'#6a4c93',
	'#e63946',
	'#457b9d',
	'#2a9d8f',
	'#e9c46a',
	'#264653',
	'#f4a261',
	'#8ac926',
	'#ff595e',
];

const swatchItems: React.ReactNode[] = swatchColors.map((color, i) => (
	<div
		key={i}
		style={{
			minWidth: '150px',
			backgroundColor: color,
			width: '100%',
			height: '100%',
			borderRadius: '4px',
		}}
	/>
));

const textItems: React.ReactNode[] = [
	<div style={{ minWidth: '150px' }} key="1">
		<Text inline>1</Text>
	</div>,
	<div style={{ minWidth: '150px' }} key="2">
		<Text inline>2</Text>
	</div>,
	<div style={{ minWidth: '150px' }} key="3">
		<Text inline>3</Text>
	</div>,
	<div style={{ minWidth: '150px' }} key="4">
		<Text inline>4</Text>
	</div>,
	<div style={{ minWidth: '150px' }} key="5">
		<Text inline>5</Text>
	</div>,
];

type LightboxTriggerProps = Omit<LightboxProps, 'isOpen' | 'onClose'>;

const LightboxTrigger = (props: LightboxTriggerProps) => {
	const [isOpen, setOpen] = useState(false);
	return (
		<>
			<Button onClick={() => setOpen(true)}>Open Lightbox</Button>
			<Lightbox {...props} isOpen={isOpen} onClose={() => setOpen(false)} />
		</>
	);
};

export const Default: Story = {
	args: {
		title: 'Lightbox',
		items: swatchItems,
		appearance: 'bare',
		variableWidths: true,
		startIndex: 0,
	},
	render: (args: any) => <LightboxTrigger {...args} />,
};

export const WithText: Story = {
	args: {
		title: 'Lightbox',
		items: textItems,
		appearance: 'framed',
		variableWidths: true,
		startIndex: 2,
	},
	render: (args: any) => <LightboxTrigger {...args} />,
};
