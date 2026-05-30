import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Carousel } from './carousel';
import { CarouselItem } from './carousel.types';

const meta: Meta<typeof Carousel> = {
	title: 'Components/Carousel',
	component: Carousel,
	parameters: {
		layout: 'fullscreen',
	},
	tags: ['autodocs'],
	argTypes: {
		title: {
			control: 'text',
			description: 'Optional title rendered above the carousel',
		},
		items: {
			control: 'object',
			description: 'Items to render, in display order',
		},
		controlsPosition: {
			control: 'radio',
			options: ['above', 'around', 'below'],
		},
	},
};

export default meta;

type Story = StoryObj<typeof Carousel>;

const sampleItems: CarouselItem[] = [
	{
		title: 'First Pane',
		content: (
			<div>
				<p>This is the content of the first carousel item.</p>
			</div>
		),
	},
	{
		title: 'Second Pane',
		content: (
			<div>
				<p>Here's some different content for the second pane.</p>
			</div>
		),
	},
	{
		title: 'Third Pane',
		content: (
			<div>
				<p>And a third pane to round things out.</p>
			</div>
		),
	},
];

export const Default: Story = {
	args: {
		title: 'Featured Items',
		items: sampleItems,
	},
};
