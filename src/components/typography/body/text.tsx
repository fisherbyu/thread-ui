import { getResolvedTypographyValues, getTextColorStyles } from '@/utils';
import { cx } from '@/styled-system/css';
import { getTypographyStyles } from '../shared-utils/get-typography-styles';
import { getPresentationStyles } from '../shared-utils/get-presentation-styles';
import { TextProps } from './body.types';

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
