import { getSize } from './get-size';
import { validateSpacing } from './validate-space';

type HandleFourDirectionalSpacingProps = {
	value?: string | number;
	top?: string | number;
	bottom?: string | number;
	left?: string | number;
	right?: string | number;
	x?: string | number;
	y?: string | number;
};

/**
 * Handle coalescence of Sizing Props
 * @param value margin | padding
 * @param bottom bottom spacing
 * @param left left spacing
 * @param right right spacing
 * @param top top spacing
 * @param x x-axis spacing
 * @param y y-axis spacing
 * @returns number multiplied by sizing constant
 */
export const handleFourDirectionalSpacing = ({ value, bottom, left, right, top, x, y }: HandleFourDirectionalSpacingProps) => {
	let topSpace, rightSpace, bottomSpace, leftSpace;
	if (typeof value === 'string' && validateSpacing(value)) {
		const values = value.split(' ');

		switch (values.length) {
			case 1:
				topSpace = rightSpace = bottomSpace = leftSpace = values[0];
				break;
			case 2:
				topSpace = bottomSpace = values[0];
				rightSpace = leftSpace = values[1];
				break;
			case 3:
				topSpace = values[0];
				rightSpace = leftSpace = values[1];
				bottomSpace = values[2];
				break;
			case 4:
				topSpace = values[0];
				rightSpace = values[1];
				bottomSpace = values[2];
				leftSpace = values[3];
				break;
		}
	} else if (typeof value === 'number') {
		const size = getSize(value);
		topSpace = rightSpace = bottomSpace = leftSpace = size;
	}

	if (top && typeof top === 'number') {
		top = getSize(top);
	}

	if (right && typeof right === 'number') {
		right = getSize(right);
	}

	if (bottom && typeof bottom === 'number') {
		bottom = getSize(bottom);
	}

	if (left && typeof left === 'number') {
		left = getSize(left);
	}

	if (x && typeof x === 'number') {
		x = getSize(x);
	}

	if (y && typeof y === 'number') {
		y = getSize(y);
	}

	return {
		top: top ?? y ?? topSpace,
		right: right ?? x ?? rightSpace,
		bottom: bottom ?? y ?? bottomSpace,
		left: left ?? x ?? leftSpace,
	};
};
