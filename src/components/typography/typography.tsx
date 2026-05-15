import { cva, cx } from '@/styled-system/css';
import { getResolvedTypographyValues } from '@/utils';
import {
	BodyFontSizeOptions,
	ColoredTextOptions,
	FontWeightOptions,
	LetterSpacingOptions,
	LineHeightOptions,
} from '@/types';
import { getTextColorStyles } from '@/utils';
import { ReactNode } from 'react';

/** Typography CVA — maps individual token keys to single style declarations.
 * Chord composition happens upstream in `getResolvedTypographyValues`. */
const getTypographyStyles = cva({
	variants: {
		fontFamily: {
			body: { fontFamily: 'body' },
			heading: { fontFamily: 'heading' },
			mono: { fontFamily: 'mono' },
		},
		fontSize: {
			'heading.sm': { fontSize: 'heading.sm' },
			'heading.md': { fontSize: 'heading.md' },
			'heading.lg': { fontSize: 'heading.lg' },
			'heading.xl': { fontSize: 'heading.xl' },
			'body.xxs': { fontSize: 'body.xxs' },
			'body.xs': { fontSize: 'body.xs' },
			'body.sm': { fontSize: 'body.sm' },
			'body.md': { fontSize: 'body.md' },
			'body.lg': { fontSize: 'body.lg' },
			'body.xl': { fontSize: 'body.xl' },
		},
		fontWeight: {
			regular: { fontWeight: 'regular' },
			medium: { fontWeight: 'medium' },
			semibold: { fontWeight: 'semibold' },
			bold: { fontWeight: 'bold' },
		},
		lineHeight: {
			tighter: { lineHeight: 'tighter' },
			tight: { lineHeight: 'tight' },
			normal: { lineHeight: 'normal' },
			loose: { lineHeight: 'loose' },
			looser: { lineHeight: 'looser' },
		},
		letterSpacing: {
			tight: { letterSpacing: 'tight' },
			normal: { letterSpacing: 'normal' },
			wide: { letterSpacing: 'wide' },
		},
	},
});

/** Presentation CVA for align/truncate. Not part of the typography chord. */
const getPresentationStyles = cva({
	variants: {
		align: {
			left: { textAlign: 'left' },
			center: { textAlign: 'center' },
		},
		truncate: {
			true: {
				overflow: 'hidden',
				whiteSpace: 'nowrap',
				textOverflow: 'ellipsis',
			},
		},
	},
});

export type TypographyProps = {
	children: ReactNode;
	/** Text alignment @default `'left'` */
	align?: 'left' | 'center';
	/** Text color variant @default `'standard'` */
	color?: ColoredTextOptions;
	/** Removes bottom margin when true @default `false` */
	inline?: boolean;
	/** Truncates text to a single line with ellipsis @default `false` */
	truncate?: boolean;
};

export type HeadingProps = TypographyProps & {
	/** Optional subtitle rendered beneath the heading at one-step-down typography. */
	subtitle?: ReactNode;
};

// Margins preserved from prior implementation — TODO: migrate to spacing scale
const HEADING_MARGINS = {
	title: '40px',
	h1: '32px',
	h2: '24px',
	h3: '16px',
} as const;

/** Subtitle role mapping: subtitle under a heading uses one-step-down typography role. */
const SUBTITLE_ROLE_MAP = {
	title: 'h1',
	h1: 'h2',
	h2: 'h3',
	h3: 'body',
} as const;

type HeadingRoleKey = keyof typeof SUBTITLE_ROLE_MAP;

/**
 * Internal helper rendering a heading with optional subtitle.
 * Wraps in <hgroup> when subtitle is present.
 */
const renderHeading = (
	role: HeadingRoleKey,
	HeadingTag: 'h1' | 'h2' | 'h3',
	{
		children,
		align = 'left',
		inline = false,
		color = 'standard',
		truncate = false,
		subtitle,
	}: HeadingProps
) => {
	const headingClass = cx(
		getTypographyStyles(getResolvedTypographyValues({ role })),
		getPresentationStyles({ align, truncate: truncate || undefined }),
		getTextColorStyles(color)
	);

	const outerMargin = inline ? 0 : HEADING_MARGINS[role];

	if (!subtitle) {
		return (
			<HeadingTag className={headingClass} style={{ marginBottom: outerMargin }}>
				{children}
			</HeadingTag>
		);
	}

	const subtitleRole = SUBTITLE_ROLE_MAP[role];
	const subtitleClass = cx(
		getTypographyStyles(getResolvedTypographyValues({ role: subtitleRole })),
		getPresentationStyles({ align, truncate: truncate || undefined }),
		getTextColorStyles('text-secondary')
	);

	return (
		<hgroup style={{ marginBottom: outerMargin }}>
			<HeadingTag className={headingClass}>{children}</HeadingTag>
			<p className={subtitleClass}>{subtitle}</p>
		</hgroup>
	);
};

/**
 * Display-level heading. Renders as `h1` using the `title` typography role.
 *
 * @example
 * <Title align="center">Welcome</Title>
 * <Title subtitle="Last updated March 2025">Welcome</Title>
 */
export const Title = (props: HeadingProps) => renderHeading('title', 'h1', props);

/**
 * Primary heading. Renders as `h1` using the `h1` typography role.
 *
 * @example
 * <H1>Page Title</H1>
 */
