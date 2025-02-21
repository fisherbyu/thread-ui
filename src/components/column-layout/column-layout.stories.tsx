import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ColumnLayout } from './column-layout';

const meta: Meta<typeof ColumnLayout> = {
	title: 'Components/ColumnLayout',
	component: ColumnLayout,
	parameters: {
		layout: 'fullscreen',
	},
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ColumnLayout>;

// Helper function to generate colored cards
const ColorCard = ({ color }: { color: string }) => (
	<div className="thread-w-full thread-aspect-video thread-rounded" style={{ backgroundColor: color }} />
);

export const Basic: Story = {
	args: {
		title: 'Our Services',
		caption: 'Explore our range of solutions',
		mdcol: 2,
		lgcol: 4,
		items: [
			{
				title: 'Web Development',
				description: 'Building responsive and modern web applications',
				image: <ColorCard color="#60A5FA" />,
			},
			{
				title: 'Mobile Apps',
				description: 'Native and cross-platform mobile solutions',
				image: <ColorCard color="#34D399" />,
			},
			{
				title: 'Cloud Services',
				description: 'Scalable cloud infrastructure and deployment',
				image: <ColorCard color="#F87171" />,
			},
			{
				title: 'UI/UX Design',
				description: 'User-centered design and prototyping',
				image: <ColorCard color="#A78BFA" />,
			},
		],
	},
};

export const TwoColumns: Story = {
	args: {
		title: 'Featured Projects',
		mdcol: 1,
		lgcol: 2,
		items: [
			{
				title: 'Project Alpha',
				description: 'An enterprise resource planning solution',
				image: <ColorCard color="#2563EB" />,
			},
			{
				title: 'Project Beta',
				description: 'E-commerce platform with AI recommendations',
				image: <ColorCard color="#DC2626" />,
			},
		],
	},
};

export const NoTitles: Story = {
	args: {
		mdcol: 2,
		lgcol: 3,
		items: [
			{
				image: <ColorCard color="#059669" />,
			},
			{
				image: <ColorCard color="#7C3AED" />,
			},
			{
				image: <ColorCard color="#DB2777" />,
			},
		],
	},
};

export const WithImages: Story = {
	args: {
		title: 'About Me',
		caption: "Some of the places I've lived!",
		mdcol: 2,
		lgcol: 4,
		items: [
			{
				title: 'Folsom',
				description:
					'I grew up in Folsom, California.    It was a great place to grow up with tons of friendly people and opportunities for me as a youth',
				image: {
					src: 'https://fisherandrew.org/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffolsom.18907cb6.jpg&w=3840&q=75',
					alt: 'Rainbow Bridge',
				},
			},
			{
				title: 'Philippines',
				description:
					'I served a mission for The Church of Jesus Christ of Latter-day Saints in Isabela Philippines.    The people of the Philippines are the most friendly, kind and amazing people on Earth.',
				image: {
					src: 'https://fisherandrew.org/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fphilippines.1c61a311.jpg&w=3840&q=75',
					alt: 'Corn Field, Isabela Philippines',
				},
			},
			{
				title: 'BYU',
				description:
					"I'm currently studying at BYU.    I love learning in such a spiritual environment and I've made lifelong friends during my time here.",
				image: {
					src: 'https://fisherandrew.org/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhbll.902dbb81.jpg&w=3840&q=75',
					alt: 'BYU Library and Y Mountain',
				},
			},
			{
				title: 'Utah',
				description: "I'm lucky to live in Utah, its such a pretty place with so much to do.",
				image: {
					src: 'https://fisherandrew.org/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Falpine-loop.1df0e6d7.jpg&w=3840&q=75',
					alt: 'Alpine Loop, Provo, UT',
				},
			},
		],
	},
};
