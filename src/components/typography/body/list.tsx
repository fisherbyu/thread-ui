import { getResolvedTypographyValues, getTextColorStyles } from '@/utils';
import { cx } from '@/styled-system/css';
import { getTypographyStyles } from '../shared-utils/get-typography-styles';
import { getPresentationStyles } from '../shared-utils/get-presentation-styles';
import { ListProps, OrderedListProps } from './body.types';

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
