import type { Meta, StoryObj } from '@storybook/react';
import { MasonryLayout } from './masonry-layout';
import '../../styles/thread.css';
// Sample components for demonstration
const SampleCard = ({ height, color }: { height: number; color: string }) => (
	<div
		className="thread-w-full thread-rounded-lg"
		style={{
			height: `${height}px`,
			backgroundColor: color,
		}}
	/>
);

// Create different sized components for visual variety
const sampleComponents = [
	<SampleCard height={200} color="#FDA4AF" />,
	<SampleCard height={300} color="#FCA5A5" />,
	<SampleCard height={250} color="#FBBF24" />,
	<SampleCard height={180} color="#34D399" />,
	<SampleCard height={220} color="#60A5FA" />,
	<SampleCard height={280} color="#818CF8" />,
	<SampleCard height={240} color="#F472B6" />,
	<SampleCard height={320} color="#A78BFA" />,
];

const meta: Meta<typeof MasonryLayout> = {
	title: 'Components/MasonryLayout',
	component: MasonryLayout,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
};

export default meta;
type Story = StoryObj<typeof MasonryLayout>;

export const Default: Story = {
	args: {
		components: sampleComponents,
	},
};

export const WithTitleAndCaption: Story = {
	args: {
		title: 'Photo Gallery',
		caption: 'A beautiful collection of photographs arranged in a masonry layout',
		components: sampleComponents,
	},
};

export const TwoColumns: Story = {
	args: {
		components: sampleComponents.slice(0, 4),
	},
	parameters: {
		viewport: {
			defaultViewport: 'mobile2',
		},
	},
};

export const ThreeColumns: Story = {
	args: {
		components: sampleComponents,
	},
	parameters: {
		viewport: {
			defaultViewport: 'tablet',
		},
	},
};

export const FourColumns: Story = {
	args: {
		components: sampleComponents,
	},
};
