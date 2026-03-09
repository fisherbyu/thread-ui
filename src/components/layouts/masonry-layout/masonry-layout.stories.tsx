import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MasonryLayout } from './masonry-layout';
import '../../../styles/thread.css';

// Sample items for demonstration
const SampleCard = ({ height, color }: { height: number; color: string }) => (
	<div
		className="thread-w-full thread-rounded-lg"
		style={{
			height: `${height}px`,
			backgroundColor: color,
		}}
	/>
);

// Create different sized items for visual variety
const sampleitems = [
	<SampleCard height={200} color="#FDA4AF" />,
	<SampleCard height={300} color="#FAC898" />,
	<SampleCard height={250} color="#FBBF24" />,
	<SampleCard height={180} color="#34D399" />,
	<SampleCard height={220} color="#60A5FA" />,
	<SampleCard height={280} color="#818CF8" />,
	<SampleCard height={240} color="#F472B6" />,
	<SampleCard height={320} color="#A78BFA" />,
];

const meta: Meta<typeof MasonryLayout> = {
	title: 'Layouts/MasonryLayout',
	component: MasonryLayout,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
	argTypes: {
		container: {
			control: 'boolean',
		},
	},
};

export default meta;
type Story = StoryObj<typeof MasonryLayout>;

export const Default: Story = {
	args: {
		container: true,
		items: sampleitems,
	},
};

export const WithTitleAndCaption: Story = {
	args: {
		title: 'Photo Gallery',
		caption: 'A beautiful collection of photographs arranged in a masonry layout',
		container: true,
		items: sampleitems,
	},
};

export const TwoColumns: Story = {
	args: {
		container: true,
		items: sampleitems.slice(0, 4),
	},
	parameters: {
		viewport: {
			defaultViewport: 'mobile2',
		},
	},
};

export const ThreeColumns: Story = {
	args: {
		container: true,
		items: sampleitems,
	},
	parameters: {
		viewport: {
			defaultViewport: 'tablet',
		},
	},
};

export const FourColumns: Story = {
	args: {
		container: true,
		items: sampleitems,
	},
};

export const NoContainer: Story = {
	args: {
		container: false,
		items: sampleitems,
	},
};
