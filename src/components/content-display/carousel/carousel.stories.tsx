import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Carousel } from './carousel';
import { CarouselItem } from './carousel.types';

const meta: Meta<typeof Carousel> = {
	title: 'Content Display/Carousel',
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
			options: ['above', 'around', 'below', 'none'],
		},
		mdCols: {
			control: 'radio',
			options: [1, 2, 3],
			description: 'Visible columns at the md breakpoint',
		},
		lgCols: {
			control: 'radio',
			options: [1, 2, 3, 4, 5, 6],
			description: 'Visible columns at the lg breakpoint',
		},
	},
};

export default meta;

type Story = StoryObj<typeof Carousel>;

const sampleItems: CarouselItem[] = [
	{
		title: 'Pane 1',
		content: (
			<div>
				<p>1</p>
			</div>
		),
	},
	{
		title: 'Pane 2',
		content: (
			<div>
				<p>2</p>
			</div>
		),
	},
	{
		title: 'Pane 3',
		content: (
			<div>
				<p>3</p>
			</div>
		),
	},
	{
		title: 'Pane 4',
		content: (
			<div>
				<p>4</p>
			</div>
		),
	},
	{
		title: 'Pane 5',
		content: (
			<div>
				<p>5</p>
			</div>
		),
	},
];

export const Default: Story = {
	args: {
		title: 'Featured Items',
		items: sampleItems,
		mdCols: 3,
		lgCols: 3,
	},
};
