import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MediaOverlay } from './media-overlay';

const meta: Meta<typeof MediaOverlay> = {
	title: 'Media Display/MediaOverlay',
	component: MediaOverlay,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		scrimLevel: {
			control: 'select',
			options: ['none', 'light', 'medium', 'heavy'],
		},
		placement: {
			control: 'select',
			options: ['full', 'top', 'bottom', 'left', 'right'],
		},
		maxHeight: { control: 'text' },
		maxWidth: { control: 'text' },
	},
};

export default meta;

type Story = StoryObj<typeof MediaOverlay>;

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
		overlay: (
			<div>
				<strong>Alpine Loop, Utah</strong>
				<div>Canon 5D Mark II · 50mm · f/2.8</div>
			</div>
		),
	},
};

export const Placement: Story = {
	args: {
		children: img('poster', 300, 450),
		overlay: (
			<div>
				<strong>La La Land</strong>
				<div>★★★★★</div>
			</div>
		),
		scrimLevel: 'medium',
		placement: 'bottom',
		maxHeight: '30%',
	},
};
