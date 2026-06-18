import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ImageOverlay } from './image-overlay';

const meta: Meta<typeof ImageOverlay> = {
	title: 'Components/ImageOverlay',
	component: ImageOverlay,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ImageOverlay>;

const img = (seed: string, w: number, h: number) => (
	<img
		src={`https://picsum.photos/seed/${seed}/${w}/${h}`}
		alt="placeholder"
		style={{ display: 'block', width: '100%' }}
	/>
);

export const Default: Story = {
	args: {
		children: img('landscape', 500, 350),
		overlay: <span>Overlay content on hover</span>,
	},
};

export const MoviePoster: Story = {
	args: {
		children: img('poster', 300, 450),
		overlay: (
			<div>
				<strong>La La Land</strong>
				<div>★★★★★</div>
			</div>
		),
	},
};

export const PhotoMetadata: Story = {
	args: {
		children: img('photo', 500, 350),
		overlay: (
			<div>
				<strong>Alpine Loop, Utah</strong>
				<div>Canon 5D Mark II · 50mm · f/2.8</div>
			</div>
		),
	},
};
