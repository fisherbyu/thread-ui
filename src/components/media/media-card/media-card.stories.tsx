import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MediaCard } from './media-card';

const beatles = {
	id: 2,
	name: 'The Beatles',
	tier: 1,
	rank: 2,
	contents: [
		{
			id: 2,
			order: 0,
			text: "The greatest band ever. Their first albums were immensely popular, building on the foundations of Chuck Berry and Elvis. Rubber Soul and Revolver moved them from pop boy band to expert songwriters with radical use of the studio. Sgt. Pepper's Lonely Hearst Club Band proved their creative genius and transformed modern music making indescribable ways.",
			artistId: 2,
			albumId: null,
		},
	],
	attributes: [
		{
			id: 3,
			order: 0,
			title: 'Favorite Albums:',
			text: 'Abbey Road, Rubber Soul',
			artistId: 2,
			albumId: null,
		},
		{
			id: 4,
			order: 1,
			title: 'Favorite Tracks:',
			text: 'The End, Let it Be, Drive My Car',
			artistId: 2,
			albumId: null,
		},
	],
	link: {
		id: 2,
		appleURI: 'the-beatles/136975',
		spotifyURI: '3WrFJ7ztbogyGnTHbHJFl2',
	},
	image: {
		id: 2,
		src: '/the-beatles.webp',
		alt: 'The Beatles Profile',
		height: 540,
		width: 540,
	},
};

const meta: Meta<typeof MediaCard> = {
	title: 'Media/MediaCard',
	component: MediaCard,
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg'],
		},
		imagePosition: {
			control: 'select',
			options: ['left', 'right'],
		},
		detailsPosition: {
			control: 'select',
			options: ['text', 'image'],
		},
	},
};

export default meta;
type Story = StoryObj<typeof MediaCard>;

export const Default: Story = {
	args: {
		title: beatles.name,
		image: beatles.image,
		description: beatles.contents.map((c) => c.text),
		details: beatles.attributes.map((a) => ({
			title: a.title,
			details: a.text,
		})),
		links: [
			{
				url: `https://music.apple.com/us/artist/${beatles.link.appleURI}`,
				iconName: 'MusicNote',
			},
			{
				url: `https://open.spotify.com/artist/${beatles.link.spotifyURI}`,
				iconName: 'SpotifyLogo',
			},
		],
		size: 'md',
		imagePosition: 'left',
		detailsPosition: 'text',
	},
};
