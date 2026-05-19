import { getResolvedTypographyValues, getTextColorStyles } from '@/utils';
import { HeadingProps } from './heading.types';
import { cx } from '@/styled-system/css';
import { getTypographyStyles } from '../shared-utils/get-typography-styles';
import { getPresentationStyles } from '../shared-utils/get-presentation-styles';

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
export const renderHeading = (
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
