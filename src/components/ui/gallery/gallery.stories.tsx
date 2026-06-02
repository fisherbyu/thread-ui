import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Gallery } from './gallery';
import { GalleryItem } from './gallery.types';
import { Text } from '../../typography';

const meta: Meta<typeof Gallery> = {
	title: 'Components/Gallery',
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

const sampleItems: GalleryItem[] = [
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
		items: sampleItems,
	},
};
