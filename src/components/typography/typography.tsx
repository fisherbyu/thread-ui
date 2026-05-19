import { css, cva, cx } from '@/styled-system/css';
import { getResolvedTypographyValues, getTextColorStyles } from '@/utils';
import {
	BodyFontSizeOptions,
	ColoredTextOptions,
	FontFamilyOptions,
	FontWeightOptions,
	LetterSpacingOptions,
	LineHeightOptions,
	SpacingScaleOptions,
} from '@/types';
import { ReactNode } from 'react';

/** Typography CVA — map individual token keys to style declarations. */
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
		marginBottom: {
			none: { marginBottom: 'none' },
			xxs: { marginBottom: 'xxs' },
			xs: { marginBottom: 'xs' },
			sm: { marginBottom: 'sm' },
			md: { marginBottom: 'md' },
			lg: { marginBottom: 'lg' },
			xl: { marginBottom: 'xl' },
			xxl: { marginBottom: 'xxl' },
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
		indent: {
			true: {
				textIndent: '4',
			},
			false: {},
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
	/** Optional subtitle rendered beneath the heading */
	subtitle?: ReactNode;
};

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
 *
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
	// If no subtitle, pass marginBottom through unless inline
	if (!subtitle) {
		const resolved = getResolvedTypographyValues({
			role,
			marginBottom: inline ? 'none' : undefined,
		});

		const headingClass = cx(
			getTypographyStyles(resolved),
			getPresentationStyles({ align, truncate: truncate || undefined }),
			getTextColorStyles(color)
		);

		return <HeadingTag className={headingClass}>{children}</HeadingTag>;
	}

	// Wrap subtitle and heading in hgroup, add margin to wrapper
	const headingResolved = getResolvedTypographyValues({
		role,
		marginBottom: 'none',
	});

	const headingClass = cx(
		getTypographyStyles(headingResolved),
		getPresentationStyles({ align, truncate: truncate || undefined }),
		getTextColorStyles(color)
	);

	const subtitleRole = SUBTITLE_ROLE_MAP[role];
	const subtitleResolved = getResolvedTypographyValues({
		role: subtitleRole,
		fontFamily: 'heading',
		marginBottom: 'none',
	});

	const subtitleClass = cx(
		getTypographyStyles(subtitleResolved),
		getPresentationStyles({ align, truncate: truncate || undefined }),
		getTextColorStyles('text-secondary')
	);

	// Derive hgroup outer margin from heading
	const wrapperResolved = getResolvedTypographyValues({
		role,
		marginBottom: inline ? 'none' : undefined,
	});

	const wrapperClass = getTypographyStyles({
		fontSize: wrapperResolved.fontSize,
		marginBottom: wrapperResolved.marginBottom,
	});

	return (
		<hgroup className={wrapperClass}>
			<HeadingTag className={headingClass}>{children}</HeadingTag>
			<p className={subtitleClass}>{subtitle}</p>
		</hgroup>
	);
};

/**
 * Display-level heading. Renders as `h1`
 *
 * @example
 * <Title align="center">Welcome</Title>
 * <Title subtitle="Last updated March 2025">Welcome</Title>
 */
export const Title = (props: HeadingProps) => renderHeading('title', 'h1', props);

/**
 * Primary heading
 *
 * @example
 * <H1>Page Title</H1>
 */
export const H1 = (props: HeadingProps) => renderHeading('h1', 'h1', props);

/**
 * Secondary heading
 *
 * @example
 * <H2>Section Title</H2>
 */
export const H2 = (props: HeadingProps) => renderHeading('h2', 'h2', props);

/**
 * Tertiary heading
 *
 * @example
 * <H3>Subsection Title</H3>
 */
export const H3 = (props: HeadingProps) => renderHeading('h3', 'h3', props);

export type BodyTextProps = TypographyProps & {
	/** Font size — body scale only @default `'md'` */
	size?: BodyFontSizeOptions;
	/** Font weight override @default role default (`'regular'`) */
	weight?: FontWeightOptions;
	/** Line height override @default role default (`'normal'`) */
	lineHeight?: LineHeightOptions;
	/** Letter spacing override @default role default (`'normal'`) */
	letterSpacing?: LetterSpacingOptions;
	/** Bottom margin override @default role default (`'0.5em'`) */
	marginBottom?: SpacingScaleOptions;
};

export type TextProps = BodyTextProps & {
	indent?: boolean;
};

/**
 * Body text. Renders as `p` by default or `span` when `inline` is true.
 *
 * Allows for individual attribute overrides for customization
 *
 * @example
 * <Text>Default Text</Text>
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
	marginBottom,
	truncate = false,
	indent,
}: TextProps) => {
	const Component = inline ? 'span' : 'p';

	const resolved = getResolvedTypographyValues({
		role: 'body',
		fontSize: `body.${size}` as const,
		fontWeight: weight,
		lineHeight,
		letterSpacing,
		marginBottom: inline ? 'none' : marginBottom,
	});

	const className = cx(
		getTypographyStyles(resolved),
		getPresentationStyles({ indent, align, truncate: truncate || undefined }),
		getTextColorStyles(color)
	);

	return <Component className={className}>{children}</Component>;
};

export type SubtitleProps = TypographyProps & {
	fontFamily?: Extract<FontFamilyOptions, 'body' | 'heading'>;
	indent?: boolean;
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
	fontFamily,
	indent,
}: SubtitleProps) => {
	const resolved = getResolvedTypographyValues({
		role: 'body',
		fontSize: 'body.sm',
		marginBottom: 'none',
		fontFamily,
	});

	const className = cx(
		getTypographyStyles(resolved),
		getPresentationStyles({ indent, align, truncate: truncate || undefined }),
		getTextColorStyles(color)
	);

	return (
		<span className={className} style={{ display: 'block', marginTop: '0.2em' }}>
			{children}
		</span>
	);
};

export type ListProps = Omit<BodyTextProps, 'children' | 'inline' | 'truncate' | 'marginBottom'> & {
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
		marginBottom: 'none',
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
		marginBottom: 'none',
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

/**
 * Code typography component for code display. Renders as `<code>`.
 *
 * @example
 * <Text>Run <Code>npm install</Code> to get started.</Text>
 */
export type CodeProps = TypographyProps & {
	/** Font size — body scale only @default `'sm'` */
	size?: BodyFontSizeOptions;
};

export const Code = ({
	children,
	align = 'left',
	color = 'standard',
	size = 'sm',
	truncate = false,
}: CodeProps) => {
	const resolved = getResolvedTypographyValues({
		role: 'code',
		fontSize: `body.${size}` as const,
	});

	const className = cx(
		css({
			paddingY: '2px',
			paddingX: '3px',
			backgroundColor: 'structure.subtle',
			borderRadius: 'xs',
			borderWidth: 'sm',
			borderColor: 'structure.default',
			letterSpacing: 'wide',
		}),
		getTypographyStyles(resolved),
		getPresentationStyles({ align, truncate: truncate || undefined }),
		getTextColorStyles(color)
	);

	return <code className={className}>{children}</code>;
};
