import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Lightbox } from './lightbox';
import { Button } from '../../ui';
import { Text } from '../../typography';

const meta: Meta<typeof Lightbox> = {
	title: 'Content Display/Lightbox',
	component: Lightbox,
	parameters: {
		layout: 'centered',
	},
	decorators: [
		(Story) => (
			<div
				style={{
					width: '740px',
					minHeight: '50vh',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
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
			backgroundColor: color,
			width: '100%',
			height: '100%',
			borderRadius: '4px',
		}}
	/>
));

const textItems: React.ReactNode[] = [
	<div key="1">
		<Text inline>1</Text>
	</div>,
	<div key="2">
		<Text inline>2</Text>
	</div>,
	<div key="3">
		<Text inline>3</Text>
	</div>,
	<div key="4">
		<Text inline>4</Text>
	</div>,
	<div key="5">
		<Text inline>5</Text>
	</div>,
];

const LightboxTrigger = ({
	title,
	items,
	itemWrapper,
}: {
	title?: string;
	items: React.ReactNode[];
	itemWrapper?: React.ComponentType<any>;
}) => {
	const [isOpen, setOpen] = useState(false);
	return (
		<>
			<Button onClick={() => setOpen(true)}>Open Lightbox</Button>
			<Lightbox
				isOpen={isOpen}
				onClose={() => setOpen(false)}
				title={title}
				items={items}
				itemWrapper={itemWrapper}
			/>
		</>
	);
};

export const Default: Story = {
	render: () => <LightboxTrigger title="Lightbox" items={swatchItems} />,
};

export const WithText: Story = {
	render: () => <LightboxTrigger title="Lightbox" items={textItems} />,
};
