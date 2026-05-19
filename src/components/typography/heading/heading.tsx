import { getResolvedTypographyValues, getTextColorStyles } from '@/utils';
import { SubtitleProps, TypographyHeadingProps } from './heading.types';
import { renderHeading } from './render-heading';
import { getTypographyStyles } from '../shared-utils/get-typography-styles';
import { getPresentationStyles } from '../shared-utils/get-presentation-styles';
import { cx } from '@/styled-system/css';

/**
 * Display-level heading. Renders as `h1`
 *
 * @example
 * <Title align="center">Welcome</Title>
 * <Title subtitle="Last updated March 2025">Welcome</Title>
 */
export const Title = (props: TypographyHeadingProps) => renderHeading('title', 'h1', props);

/**
 * Primary heading
 *
 * @example
 * <H1>Page Title</H1>
 */
export const H1 = (props: TypographyHeadingProps) => renderHeading('h1', 'h1', props);

/**
 * Secondary heading
 *
 * @example
 * <H2>Section Title</H2>
 */
export const H2 = (props: TypographyHeadingProps) => renderHeading('h2', 'h2', props);

/**
 * Tertiary heading
 *
 * @example
 * <H3>Subsection Title</H3>
 */
export const H3 = (props: TypographyHeadingProps) => renderHeading('h3', 'h3', props);

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
