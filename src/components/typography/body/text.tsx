import { getResolvedTypographyValues, getTextColorStyles } from '@/utils';
import { cx } from '@/styled-system/css';
import { getTypographyStyles } from '../shared-utils/get-typography-styles';
import { getPresentationStyles } from '../shared-utils/get-presentation-styles';
import { BODY_MARGIN_BOTTOM_MAP, resolveMarginBottom } from '../shared-utils/resolve-margin-bottom';
import { TextProps } from './body.types';

/**
 * Body text. Renders as `p` by default or `span` when `as` is `'span'`.
 *
 * Allows for individual attribute overrides for customization
 *
 * @example
 * <Text>Default Text</Text>
 * @example
 * <Text size="sm" weight="semibold" marginBottom>Important note</Text>
 * @example
 * <Text as="span" truncate>Inline truncated text</Text>
 */
export const Text = ({
	children,
	align = 'left',
	as: Component = 'p',
	color = 'standard',
	size = 'md',
	weight,
	lineHeight,
	letterSpacing,
	marginBottom,
	truncate = false,
	indent,
	fontFamily,
	underline,
}: TextProps) => {
	const isSpan = Component === 'span';

	const resolved = getResolvedTypographyValues({
		role: 'body',
		fontSize: `body.${size}` as const,
		fontWeight: weight,
		fontFamily,
		lineHeight,
		letterSpacing,
		marginBottom: isSpan
			? 'none'
			: resolveMarginBottom(marginBottom, {
					defaultOn: false,
					onValue: BODY_MARGIN_BOTTOM_MAP[size],
				}),
	});

	const className = cx(
		getTypographyStyles(resolved),
		getPresentationStyles({
			indent,
			align,
			truncate: truncate || undefined,
			underline,
			display: isSpan && truncate ? 'inline-block' : undefined,
		}),
		getTextColorStyles(color)
	);

	return <Component className={className}>{children}</Component>;
};