export const H1 = (props: HeadingProps) => renderHeading('h1', 'h1', props);

/**
 * Secondary heading. Renders as `h2` using the `h2` typography role.
 *
 * @example
 * <H2>Section Title</H2>
 */
export const H2 = (props: HeadingProps) => renderHeading('h2', 'h2', props);

/**
 * Tertiary heading. Renders as `h3` using the `h3` typography role.
 *
 * @example
 * <H3>Subsection Title</H3>
 */
export const H3 = (props: HeadingProps) => renderHeading('h3', 'h3', props);

export type TextProps = TypographyProps & {
	/** Font size — body scale only @default `'md'` */
	size?: BodyFontSizeOptions;
	/** Font weight override @default role default (`'regular'`) */
	weight?: FontWeightOptions;
	/** Line height override @default role default (`'normal'`) */
	lineHeight?: LineHeightOptions;
	/** Letter spacing override @default role default (`'normal'`) */
	letterSpacing?: LetterSpacingOptions;
};

/**
 * Body text. Renders as `p` by default or `span` when `inline` is true.
 * Uses the `body` typography role with per-axis overrides available.
 *
 * @example
 * <Text size="sm" weight="semibold">Important note</Text>
 */
export const Text = ({
	children,
	align = 'left',
	inline = false,
	color = 'standard',
	size = 'md',
	weight,
	lineHeight,
	letterSpacing,
	truncate = false,
}: TextProps) => {
	const Component = inline ? 'span' : 'p';

	const resolved = getResolvedTypographyValues({
		role: 'body',
		fontSize: `body.${size}` as const,
		fontWeight: weight,
		lineHeight,
		letterSpacing,
	});

	const className = cx(
		getTypographyStyles(resolved),
		getPresentationStyles({ align, truncate: truncate || undefined }),
		getTextColorStyles(color)
	);

	// TODO: migrate marginBottom to spacing scale
	return (
		<Component className={className} style={{ marginBottom: inline ? 0 : '0.25em' }}>
			{children}
		</Component>
	);
};

/**
 * Standalone secondary text rendered as an inline `span`.
 * For subtitles attached to headings, use the `subtitle` prop on Title/H1/H2/H3 instead.
 *
 * @example
 * <Subtitle>Last updated March 2025</Subtitle>
 */
export const Subtitle = ({
	children,
	align = 'left',
	color = 'secondary',
	truncate = false,
}: TypographyProps) => {
	const resolved = getResolvedTypographyValues({
		role: 'body',
		fontSize: 'body.sm',
	});

	const className = cx(
		getTypographyStyles(resolved),
		getPresentationStyles({ align, truncate: truncate || undefined }),
		getTextColorStyles(color)
	);

	// TODO: migrate marginTop to spacing scale
	return (
		<span className={className} style={{ display: 'block', marginTop: '0.2em' }}>
			{children}
		</span>
	);
};

export type ListProps = Omit<TextProps, 'children' | 'inline' | 'truncate'> & {
	/** Items to render in the list */
	items: Array<string | ReactNode>;
	/** List marker style @default `'disc'` */
	decoration?: 'disc' | 'circle' | 'square' | 'blank' | 'none';
};

/**
 * Unordered list with configurable marker style, size, and color.
 *
 * @example
 * <List items={['Apples', 'Oranges', 'Bananas']} decoration="circle" />
 */
export const List = ({
	align = 'left',
	color = 'standard',
	size = 'md',
	weight,
	lineHeight,
	letterSpacing,
	items,
	decoration = 'disc',
}: ListProps) => {
	const resolved = getResolvedTypographyValues({
		role: 'body',
		fontSize: `body.${size}` as const,
		fontWeight: weight,
		lineHeight,
		letterSpacing,
	});

	const itemClass = cx(
		getTypographyStyles(resolved),
		getPresentationStyles({ align }),
		getTextColorStyles(color)
	);

	const listStyles: React.CSSProperties = {
		padding: 0,
		listStyleType: decoration === 'blank' ? 'none' : decoration,
		marginLeft: decoration !== 'none' ? '1em' : undefined,
	};

	return (
		<ul style={listStyles}>
			{items.map((item, index) => (
				<li key={index} className={itemClass}>
					{item}
				</li>
			))}
		</ul>
	);
};

export type OrderedListProps = Omit<ListProps, 'decoration'>;

/**
 * Ordered list with decimal numbering.
 *
 * @example
 * <OrderedList items={['First', 'Second', 'Third']} />
 */
export const OrderedList = ({
	align = 'left',
	color = 'standard',
	size = 'md',
	weight,
	lineHeight,
	letterSpacing,
	items,
}: OrderedListProps) => {
	const resolved = getResolvedTypographyValues({
		role: 'body',
		fontSize: `body.${size}` as const,
		fontWeight: weight,
		lineHeight,
		letterSpacing,
	});

	const itemClass = cx(
		getTypographyStyles(resolved),
		getPresentationStyles({ align }),
		getTextColorStyles(color)
	);

	return (
		<ol style={{ padding: 0, listStyleType: 'decimal', marginLeft: '1em' }}>
			{items.map((item, index) => (
				<li key={index} className={itemClass}>
					{item}
				</li>
			))}
		</ol>
	);
};
