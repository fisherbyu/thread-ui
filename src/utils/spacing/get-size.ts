/**
 * Generate consistent size/space
 * @param number
 * @returns number multiplied by sizing constant
 */
export const getSize = (number: number) => {
	const SIZING_CONSTANT = 8;

	return number * SIZING_CONSTANT;
};
