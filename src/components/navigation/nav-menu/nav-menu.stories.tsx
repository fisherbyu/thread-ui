import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NavMenu } from './nav-menu';
import { ThreadTheme } from '../../../theme';

const SamplePageContent = (
	<div style={{ padding: '20px' }}>
		<h1 style={{ fontSize: '24px', marginBottom: '16px' }}>Page Content</h1>
		<p style={{ color: '#666' }}>
			This is sample page content to demonstrate the navigation in context. Scroll down to see
			how the sticky navigation behaves.
		</p>
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
				<h2 style={{ marginBottom: '12px' }}>Section {i + 1}</h2>
				<p style={{ color: '#666' }}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
					incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
					nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
				</p>
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
				items: [
					{ href: '/', title: 'Artists' },
					{ href: '/', title: 'Coldplay' },
					{ href: '/', title: 'Playlists' },
				],
			},
		],
	},
};
