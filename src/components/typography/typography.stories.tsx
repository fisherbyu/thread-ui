import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Title, H1, H2, H3, Text, Subtitle, List, OrderedList, Code, PageHeader } from './index'; // Adjust import path as needed

type TypographyArgs = {
	pageHeaderTitle: string;
	pageHeaderDescription: string;
	titleText: string;
	titleAlign: 'left' | 'center';
	h1Text: string;
	h2Text: string;
	h3Text: string;
	paragraphText: string;
	textInline: boolean;
	subtitleText: string;
	showSubtitles: boolean;
};

// Define the Meta for the Typography components
const meta: Meta<TypographyArgs> = {
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
		// PageHeader controls
		pageHeaderTitle: {
			name: 'PageHeader Title',
			control: 'text',
			description: 'Title for the PageHeader component',
		},
		pageHeaderDescription: {
			name: 'PageHeader Description',
			control: 'text',
			description: 'Description for the PageHeader component',
		},
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
		// Subtitle text — used both as standalone Subtitle and as heading subtitle prop
		subtitleText: {
			name: 'Subtitle Text',
			control: 'text',
			description: 'Subtitle content used by both <Subtitle> and the heading `subtitle` prop',
		},
		showSubtitles: {
			name: 'Show Subtitle',
			control: 'boolean',
			description: 'Toggle subtitles on the heading components',
		},
	},
} satisfies Meta<TypographyArgs>;

export default meta;

// Define the Story type
type Story = StoryObj<typeof meta>;

// Create a single story with all components and controls
export const Typography: Story = {
	render: (args) => (
		<div style={{ maxWidth: '800px', margin: '0 auto' }}>
			{/* --- Page Header --- */}
			<PageHeader
				title={args.pageHeaderTitle}
				description={args.pageHeaderDescription}
				center
			/>

			{/* --- Main: headings with subtitle prop --- */}
			<Title
				align={args.titleAlign}
				subtitle={args.showSubtitles ? args.subtitleText : undefined}
			>
				{args.titleText}
			</Title>
			<H1 subtitle={args.showSubtitles ? args.subtitleText : undefined}>{args.h1Text}</H1>
			<H2 subtitle={args.showSubtitles ? args.subtitleText : undefined}>{args.h2Text}</H2>
			<H3 subtitle={args.showSubtitles ? args.subtitleText : undefined}>{args.h3Text}</H3>

			{/* --- Body + standalone Subtitle --- */}
			<Text>{args.paragraphText}</Text>
			<Text>{args.paragraphText}</Text>
			{args.showSubtitles && <Subtitle>{args.subtitleText}</Subtitle>}

			<div style={{ display: 'flex', gap: '48px', marginTop: '8px' }}>
				<List items={['Disc item one', 'Disc item two', 'Disc item three']} />
				<OrderedList items={['First item', 'Second item', 'Third item']} />
			</div>

			{/* --- Variants --- */}
			<div style={{ marginTop: '48px', borderTop: '1px solid #eee', paddingTop: '32px' }}>
				{/* Text sizes + semibold + bold side by side */}
				<div style={{ display: 'flex', gap: '48px', marginBottom: '32px' }}>
					<div>
						<H3>Text Sizes</H3>
						<Text size="xxs">xxs — The quick brown fox</Text>
						<Text size="xs">xs — The quick brown fox</Text>
						<Text size="sm">sm — The quick brown fox</Text>
						<Text size="md">md — The quick brown fox</Text>
						<Text size="lg">lg — The quick brown fox</Text>
						<Text size="xl">xl — The quick brown fox</Text>
					</div>
					<div>
						<H3>Semibold</H3>
						<Text size="xxs" weight="semibold">
							xxs — The quick brown fox
						</Text>
						<Text size="xs" weight="semibold">
							xs — The quick brown fox
						</Text>
						<Text size="sm" weight="semibold">
							sm — The quick brown fox
						</Text>
						<Text size="md" weight="semibold">
							md — The quick brown fox
						</Text>
						<Text size="lg" weight="semibold">
							lg — The quick brown fox
						</Text>
						<Text size="xl" weight="semibold">
							xl — The quick brown fox
						</Text>
					</div>
					<div>
						<H3>Bold</H3>
						<Text size="xxs" weight="bold">
							xxs — The quick brown fox
						</Text>
						<Text size="xs" weight="bold">
							xs — The quick brown fox
						</Text>
						<Text size="sm" weight="bold">
							sm — The quick brown fox
						</Text>
						<Text size="md" weight="bold">
							md — The quick brown fox
						</Text>
						<Text size="lg" weight="bold">
							lg — The quick brown fox
						</Text>
						<Text size="xl" weight="bold">
							xl — The quick brown fox
						</Text>
					</div>
				</div>

				{/* List decorations side by side */}
				<div style={{ display: 'flex', gap: '48px', marginBottom: '32px' }}>
					<div>
						<H3>List Decorations</H3>
						<Text size="xs" weight="semibold" inline>
							disc
						</Text>
						<List items={['Item one', 'Item two', 'Item three']} decoration="disc" />
						<Text size="xs" weight="semibold" inline>
							circle
						</Text>
						<List items={['Item one', 'Item two', 'Item three']} decoration="circle" />
						<Text size="xs" weight="semibold" inline>
							square
						</Text>
						<List items={['Item one', 'Item two', 'Item three']} decoration="square" />
					</div>
					<div style={{ marginTop: '36px' }}>
						<Text size="xs" weight="semibold" inline>
							blank
						</Text>
						<List items={['Item one', 'Item two', 'Item three']} decoration="blank" />
						<Text size="xs" weight="semibold" inline>
							none
						</Text>
						<List items={['Item one', 'Item two', 'Item three']} decoration="none" />
					</div>
				</div>

				{/* Code */}
				<div style={{ marginBottom: '32px' }}>
					<H3>Code</H3>
					<Text>
						Install the package with <Code>npm install thread-ui</Code> to get started.
					</Text>
					<Text>
						Inline sizes: <Code size="xs">xs</Code> <Code size="sm">sm</Code>
						<Code size="md">md</Code> <Code size="lg">lg</Code>
					</Text>
				</div>

				{/* Underline */}
				<div style={{ marginBottom: '32px' }}>
					<H3>Underline</H3>
					<Text underline>
						This entire paragraph is underlined via the `underline` prop on Text.
					</Text>
				</div>

				{/* Truncate */}
				<div style={{ width: '300px' }}>
					<H3>Truncate (300px)</H3>
					<Title truncate>Long title that should be truncated here</Title>
					<H1 truncate>Long H1 that should be truncated here</H1>
					<H2 truncate>Long H2 that should be truncated here</H2>
					<H3 truncate>Long H3 that should be truncated here</H3>
					<Text truncate>
						Long body text that should be truncated here and not wrap to a second line
					</Text>
				</div>
			</div>
		</div>
	),
	args: {
		// Default args for controls
		pageHeaderTitle: 'Page Header',
		pageHeaderDescription: 'A description that appears below the page header title.',
		titleText: 'Title',
		titleAlign: 'left',
		h1Text: 'Heading 1',
		h2Text: 'Heading 2',
		h3Text: 'Heading 3',
		paragraphText:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		textInline: false,
		subtitleText: 'Subtitle',
		showSubtitles: true,
	},
};
