import type { Meta, StoryObj } from '@storybook/react';
import { InfoCard } from './info-card';
import '../../styles/thread.css';

const meta: Meta<typeof InfoCard> = {
	title: 'Components/InfoCard',
	component: InfoCard,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof InfoCard>;

// Sample data for our stories
const recipesData = [
	{
		title: 'Pumpkin Bread',
		url: 'https://fisherbyu.notion.site/Pumpkin-Bread-4ce9d0798f0b4e7b98bd380149837f8c',
		icon: {
			type: 'svg' as const,
			content: 'https://www.notion.so/icons/jack-o-lantern_orange.svg',
		},
		img: 'https://images.unsplash.com/photo-1599247158718-4cdee4732a66',
	},
	{
		title: 'Lemon Squares',
		url: 'https://fisherbyu.notion.site/Lemon-Squares-b34a9bb02cc34db5870ddad10c0b7637',
		icon: {
			type: 'emoji' as const,
			content: '🍋',
		},
		img: 'https://images.unsplash.com/photo-1591291294701-4f651ddd3556',
	},
	{
		title: 'Biscotti',
		url: 'https://fisherbyu.notion.site/Biscotti-f145305fb5df43e983f422203e58e4e5',
		icon: {
			type: 'emoji' as const,
			content: '🍪',
		},
		img: 'https://images.unsplash.com/photo-1685397166786-b43234186139',
	},
	{
		title: 'Coconut-Pecan Frosting',
		url: 'https://fisherbyu.notion.site/Coconut-Pecan-Frosting-0959ffe8fd8f4a4c898371120a4a2717',
		icon: {
			type: 'emoji' as const,
			content: '🥥',
		},
		img: 'https://images.unsplash.com/photo-1560769680-ba2f3767c785',
	},
	{
		title: 'Chocolate Chip Cookies',
		url: 'https://fisherbyu.notion.site/Chocolate-Chip-Cookies-ada9ea88d8264543a2a924b9d691adaf',
		icon: {
			type: 'emoji' as const,
			content: '🍪',
		},
		img: 'https://images.unsplash.com/photo-1485745655111-3272a37e76a5',
	},
	{
		title: 'Lemon Bundt Cake',
		url: 'https://fisherbyu.notion.site/Lemon-Bundt-Cake-c0df3fedeb4a488ab8d9c27ccfc96bfe',
		icon: {
			type: 'emoji' as const,
			content: '🍋',
		},
		img: 'https://images.unsplash.com/photo-1454944338482-a69bb95894af',
	},
];

const infoCard = {
	title: 'This is a very very very long title that might need to be truncated or handled specially',
	url: 'https://fisherandrew.org/photo',
	icon: {
		type: 'emoji' as const,
		content: '📷',
	},
	img: 'https://fisherandrew.org/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Falpine-loop-1.98af1205.jpg&w=3840&q=75',
};

export const Default: Story = {
	args: {
		...recipesData[0],
	},
};

export const WithEmojiIcon: Story = {
	args: {
		...recipesData[1],
	},
};

export const LongTitle: Story = {
	args: {
		...infoCard,
	},
};

// Grid layout with multiple different recipes
export const GridLayout: Story = {
	decorators: [
		(Story) => (
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(2, 1fr)',
					gap: '1rem',
					padding: '1rem',
					maxWidth: '900px',
				}}
			>
				{recipesData.map((recipe, index) => (
					<InfoCard key={index} title={recipe.title} url={recipe.url} icon={recipe.icon} img={recipe.img} />
				))}
			</div>
		),
	],
	parameters: {
		controls: { hideNoControlsWarning: true },
	},
};
