import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
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
		subtitle: {
			control: 'text',
			description: 'Optional subtitle rendered below the title',
		},
		items: {
			control: 'object',
			description: 'Items to render, in display order',
		},
		appearance: {
			control: 'radio',
			options: ['framed', 'bare'],
			description: 'Visual treatment for item containers',
		},
		size: {
			control: 'radio',
			options: ['sm', 'md', 'lg', 'fill'],
			description: 'Controls the gallery dimensional presets',
		},
		startIndex: {
			control: 'number',
			description: 'Index of item gallery opens at start',
		},
		variableWidths: {
			control: 'boolean',
			description: 'Display thumbnail items with varying widths',
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
			minWidth: '300px',
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
	<div key="6">
		<Text inline>6</Text>
	</div>,
];

export const Default: Story = {
	args: {
		title: 'Gallery',
		items: swatchItems,
		size: 'lg',
		appearance: 'framed',
		variableWidths: false,
		startIndex: 0,
	},
};

export const WithText: Story = {
	args: {
		title: 'Gallery',
		items: textItems,
		size: 'md',
		appearance: 'framed',
		variableWidths: false,
		startIndex: 2,
	},
};
