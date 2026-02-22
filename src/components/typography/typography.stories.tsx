import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Title, H1, H2, H3, Text, Subtitle } from './index'; // Adjust import path as needed

// Define the Meta for the Typography components
const meta = {
	title: 'Typography/Typography',
	tags: ['autodocs'],
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component: 'A collection of typography components for consistent text styling',
			},
		},
	},
	argTypes: {
		// Title component controls
		titleText: {
			name: 'Title Text',
			control: 'text',
			description: 'Content for the Title component',
		},
		titleAlign: {
			name: 'Title Alignment',
			control: 'radio',
			options: ['left', 'center'],
			description: 'Alignment for the Title component',
		},

		// H1 component controls
		h1Text: {
			name: 'H1 Text',
			control: 'text',
			description: 'Content for the H1 component',
		},

		// H2 component controls
		h2Text: {
			name: 'H2 Text',
			control: 'text',
			description: 'Content for the H2 component',
		},

		// H3 component controls
		h3Text: {
			name: 'H3 Text',
			control: 'text',
			description: 'Content for the H3 component',
		},

		// Text component controls
		paragraphText: {
			name: 'Paragraph Text',
			control: 'text',
			description: 'Content for the paragraph Text component',
		},
		textInline: {
			name: 'Text Inline Control',
			control: 'boolean',
			description: 'Control wether Text is block or inline',
		},

		// Subtitle component controls
		subtitleText: {
			name: 'Subtitle Text',
			control: 'text',
			description: 'Content for the Subtitle component',
		},
	},
} satisfies Meta;

export default meta;

// Define the Story type
type Story = StoryObj<typeof meta>;

// Create a single story with all components and controls
export const Typography: Story = {
	render: (args) => (
		<div style={{ maxWidth: '800px', margin: '0 auto' }}>
			<Title align={args.titleAlign}>
				{args.titleText}
				<Subtitle>{args.subtitleText}</Subtitle>
			</Title>

			<H1>{args.h1Text}</H1>

			<H2>{args.h2Text}</H2>

			<H3>{args.h3Text}</H3>

			<Text>{args.paragraphText}</Text>
			<Subtitle>{args.subtitleText}</Subtitle>
		</div>
	),
	args: {
		// Default args for controls
		titleText: 'Title',
		titleAlign: 'left',
		h1Text: 'Heading 1',
		h2Text: 'Heading 2',
		h3Text: 'Heading 3',
		paragraphText:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		textInline: false,
		subtitleText: 'Subtitle',
	},
};
