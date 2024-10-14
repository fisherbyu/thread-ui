import { spacingRegexValues as spaceRegex } from './spacingRegexValues';
/**
 * Checks value for valid CSS formatting
 * @param value: string
 * @returns bool
 */
export const validateSpacing = (value?: string): boolean => {
	// Return false immediately if value is undefined or an empty string
	if (!value) {
		return false;
	}

	// Check if the value matches any of the criteria
	return (
		spaceRegex.pixelRegex.test(value) ||
		spaceRegex.emRegex.test(value) ||
		spaceRegex.remRegex.test(value) ||
		spaceRegex.percentRegex.test(value) ||
		spaceRegex.viewportRegex.test(value) ||
		spaceRegex.autoRegex.test(value) ||
		spaceRegex.zeroRegex.test(value) ||
		spaceRegex.multipleValuesRegex.test(value) ||
		spaceRegex.inheritRegex.test(value)
	);
};
