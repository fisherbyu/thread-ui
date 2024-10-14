import { BaseElementProps } from '../../types';
import { handleFourDirectionalSpacing } from '../spacing/handle-four-directional-spacing';
import { formatSpace } from '../spacing/format-space';
/**
 * Generate Basic Styling
 * @returns React.CSSProperties of styles
 */
export const generateStyles = ({
	visibility,
	overflow,
	overflowX,
	overflowY,
	opacity,
	order,
	flexGrow,
	flexShrink,
	flexBasis,
	alignSelf,
	position,
	top,
	right,
	bottom,
	left,
	zIndex,
	height,
	width,
	minHeight,
	minWidth,
	maxHeight,
	maxWidth,
	padding,
	paddingBottom,
	paddingLeft,
	paddingRight,
	paddingTop,
	paddingX,
	paddingY,
	margin,
	marginBottom,
	marginLeft,
	marginRight,
	marginTop,
	marginX,
	marginY,
}: BaseElementProps): React.CSSProperties => {
	const style: React.CSSProperties = {};

	style.visibility = visibility;
	style.overflow = overflow;
	style.overflowX = overflowX;
	style.overflowY = overflowY;
	style.opacity = opacity;
	style.order = order;
	style.flexGrow = flexGrow;
	style.flexShrink = flexShrink;
	style.flexBasis = flexBasis;
	style.alignSelf = alignSelf;
	style.position = position;
	style.top = top;
	style.right = right;
	style.bottom = bottom;
	style.left = left;
	style.zIndex = zIndex;

	style.height = formatSpace(height);
	style.width = formatSpace(width);
	style.minHeight = formatSpace(minHeight);
	style.minWidth = formatSpace(minWidth);
	style.maxHeight = formatSpace(maxHeight);
	style.maxWidth = formatSpace(maxWidth);

	// Proceess Padding
	const paddingValues = handleFourDirectionalSpacing({
		value: padding,
		bottom: paddingBottom,
		left: paddingLeft,
		right: paddingRight,
		top: paddingTop,
		x: paddingX,
		y: paddingY,
	});

	style.paddingBottom = paddingValues.bottom;
	style.paddingLeft = paddingValues.left;
	style.paddingRight = paddingValues.right;
	style.paddingTop = paddingValues.top;

	// Proceess Margin
	const marginValues = handleFourDirectionalSpacing({
		value: margin,
		bottom: marginBottom,
		left: marginLeft,
		right: marginRight,
		top: marginTop,
		x: marginX,
		y: marginY,
	});

	style.marginBottom = marginValues.bottom;
	style.marginLeft = marginValues.left;
	style.marginRight = marginValues.right;
	style.marginTop = marginValues.top;

	return style;
};
