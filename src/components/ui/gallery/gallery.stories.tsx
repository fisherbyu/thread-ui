import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Gallery } from './gallery';
import { GalleryItem } from './gallery.types';

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
		<p>1</p>
	</div>,
	<div key="2">
		<p>2</p>
	</div>,
	<div key="3">
		<p>3</p>
	</div>,
	<div key="4">
		<p>4</p>
	</div>,
	<div key="5">
		<p>5</p>
	</div>,
];

export const Default: Story = {
	args: {
		title: 'Gallery',
		items: sampleItems,
	},
};
