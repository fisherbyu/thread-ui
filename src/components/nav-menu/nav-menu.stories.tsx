import type { Meta, StoryObj } from '@storybook/react';
import { NavMenu } from './nav-menu';
import { NavMenuProps } from './nav-menu.types';

const meta: Meta<typeof NavMenu> = {
	title: 'Navigation/NavMenu',
	component: NavMenu,
	parameters: {
		layout: 'fullscreen',
	},
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
				<Story />
				<div style={{ padding: '20px' }}>
					<h1 style={{ fontSize: '24px', marginBottom: '16px' }}>Page Content</h1>
					<p style={{ color: '#666' }}>
						This is sample page content to demonstrate the navigation in context. Scroll down to see how the sticky
						navigation behaves.
					</p>
					{/* Add more content to make the page scrollable */}
					{Array.from({ length: 5 }).map((_, i) => (
						<div key={i} style={{ marginTop: '40px', padding: '20px', backgroundColor: 'white', borderRadius: '8px' }}>
							<h2 style={{ marginBottom: '12px' }}>Section {i + 1}</h2>
							<p style={{ color: '#666' }}>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
								dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
								ex ea commodo consequat.
							</p>
						</div>
					))}
				</div>
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof NavMenu>;

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

// Basic navigation with simple items
export const Basic: Story = {
	args: {
		logo: {
			href: '/',
			logo: <SampleLogo />,
		},
		items: [
			{ href: '/', title: 'Home' },
			{ href: '/', title: 'About' },
			{ href: '/', title: 'Contact' },
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

// Navigation with dropdown
export const NoDropdown: Story = {
	args: {
		logo: {
			href: '/',
			logo: <SampleLogo />,
		},
		items: [
			{ href: '/', title: 'Home' },
			{ href: '/', title: 'About' },
			{ href: '/', title: 'Contact' },
		],
	},
};

// Custom playground story with all controls enabled
export const Playground: Story = {
	args: {
		logo: {
			href: '/',
			logo: <SampleLogo />,
		},
		items: [
			{ href: '/', title: 'Home' },
			{ href: '/', title: 'About' },
			{ href: '/', title: 'Contact' },
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
