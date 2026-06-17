import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { NavMenu } from './nav-menu';
import { ThreadTheme } from '../../../theme';
import { H1, H2, Text } from '../../typography';

const SamplePageContent = (
	<div style={{ padding: '20px' }}>
		<H1>Page Content</H1>
		<Text>
			This is sample page content to demonstrate the navigation in context. Scroll down to see
			how the sticky navigation behaves.
		</Text>
		{/* Add more content to make the page scrollable */}
		{Array.from({ length: 5 }).map((_, i) => (
			<div
				key={i}
				style={{
					marginTop: '40px',
					padding: '20px',
					backgroundColor: ThreadTheme.surface,
					borderRadius: '8px',
				}}
			>
				<H2>Section {i + 1}</H2>
				<Text>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
					incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
					nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
				</Text>
			</div>
		))}
	</div>
);

// Sample logo component
const SampleLogo = () => (
	<div
		style={{
			width: '120px',
			height: '40px',
			backgroundColor: '#4B5563',
			borderRadius: '4px',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			color: 'white',
			fontWeight: 'bold',
		}}
	>
		LOGO
	</div>
);

const meta: Meta<typeof NavMenu> = {
	title: 'Navigation/NavMenu',
	component: NavMenu,
	parameters: {
		layout: 'fullscreen',
	},
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<div style={{ minHeight: '100vh', backgroundColor: ThreadTheme.surface }}>
				<Story />
				{SamplePageContent}
			</div>
		),
	],
};
export default meta;
type Story = StoryObj<typeof NavMenu>;

export const Basic: Story = {
	args: {
		logo: {
			href: '/',
			logo: <SampleLogo />,
		},
		items: [
			{ href: '/', title: 'Home', icon: 'HouseIcon' },
			{ href: '/', title: 'About', icon: 'BookOpenTextIcon' },
			{ href: '/', title: 'Contact', icon: 'EnvelopeIcon' },
			{
				title: 'Music',
				icon: 'MusicNotesIcon',
				items: [
					{ href: '/', title: 'Artists', icon: 'MicrophoneStageIcon' },
					{ href: '/', title: 'Coldplay', icon: 'StarIcon' },
					{ href: '/', title: 'Playlists', icon: 'PlaylistIcon' },
				],
			},
		],
	},
};
