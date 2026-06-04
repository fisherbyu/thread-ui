import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Gallery } from './gallery';
import { GalleryItem } from './gallery.types';
import { Text } from '../../typography';

const meta: Meta<typeof Gallery> = {
	title: 'Content Display/Gallery',
	component: Gallery,
	parameters: {
		layout: 'fullscreen',
	},
	tags: ['autodocs'],
	argTypes: {
		title: {
			control: 'text',
			description: 'Optional title rendered above the gallery',
		},
		items: {
			control: 'object',
			description: 'Items to render, in display order',
		},
	},
};

export default meta;
type Story = StoryObj<typeof Gallery>;

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

const swatchItems: GalleryItem[] = swatchColors.map((color, i) => (
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

const textItems: GalleryItem[] = [
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

export const Default: Story = {
	args: {
		title: 'Gallery',
		items: swatchItems,
	},
};

export const WithText: Story = {
	args: {
		title: 'Gallery',
		items: textItems,
	},
};
