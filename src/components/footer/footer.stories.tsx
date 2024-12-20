import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './footer';

// Demo Values
const SOCIAL_LINKS = {
	GITHUB: 'https://github.com/fisherbyu',
	LINKEDIN: 'https://www.linkedin.com/in/fisherandrew777/',
	TWITTER: 'https://twitter.com/fisher2040',
	FACEBOOK: 'https://facebook.com/',
	INSTAGRAM: 'https://instagram.com/',
};

const CAPTION = '© 2024 Thread UI. All rights reserved.';

const WEBSITE_LOGO = {
	icon: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 32" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
			<path d="M6.42 8.62 l1.78 -4.06 l7.66 15.44 l-3.76 0 z M3.12 16.04 c-0.26666 0.49334 -0.56668 0.9733 -0.90002 1.44 c-0.28 0.4 -0.61 0.83 -0.99 1.29 s-0.79666 0.87 -1.25 1.23 l3.34 0 l3.32 0 c-0.53334 -0.30666 -1.0133 -0.68332 -1.44 -1.13 s-0.79332 -0.88332 -1.1 -1.31 c-0.36 -0.49334 -0.68666 -1 -0.98 -1.52 z M21.494500000000002 12.2 c0.33334 0.17334 0.66668 0.38666 1 0.64 c0.28 0.22666 0.57666 0.51 0.89 0.85 s0.59 0.75 0.83 1.23 l0 -2.72 l0 -3 c-0.25334 0.53334 -0.53668 0.99 -0.85002 1.37 s-0.61 0.69 -0.89 0.93 c-0.33334 0.28 -0.66 0.51334 -0.98 0.7 z M22.7345 5 l4.26 -0.000019531 l0 5.4 c-0.32 -0.74666 -0.69334 -1.46 -1.12 -2.14 c-0.37334 -0.58666 -0.82 -1.1833 -1.34 -1.79 s-1.12 -1.0967 -1.8 -1.47 z M16.0745 5.02 l0 14.98 l3.52 0 l0 -14.98 l-3.52 0 z" />
		</svg>
	),
	link: '/',
};

const meta: Meta<typeof Footer> = {
	title: 'Components/Footer',
	component: Footer,
	// tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
	decorators: [
		(Story) => (
			<div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {
	args: {
		logo: WEBSITE_LOGO,
		caption: CAPTION,
		// githubLink: SOCIAL_LINKS.GITHUB,
		// linkedInLink: SOCIAL_LINKS.LINKEDIN,
		// twitterLink: SOCIAL_LINKS.TWITTER,
		// facebookLink: SOCIAL_LINKS.FACEBOOK,
		// instagramLink: SOCIAL_LINKS.INSTAGRAM,
	},
};
